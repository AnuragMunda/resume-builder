from django.urls import path

from . import views

urlpatterns = [
    path("critique", views.ai_critique, name='ai_critique')
]