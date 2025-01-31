from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserListView.as_view()),
    path('current/', views.UserView.as_view()),
    path('<int:pk>/', views.UserDetailView.as_view()),
    path('<int:pk>/password/', views.UpdatePasswordView.as_view()),
    path('login/', views.LoginView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)