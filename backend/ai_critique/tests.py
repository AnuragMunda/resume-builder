from django.test import TestCase
from unittest.mock import patch, MagicMock
import json


class CritiqueAPITest(TestCase):
    @patch("ai_critique.ai_service.get_gemini_client")
    def test_missing_gemini_key_returns_502(self, mock_get_client):
        """Without GEMINI_API_KEY, the endpoint should return 502."""
        mock_get_client.return_value = None

        payload = {"summary": "Test summary"}
        response = self.client.post(
            "/api/ai/critique/",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 502)
        self.assertIn("AI service unavailable", str(response.data["error"]))

    @patch("ai_critique.ai_service.get_gemini_client")
    def test_empty_body_returns_200(self, mock_get_client):
        """An empty or minimal body should be accepted (fields have defaults)."""
        mock_client = MagicMock()
        mock_response = MagicMock()
        mock_response.text = json.dumps({"overall": {"score": 0}, "sections": {}})
        mock_client.models.generate_content.return_value = mock_response
        mock_get_client.return_value = mock_client

        response = self.client.post(
            "/api/ai/critique/",
            data=json.dumps({}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

    def test_invalid_data_returns_400(self):
        """Garbage non-JSON should be rejected."""
        response = self.client.post(
            "/api/ai/critique/",
            data="not-json",
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)

    @patch("ai_critique.ai_service.get_gemini_client")
    def test_successful_critique(self, mock_get_client):
        """With a mocked Gemini client, the endpoint should return critique data."""
        mock_client = MagicMock()
        mock_response = MagicMock()
        mock_response.text = json.dumps(
            {
                "overall": {
                    "score": 85,
                    "strengths": ["Good summary"],
                    "weaknesses": ["Missing contact"],
                    "recommendations": ["Add email"],
                },
                "sections": {
                    "personalDetails": {
                        "score": 70,
                        "feedback": "Missing contact info",
                        "suggestions": ["Add email and phone"],
                    },
                    "summary": {
                        "score": 90,
                        "feedback": "Well written",
                        "suggestions": [],
                    },
                    "workExperience": {
                        "score": 85,
                        "feedback": "Good",
                        "suggestions": ["Add metrics"],
                    },
                    "educationHistory": {
                        "score": 80,
                        "feedback": "OK",
                        "suggestions": [],
                    },
                    "skills": {
                        "score": 75,
                        "feedback": "Decent",
                        "suggestions": ["Add more"],
                    },
                },
            }
        )
        mock_client.models.generate_content.return_value = mock_response
        mock_get_client.return_value = mock_client

        payload = {
            "personalDetails": {"firstName": "John", "email": "john@example.com"},
            "summary": "Experienced developer",
            "workExperience": [
                {"jobTitle": "Engineer", "employer": "Acme", "description": "Built things"}
            ],
            "skills": [{"name": "Python", "level": "expert"}],
        }

        response = self.client.post(
            "/api/ai/critique/",
            data=json.dumps(payload),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("critique", response.data)
        self.assertIn("overall", response.data["critique"])
        self.assertIn("sections", response.data["critique"])
        self.assertEqual(response.data["critique"]["overall"]["score"], 85)
