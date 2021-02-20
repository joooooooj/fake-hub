from django.test import TestCase
from nose.tools import eq_

from fakehub_app.models import Repository
from fakehub_app.serializers import RepositorySerializer, TaskSerializer


class TestCreateRepositorySerializer(TestCase):
    def setUp(self):
        self.repo_data = {'name': 'test_name', 'description': 'test_description'}
        self.all_possible_fields_blank = {'name': 'test_name'}

    def test_serializer_with_empty_data(self):
        serializer = RepositorySerializer(data={})
        eq_(serializer.is_valid(), False)

    def test_valid_serializer(self):
        serializer = RepositorySerializer(data=self.repo_data)
        eq_(serializer.is_valid(), True)

    def test_blank_fields(self):
        serializer = RepositorySerializer(data=self.all_possible_fields_blank)
        eq_(serializer.is_valid(), True)


class TestCreateTaskSerializer(TestCase):
    def setUp(self):
        self.all_possible_fields_blank = {'title': 'title'}
        self.repo = Repository.objects.create(name="name")
        self.task = {'title': 'title', 'description': 'test_description', 'repository_id': self.repo.id}

    def test_serializer_with_empty_data(self):
        serializer = TaskSerializer(data={})
        eq_(serializer.is_valid(), False)

    def test_valid_serializer(self):
        serializer = TaskSerializer(data=self.task)
        eq_(serializer.is_valid(), True)

    def test_blank_fields(self):
        serializer = TaskSerializer(data=self.all_possible_fields_blank)
        eq_(serializer.is_valid(), True)

    def test_validators(self):
        self.task = {'title': 'title', 'difficulty': 0, 'repository_id': self.repo.id}
        serializer = TaskSerializer(data=self.task)
        eq_(serializer.is_valid(), False)
        self.task = {'title': 'title', 'difficulty': 0, 'repository_id': self.repo.id}
        serializer = TaskSerializer(data=self.task)
        eq_(serializer.is_valid(), False)
