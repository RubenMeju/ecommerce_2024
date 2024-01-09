
from django.urls import path
from .views import CategoryViewSet

urlpatterns = [
    path('category/',
         CategoryViewSet.as_view({'get': 'list'}), name='category'),
]
