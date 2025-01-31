from django.test import TestCase
from api.models import User


class UserTestCase(TestCase):
    def setUp(self):
        test_user = User(username='TestUser', email='testuser@example.com')
        test_user.set_password('test')
        test_user.save()

    def test_get_users(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_create_user(self):
        data = {'username': 'TestUser2',
                'email': 'testuser2@example.com',
                'year_of_birth': 1878,
                'about': 'Писал сервера еще при батюшке-царе',
                'password': '!!!',
                'repeat_password': '!!!',
                'number': '',
                'is_staff': True}
        response = self.client.post('/', data=data)
        self.assertEqual(response.status_code, 200)

    def test_uncorrect_create_user(self):
        data = {'username': 'TestUser2',
                'email': 'testuser2@example.com',
                'year_of_birth': 1878,
                'about': 'Писал сервера еще при батюшке-царе',
                'password': '!!!',
                'number': '',
                'repeat_password': '?!!',
                'is_staff': True}
        response = self.client.post('/', data=data)
        self.assertIn(response.status_code, range(400, 500))

    # def test_login_user(self):
    #     response = self.client.post('/login/', data={'email': 'testuser@example.com',
    #                                                  'password': 'test',
    #                                                  'headers': {'Sessionid', self.client.session}})
    #     self.assertEqual(response.status_code, 200)
    #     response = self.client.get('/current/', data={'headers': {'Sessionid', self.client.session}})
    #     self.assertEqual(response.data['email'], 'testuser@example.com')

    def test_uncorrect_login_user(self):
        response = self.client.post('/login/', data={'email': 'testuser@example.com',
                                                     'password': 'testt',
                                                     'headers': {'sessionid', self.client.session}})
        self.assertEqual(response.status_code, 401)
        response = self.client.post('/login/', data={'email': 'testuser2@example.com',
                                                     'password': 'test',
                                                     'headers': {'sessionid', self.client.session}})
        self.assertEqual(response.status_code, 401)

    # def test_logout_user(self):
    #     response = self.client.post('/login/', data={'email': 'testuser@example.com',
    #                                                  'password': 'test',
    #                                                  'headers': {'Sessionid', self.client.session}})
    #     self.assertEqual(response.status_code, 200)
    #     response = self.client.post('/logout/', headers={'Sessionid', self.client.session})
    #     self.assertEqual(response.status_code, 200)
    #     response = self.client.post('/logout/', headers={'Sessionid', self.client.session})
    #     self.assertEqual(response.status_code, 401)

    def test_current_user(self):
        response = self.client.post('/login/', data={'email': 'testuser@example.com',
                                                     'password': 'test',
                                                     'headers': {'sessionid', self.client.session}})
        response = self.client.get('/current/')
        self.assertEqual(response.status_code, 200)

    def test_get_user(self):
        response = self.client.get('/1/')
        self.assertEqual((response.data['username'], response.data['email']),
                         ('TestUser', 'testuser@example.com'))

    def test_update_user(self):
        response = self.client.patch('/1/', data={'username': 'tuser'}, content_type='application/json')
        self.assertEqual(response.data['username'], 'tuser')

    def test_delete_user(self):
        response = self.client.delete('/1/')
        self.assertIn(response.status_code, range(200, 300))
