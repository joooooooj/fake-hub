# import factory
#
#
# class Repository(factory.django.DjangoModelFactory):
#     class Meta:
#         model = 'fakehub.Repository'
#         django_get_or_create = ('name', )
#
#     id = factory.Faker('uuid4')
#     name = factory.Sequence(lambda n: f'testrepo{n}')
#     owner = factory.Faker('email')