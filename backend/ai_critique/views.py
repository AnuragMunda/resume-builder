from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ResumeCritiqueRequestSerializer
from .ai_service import critique_resume


class CritiqueView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = ResumeCritiqueRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"error": "Invalid resume data", "details": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        result = critique_resume(serializer.validated_data)

        if result.get("error"):
            return Response(
                {"error": "AI service unavailable", "message": result["message"]},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        return Response(result, status=status.HTTP_200_OK)
