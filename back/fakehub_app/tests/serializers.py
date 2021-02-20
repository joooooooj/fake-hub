from django.test import TestCase
from nose.tools import eq_
from fakehub_app.serializers import RepositorySerializer


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
