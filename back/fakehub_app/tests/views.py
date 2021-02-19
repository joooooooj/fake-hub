from django.test import Client, TestCase
from django.urls import reverse
from faker import Faker
from nose.tools import eq_
from rest_framework import status
from rest_framework.authtoken.models import Token

from fakehub_app.models import Repository, User

fake = Faker()


class TestRepositoryPost(TestCase):
    def setUp(self):
        self.url = reverse('fakehub_app:api:repository-list')
        self.repo_data = {'name': 'test_name', 'description': 'test_description'}
        self.user = User.objects.create_user(name="tests", password='tests', email='tests', username='tests')
        token, created = Token.objects.get_or_create(user=self.user)
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_post_request_with_no_data_fails(self):
        response = self.client.post(self.url, {})
        eq_(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_request_with_valid_data_succeeds(self):
        response = self.client.post(self.url, self.repo_data)
        eq_(response.status_code, status.HTTP_201_CREATED)

        database_repo = Repository.objects.get(pk=response.data.get('id'))
        eq_(database_repo.name, self.repo_data.get('name'))
        eq_(database_repo.description, self.repo_data.get('description'))

    def test_post_request_with_bad_credentials_fails(self):
        self.client = Client(HTTP_AUTHORIZATION='Token ' + 'bad_token')
        response = self.client.post(self.url, self.repo_data)
        eq_(response.status_code, status.HTTP_401_UNAUTHORIZED)
