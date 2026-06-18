from google import genai
from google.genai import types
import json
import os
from typing import Any

CRITIQUE_PROMPT = """
You are an expert resume reviewer. Analyze the provided resume data and give constructive,
actionable feedback.

Return ONLY valid JSON. No markdown, no code fences, no extra text.

Respond with this exact JSON structure:
{
  "overall": {
    "score": <integer 0-100>,
    "strengths": ["strength1", "strength2", "strength3"],
    "weaknesses": ["weakness1", "weakness2", "weakness3"],
    "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
  },
  "sections": {
    "personalDetails": {
      "score": <integer 0-100>,
      "feedback": "string",
      "suggestions": ["suggestion1", "suggestion2"]
    },
    "summary": {
      "score": <integer 0-100>,
      "feedback": "string",
      "suggestions": ["suggestion1", "suggestion2"]
    },
    "workExperience": {
      "score": <integer 0-100>,
      "feedback": "string",
      "suggestions": ["suggestion1", "suggestion2"]
    },
    "educationHistory": {
      "score": <integer 0-100>,
      "feedback": "string",
      "suggestions": ["suggestion1", "suggestion2"]
    },
    "skills": {
      "score": <integer 0-100>,
      "feedback": "string",
      "suggestions": ["suggestion1", "suggestion2"]
    }
  }
}

Scoring guidelines:
- 90-100: Excellent. Minor improvements only.
- 70-89: Good. Several areas to improve.
- 50-69: Average. Needs significant work.
- Below 50: Needs complete overhaul.

Be specific and actionable. Refer to the actual content provided.
"""

MODEL_ID = "gemini-2.5-flash"


def get_gemini_client() -> genai.Client | None:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
    return genai.Client(api_key=api_key)


def build_resume_text(resume_data: dict[str, Any]) -> str:
    pd = resume_data.get("personalDetails") or {}
    text = "=== RESUME DATA ===\n\n"

    name = " ".join(filter(None, [pd.get("firstName", ""), pd.get("lastName", "")]))
    if name:
        text += f"Name: {name}\n"
    if pd.get("email"):
        text += f"Email: {pd['email']}\n"
    if pd.get("jobTarget"):
        text += f"Target Role: {pd['jobTarget']}\n"
    contact = ", ".join(
        filter(None, [pd.get("city"), pd.get("state"), pd.get("country")])
    )
    if contact:
        text += f"Location: {contact}\n"

    summary = resume_data.get("summary", "")
    if summary:
        text += f"\n--- Summary ---\n{summary}\n"

    work = resume_data.get("workExperience", [])
    if work:
        text += "\n--- Work Experience ---\n"
        for exp in work:
            title = exp.get("jobTitle", "")
            employer = exp.get("employer", "")
            desc = exp.get("description", "")
            text += f"  {title} at {employer}\n"
            if desc:
                text += f"    {desc}\n"

    edu = resume_data.get("educationHistory", [])
    if edu:
        text += "\n--- Education ---\n"
        for e in edu:
            text += f"  {e.get('degree', '')} in {e.get('field', '')} - {e.get('school', '')}\n"

    skills = resume_data.get("skills", [])
    if skills:
        text += "\n--- Skills ---\n"
        for s in skills:
            text += f"  {s.get('name', '')} ({s.get('level', 'N/A')})\n"

    return text


def _parse_partial_json(raw: str) -> dict | None:
    decoder = json.JSONDecoder()
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[-1]
        if raw.endswith("```"):
            raw = raw[:-3]
        raw = raw.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        pass

    stack = []
    last_valid_end = -1

    for i, ch in enumerate(raw):
        if ch == "{":
            stack.append(ch)
        elif ch == "}":
            if stack:
                stack.pop()
                if not stack:
                    candidate = raw[: i + 1]
                    try:
                        return json.loads(candidate)
                    except json.JSONDecodeError:
                        pass

    for end_brace in range(len(raw) - 1, -1, -1):
        if raw[end_brace] == "}":
            candidate = raw[: end_brace + 1]
            try:
                return json.loads(candidate)
            except json.JSONDecodeError:
                continue

    return None


def critique_resume(resume_data: dict[str, Any]) -> dict[str, Any]:
    client = get_gemini_client()
    if not client:
        return {
            "error": True,
            "message": "GEMINI_API_KEY is not configured on the server.",
        }

    resume_text = build_resume_text(resume_data)

    response = client.models.generate_content(
        model=MODEL_ID,
        contents=[CRITIQUE_PROMPT, resume_text],
        config=types.GenerateContentConfig(
            temperature=0.3,
            max_output_tokens=8192,
        ),
    )

    raw = response.text.strip()

    critique = _parse_partial_json(raw)
    if critique is None:
        critique = {
            "overall": {
                "score": 0,
                "strengths": [],
                "weaknesses": [],
                "recommendations": ["Failed to parse AI response. Please try again."],
            },
            "sections": {},
            "_raw": raw,
        }

    return {"critique": critique}
