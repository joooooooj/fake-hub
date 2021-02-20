from django.test import Client, TestCase
from django.urls import reverse
from faker import Faker
from nose.tools import eq_
from rest_framework import status
from rest_framework.authtoken.models import Token
from fakehub_app.models import Repository, User, Task
from fakehub_app.serializers import RepositorySerializer, TaskSerializer

fake = Faker()


class TestRepositoryPost(TestCase):
    def setUp(self):
        self.url = reverse('fakehub_app:api:repository-list')
        self.mandatory_repo_data = {'name': 'test_name'}
        self.user = User.objects.create_user(name="tests", password='tests', email='tests', username='tests')
        token, created = Token.objects.get_or_create(user=self.user)
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_post_request_with_no_data_fails(self):
        response = self.client.post(self.url, {})
        eq_(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_request_with_mandatory_data_succeeds(self):
        response = self.client.post(self.url, self.mandatory_repo_data)
        eq_(response.status_code, status.HTTP_201_CREATED)

        database_repo = Repository.objects.get(pk=response.data.get('id'))
        eq_(database_repo.name, self.mandatory_repo_data.get('name'))
        eq_(database_repo.description, self.mandatory_repo_data.get('description'))

    def test_post_request_with_bad_credentials_fails(self):
        self.client = Client(HTTP_AUTHORIZATION='Token ' + 'bad_token')
        response = self.client.post(self.url, self.mandatory_repo_data)
        eq_(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestRepositoryGet(TestCase):
    def setUp(self):
        self.repository_name = "cool_repo"
        self.repository = Repository(name=self.repository_name)
        self.url = reverse('fakehub_app:api:repository-list')

    def test_api_can_get_repositories(self):
        Repository.objects.create(name='repo1')
        Repository.objects.create(name='repo2')

        res = self.client.get(self.url)
        repos = Repository.objects.all().order_by('name')
        serializer = RepositorySerializer(repos, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_request_returns_a_repo(self):
        response = self.client.get(self.url)
        eq_(response.status_code, status.HTTP_200_OK)


class TestTaskPost(TestCase):
    def setUp(self):
        self.url = reverse('fakehub_app:api:task-list')
        self.repository = Repository.objects.create(name="repo")
        self.user = User.objects.create_user(name="tests", password='tests', email='tests', username='tests')
        self.task = {'title': 'title', 'repository': self.repository.id, 'owner': self.user.id}
        token, created = Token.objects.get_or_create(user=self.user)
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_post_request_with_no_data_fails(self):
        response = self.client.post(self.url, {})
        eq_(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_request_with_mandatory_data_succeeds(self):
        response = self.client.post(self.url, self.task)
        eq_(response.status_code, status.HTTP_201_CREATED)

        task = Task.objects.get(pk=response.data.get('id'))
        eq_(task.title, self.task.get('title'))
        eq_(task.repository.id, self.task.get('repository'))
        eq_(task.owner.id, self.task.get('owner'))

    def test_post_request_with_bad_credentials_fails(self):
        self.client = Client(HTTP_AUTHORIZATION='Token ' + 'bad_token')
        response = self.client.post(self.url, self.task)
        eq_(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestTaskGet(TestCase):
    def setUp(self):
        self.title = "task"
        self.task = Task(title=self.title)
        self.url = reverse('fakehub_app:api:task-list')
        self.repo = Repository.objects.create(name="name")
        self.user = User.objects.create(username="ivana", password="ivana")

    def test_api_can_get_tasks(self):
        Task.objects.create(title='task1', repository_id=self.repo.id, owner_id=self.user.id)
        Task.objects.create(title='task2', repository_id=self.repo.id, owner_id=self.user.id)

        res = self.client.get(self.url)
        repos = Task.objects.all().order_by('title')
        serializer = TaskSerializer(repos, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_request_returns_a_task(self):
        response = self.client.get(self.url)
        eq_(response.status_code, status.HTTP_200_OK)
