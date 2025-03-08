from django.conf.urls.static import static
from django.urls import path
from . import views, settings

urlpatterns = [
    path('api/v1/', views.ReportListView.as_view()),
    path('api/v1/<int:pk>/', views.ReportDetailView.as_view()),
    path('api/v1/categories/', views.ReportCategoryListView.as_view()),
    path('api/v1/categories/<int:pk>/', views.ReportCategoryDetailView.as_view()),
    path('api/v1/charts/', views.ChartListView.as_view()),
    path('api/v1/charts/<int:pk>/', views.ChartDetailView.as_view()),
    path('api/v1/labels/', views.LabelListView.as_view()),
    path('api/v1/labels/<int:pk>/', views.LabelDetailView.as_view()),
    path('api/v1/values/', views.ValueListView.as_view()),
    path('api/v1/values/<int:pk>/', views.ValueDetailView.as_view()),
    path("api/v1/byOf/<int:id>/", views.get_all_by_of),
    path("api/v1/byTo/<int:id>/", views.get_all_by_to),
    path("api/v1/file/<int:id>/", views.get_file),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
