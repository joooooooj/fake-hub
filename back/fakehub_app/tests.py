from django.test import TestCase, Client
from nose.tools import eq_, ok_
from faker import Faker
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token

from fakehub_app.models import Repository, User
from fakehub_app.serializers import RepositorySerializer

''' 
    serializers
'''


class TestCreateRepositorySerializer(TestCase):
    def setUp(self):
        self.repo_data = {'name': 'test_name', 'description': 'test_description'}

    def test_serializer_with_empty_data(self):
        serializer = RepositorySerializer(data={})
        eq_(serializer.is_valid(), False)

    def test_valid_serializer(self):
        serializer = RepositorySerializer(data=self.repo_data)
        eq_(serializer.is_valid(), True)


'''
    views
'''

fake = Faker()


class TestRepositoryView(TestCase):
    def setUp(self):
        self.url = reverse('fakehub_app:api:repository-list')
        self.repo_data = {'name': 'test_name', 'description': 'test_description'}
        self.user = User.objects.create_user(name="test", password='test', email='test', username='test')
        token, created = Token.objects.get_or_create(user=self.user)
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_post_request_with_no_data_fails(self):
        response = self.client.post(self.url, {})
        eq_(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_request_with_valid_data_succeeds(self):
        response = self.client.post(self.url, self.repo_data)
        eq_(response.status_code, status.HTTP_201_CREATED)

        repo = Repository.objects.get(pk=response.data.get('id'))
        eq_(repo.name, self.repo_data.get('name'))
        eq_(repo.description, self.repo_data.get('description'))
