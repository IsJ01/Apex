from django.urls import path
from . import views

urlpatterns = [
    path('', views.ReportCategoryListView.as_view()),
    path('<int:pk>/', views.ReportCategoryDetailView.as_view())
]
