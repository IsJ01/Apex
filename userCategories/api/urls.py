from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserCategoryListView.as_view()),
    path('<int:pk>/', views.UserCategoryDetailView.as_view()),
]
