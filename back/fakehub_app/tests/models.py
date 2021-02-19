
from django.test import TestCase

from fakehub_app.models import Repository, User


class TestRepositoryModel(TestCase):
    def test_repository_collaborators(self):
        user_1 = User.objects.create(username='John', name='Doe', email='JohnDoe@email.com')
        user_2 = User.objects.create(username='Jane', name='Doe', email='JaneDoe@email.com')
        repository = Repository.objects.create(name='cool_repo')
        repository.collaborators.set([user_1.pk, user_2.pk])
        self.assertEqual(repository.collaborators.count(), 2)
