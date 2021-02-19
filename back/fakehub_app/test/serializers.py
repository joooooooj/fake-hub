from django.test import TestCase
from nose.tools import eq_
from ..serializers import RepositorySerializer


class TestCreateRepositorySerializer(TestCase):
    def setUp(self):
        self.repo_data = {'name': 'test_name', 'description': 'test_description'}

    def test_serializer_with_empty_data(self):
        serializer = RepositorySerializer(data={})
        eq_(serializer.is_valid(), False)