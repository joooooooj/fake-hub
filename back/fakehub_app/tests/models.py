from django.test import TestCase

from fakehub_app.models import Repository, User


class TestRepositoryModel(TestCase):
    def setUp(self):
        self.repository_name = "cool_repo"
        self.repository = Repository(name=self.repository_name)

    def test_repository_can_create(self):
        old_count = Repository.objects.count()
        self.repository.save()
        new_count = Repository.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_name_max_length(self):
        self.repository.save()
        repo = Repository.objects.get()
        max_length = repo._meta.get_field('name').max_length
        self.assertEqual(max_length, 100)

    def test_default_date(self):
        self.repository.save()
        repo = Repository.objects.get()
        date = repo.date_created
        self.assertNotEqual(date, None)

    def test_null_fields(self):
        self.repository.team = None
        self.repository.owner = None
        self.repository.description = None
        self.repository.save()
        repo = Repository.objects.get()
        self.assertEqual(repo.team, None)
        self.assertEqual(repo.owner, None)
        self.assertEqual(repo.description, None)

    def test_repository_collaborators(self):
        user_1 = User.objects.create(username='John', name='Doe', email='JohnDoe@email.com')
        user_2 = User.objects.create(username='Jane', name='Doe', email='JaneDoe@email.com')
        repository = Repository.objects.create(name='cool_repo')
        repository.collaborators.set([user_1.pk, user_2.pk])
        self.assertEqual(repository.collaborators.count(), 2)

    def test_repository_collaborators_other_side(self):
        user_1 = User.objects.create(username='John', name='Doe', email='JohnDoe@email.com')
        user_2 = User.objects.create(username='Jane', name='Doe', email='JaneDoe@email.com')
        repository = Repository.objects.create(name='cool_repo')
        user_1.repository_set.add(repository)
        user_2.repository_set.add(repository)
        self.assertEqual(repository.collaborators.count(), 2)
