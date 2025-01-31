from django.urls import path
from . import views

urlpatterns = [
    path('', views.OrganizationDataListView.as_view()),
    path('<int:pk>/', views.OrganizationDataDetailView.as_view()),
]
