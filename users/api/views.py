from django.contrib.auth import login
from django.contrib.auth.models import AnonymousUser
from rest_framework import generics, response, views
from django.contrib.sessions.models import Session

from .serializers import UserSerializer
from .models import User


# представление выхода пользователя из системы
class LogoutView(views.APIView):
    def post(self, request):
        session_id = request.headers['Sessionid']
        try:
            for session in Session.objects.all():
                if session.session_key == session_id:
                    session.delete()
            return response.Response({'detail': 'User is success log out'}, status=200)
        except Session.DoesNotExist:
            return response.Response({'detail': 'User is already log out'}, status=401)


# представление, отвечающее за авторизацию пользователя
class LoginView(views.APIView):
    def post(self, request):
        # получение почты и пароля
        email = request.data['email']
        password = request.data['password']
        # получение пользователя
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return response.Response({'detail': 'Email is invalid'}, status=401)
        # если пользователь сущетсвует и пароли совпадают, то
        # вызывается функция login, клиенту передается id сессии
        if user.check_password(password):
            login(request, user)
            data = {'sessionid': request.session.__dict__['_SessionBase__session_key']}
            http_response = response.Response(data, status=200)
            return http_response
        return response.Response({'detail': 'Password is invalid'}, status=401)


# представление, которое передает нам текущего пользователя
class UserView(views.APIView):

    def get(self, request):
        # мы получаем id сессии из заголовка запроса
        try:
            session_id = request.headers['Sessionid']
        except KeyError:
            session_id = ''
        try:
            # получаем объект сессии, ключ которого совпадает с тем,
            # что нам передал клиент
            session = Session.objects.get(session_key=session_id)
            # с помощью метода get_decoded, получаем id пользователя и самого пользователя
            user = User.objects.get(id=session.get_decoded()['_auth_user_id'])
            # возвращаем пользователя и значение того, что он аутентифицирован
            return response.Response({'is_authenticated': True,
                                      **UserSerializer(user).data}, status=200)
        except Exception:
            return response.Response({'is_authenticated': False,
                                      **UserSerializer(AnonymousUser).data},
                                     status=200)


# представление списка пользователей
class UserListView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # метод post регистрирует нового пользователя
    def post(self, request, *args, **kwargs):
        # получение всех полей
        name = request.data['username']
        email = request.data['email']
        number = request.data['number']
        year = request.data['year_of_birth']
        about = request.data['about']
        password = request.data['password']
        repeat_password = request.data['repeat_password']
        # если имя содержит недопустимые символы
        invalid_symbols = ';'
        if not all(alpha not in invalid_symbols for alpha in name):
            return response.Response({'detail': 'Invalid name'}, status=400)
        # создаем нового пользователя
        user = User(username=name,
                    email=email,
                    number=number,
                    year_of_birth=year,
                    about=about)
        # если пароли совпадают - сохраняем его
        if password == repeat_password:
            user.set_password(password)
            user.save()
            return response.Response(status=200)
        # в противном случае - возвращаем ошибку
        return response.Response({'detail': 'Password or email is invalid'}, status=400)


def get_user(request):
    try:
        session_id = request.headers['Sessionid']
    except KeyError:
        session_id = ''
    try:
        session = Session.objects.get(session_key=session_id)
        user = User.objects.get(id=session.get_decoded()['_auth_user_id'])
        return UserSerializer(user).data
    except Exception as e:
        return UserSerializer(AnonymousUser).data


# представление получения, обновление, удаления пользователя
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def update(self, request, *args, **kwargs):
        of = get_user(request)
        if (((not of['is_staff']) and (int(of['id']) != kwargs['pk']))
                or ('is_staff' in request.data and not of['is_staff'])):
            return response.Response(status=403)
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        of = get_user(request)
        if not of['is_staff'] or int(of['id']) != kwargs['pk']:
            return response.Response(status=403)
        return super().delete(request, *args, **kwargs)


class UpdatePasswordView(views.APIView):

    def put(self, request, *args, **kwargs):
        of = get_user(request)
        user = User.objects.get(id=kwargs['pk'])
        if not of['is_staff'] or int(of['id']) != kwargs['pk']:
            return response.Response(status=403)
        user.set_password(request.data.get('password'))
        user.save()
        return response.Response({'message': 'Ok'}, status=200)
