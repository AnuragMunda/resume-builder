from django.urls import path
from . import views

urlpatterns = [
    path("critique/", views.CritiqueView.as_view(), name="ai_critique"),
]
