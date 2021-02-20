from django.test import TestCase

from fakehub_app.models import Repository, User, Task, Label


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


class TestTaskModel(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="ivana", password="ivana")
        self.task_title = "fancy_task"
        self.repo = Repository.objects.create(name="name")
        self.task = Task(title=self.task_title, repository_id=self.repo.id, owner_id=self.user.id)
        self.label = Label.objects.create(name="label", color="#FFFFFF")
        self.label2 = Label.objects.create(name="label2", color="#FGFFFF")
        self.repo = Repository.objects.create(name="name")

    def test_task_can_create(self):
        old_count = Task.objects.count()
        self.task.save()
        new_count = Task.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_name_max_length(self):
        self.task.save()
        task = Task.objects.get()
        max_length = task._meta.get_field('title').max_length
        self.assertEqual(max_length, 100)

    def test_default_date(self):
        self.task.save()
        task = Task.objects.get()
        date = task.created_at
        self.assertNotEqual(date, None)

    def test_null_fields(self):
        self.task.closed_at = None
        self.task.difficulty = None
        self.task.description = None
        self.task.due_date = None
        self.task.changes = None
        self.task.milestone = None
        self.task.column = None
        self.task.save()
        task = Task.objects.get()
        self.assertEqual(task.closed_at, None)
        self.assertEqual(task.difficulty, None)
        self.assertEqual(task.description, None)
        self.assertEqual(task.due_date, None)
        self.assertEqual(task.changes, None)
        self.assertEqual(task.milestone, None)
        self.assertEqual(task.column, None)

    def test_task_members(self):
        task = Task.objects.create(title='fancy_task', repository_id=self.repo.id, owner_id=self.user.id)
        task.labels.set([self.label.pk, self.label2.pk])
        self.assertEqual(task.labels.count(), 2)
        self.assertEqual(self.label.task_set.count(), 1)
