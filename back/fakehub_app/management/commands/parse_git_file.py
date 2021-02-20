import sys

from django.core.management.base import BaseCommand
from pydriller import RepositoryMining, GitRepository
import git
from ...models import Branch, User, Repository


def get_user(username):
    return User.objects.filter(username=username).values_list('id', flat=True)


def get_branch(branch_name):
    return Branch.objects.filter(name=branch_name).values_list('id', flat=True)


def save_branches(branches, repo_id):
    counter = 1
    f = open("fakehub_app/fixtures/branches.json", "w")
    print(repo_id)

    f.write('[')
    for branch in branches:
        f.write('{"model": "fakehub_app.Branch",' +
                '"pk": ' + str(counter) + ',' +
                '"fields":' +
                '{' + ' "name" : "' + branch + '",' +
                ' "author" : null,' +
                ' "repository" : ' + str(repo_id) + '')
        f.write('}}')

        counter += 1

    f.write(']')
    f.close()


def parse():
    branches = []

    f = open("fakehub_app/fixtures/commits.json", "w")
    counter = 1

    f.write('[')
    for commit in RepositoryMining('https://github.com/joooooooj/fake-hub').traverse_commits():

        if len(get_user(commit.author.name)) != 0 and len(commit.branches) != 0:

            branch = commit.branches.pop()
            branches.append(branch)

            if counter != 1:
                f.write(',\n')
            f.write('{"model": "fakehub_app.Commit",' +
                    '"pk": ' + str(counter) + ',' +
                    '"fields":' +
                    '{' + ' "description" : "' + commit.msg + '",' +
                    ' "code" :"' + commit.hash + '",' +
                    ' "committed_at" : "' + str(commit.committer_date) + '",' +
                    ' "tag" : " ",')
            if len(get_user(commit.author.name)) != 0:
                f.write(' "author" : ' + str(get_user(commit.author.name)[0]) + ",")
            else:
                f.write(' "author" : "",')
            if len(get_branch(branch)) != 0:
                f.write(' "branch" : ' + str(1))
                branches.append(branch)
            else:
                f.write(' "branch" : ' + str(1))
            f.write('}}')

            counter += 1

    f.write(']')
    f.close()
    return set(branches)


class Command(BaseCommand):
    help = "Parses git file and saves commit and branch data to DB"

    def handle(self, *args, **options):
        branches = parse()
        save_branches(set(branches), 1)
