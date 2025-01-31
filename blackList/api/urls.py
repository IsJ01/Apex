from django.urls import path
from . import views

urlpatterns = [
    path('', views.BlackUserListView.as_view()),
    path('<int:pk>/', views.BlackUserDetailView.as_view()),
]
