# Resume Builder

A full-stack resume builder with template switching, live preview, PDF export, and AI-powered critique. Built with Next.js 16 (App Router), Django REST Framework, and Google Gemini.

## Tech Stack

**Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Zustand, html-to-image + jsPDF

**Backend:** Django 6, Django REST Framework, google-genai (Gemini 2.5 Flash), SQLite, python-dotenv

---

## Setup

### Prerequisites

- Node.js 20+
- Python 3.13+
- pnpm (recommended) or npm

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API server starts on `http://localhost:8000`.

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

The app starts on `http://localhost:3000`.

### Environment Variables

#### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | — | Google Gemini API key for AI critique |
| `DJANGO_SECRET_KEY` | No | (auto-generated) | Django secret key |
| `DJANGO_DEBUG` | No | `True` | Debug mode |
| `DJANGO_ALLOWED_HOSTS` | No | `localhost,127.0.0.1` | Allowed hosts |
| `CORS_ALLOWED_ORIGINS` | No | `http://localhost:3000,http://127.0.0.1:3000` | CORS origins |

#### Frontend (`frontend/.env.local`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:8000` | Backend API base URL |

---

## Features Completed

### Milestone 1 — Resume Editor

- Create and edit resumes with 5 sections: Personal Details, Summary, Work Experience, Education, Skills
- Add/remove multiple work experiences and education entries
- Date picker for start/end dates with "Currently working/studying" toggle
- Sticky navigation bar with Back/Next for section progression
- Dynamic progress bar showing completion % across all 5 sections
- Form state persisted to localStorage with auto-save on every change

### Milestone 2 — Template Switcher

- 3 visual templates: Classic (single-column), Modern (sidebar), Attractive (banner with gradient accent)
- Templates control layout, fonts (Playfair Display + Inter), colors (primary/accent), and background design elements
- Live preview updates in real-time as you edit
- Desktop: side-by-side template grid (40%) + live preview (60%)
- Mobile: "Customise Template" button opens bottom Sheet overlay
- Template cards on home page show mini mockups of each design
- Clicking a template creates a new resume with UUID and navigates to the editor

### Milestone 3 — AI Critique

- **Endpoint:** `POST /api/ai/critique/` — accepts full resume JSON, returns structured critique
- **AI Provider:** Google Gemini 2.5 Flash via `google-genai` SDK
- **Section-by-section critique:** Personal Details, Summary, Work Experience, Education, Skills — each with score (0-100), feedback, and actionable suggestions
- **Overall assessment:** aggregate score, strengths, weaknesses, and recommendations
- **Prompt engineering:** Structured prompt with scoring guidelines (90-100 Excellent → below 50 Needs overhaul) instructs Gemini to return **only valid JSON** with no markdown wrapping
- **Truncation handling:** `_parse_partial_json()` fallback salvages partial JSON if response is cut off
- **Frontend integration:** "AI Critique" button on the edit page (desktop header / mobile sticky bar), results displayed in a Sheet drawer with score badges, color-coded progress bars, collapsible section rows, and error handling with retry
- **Error handling:** 502 if API key missing, 400 for invalid data, graceful fallback with parse errors

### Milestone 5 — Export / Save

- **Save:** Resume state persisted to browser localStorage with namespaced keys (`{resumeId}-info`, `{resumeId}-template`, etc.)
- **Multi-resume support:** Create multiple resumes, each with its own UUID and localStorage namespace
- **Recent Resumes:** Home page shows a "Recent Work" tab with saved resumes, mini previews showing actual data, edit and delete buttons (with AlertDialog confirmation)
- **PDF Export:** Downloads as `resume.pdf` using `html-to-image` (captures DOM as PNG) + `jsPDF` (wraps to A4). Inner content div captured at full A4 dimensions (transform: none, explicit width/height passed to `toPng()`)
- **Cross-tab export:** The preview component uses `forceMount` so the download button works from both Edit and Customise tabs

### Not Attempted

- **Milestone 4 — ATS Score (20 pts + 10 bonus):** ATS compatibility analysis with keyword gap detection was not implemented.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/ai/critique/` | Submit resume JSON, receive per-section AI critique with scores and suggestions |

### Critique request format

```json
{
  "personalDetails": { "firstName": "...", "lastName": "...", "email": "...", ... },
  "summary": "string",
  "workExperience": [{ "jobTitle": "...", "employer": "...", "description": "...", ... }],
  "educationHistory": [{ "school": "...", "degree": "...", ... }],
  "skills": [{ "name": "...", "level": "beginner|intermediate|advanced|expert" }]
}
```

### Critique response format

```json
{
  "critique": {
    "overall": {
      "score": 78,
      "strengths": ["..."],
      "weaknesses": ["..."],
      "recommendations": ["..."]
    },
    "sections": {
      "personalDetails": { "score": 70, "feedback": "...", "suggestings": ["..."] },
      "summary": { ... },
      "workExperience": { ... },
      "educationHistory": { ... },
      "skills": { ... }
    }
  }
}
```

---

## AI Prompt Design

The critique endpoint uses the following prompt strategy:

1. **System instruction** defines the reviewer role (expert resume reviewer) and output format (strict JSON only)
2. **Scoring rubric** embedded in the prompt: 90-100 = Excellent, 70-89 = Good, 50-69 = Average, below 50 = Needs overhaul
3. **Resume data** formatted as plain text with labeled sections (Name, Email, Summary, Work Experience, Education, Skills)
4. **Temperature 0.3** for consistent, deterministic output
5. **Max output tokens 8192** to accommodate full critique without truncation
6. **Fallback parser** (`_parse_partial_json`) attempts to recover truncated JSON responses by finding the longest valid JSON prefix

---

## Architecture

### Frontend

- **State:** Zustand store with localStorage persistence. Multi-resume via namespaced keys (`{resumeId}-info`, `{resumeId}-template`, etc.)
- **Templates:** Hardcoded array in `src/utils/templates.ts` with 3 layouts (single-column, sidebar, banner)
- **Preview:** CSS `transform: scale()` for responsive A4 preview. Mobile scales down uniformly using ResizeObserver
- **PDF Export:** `forwardRef` + `useImperativeHandle` exposes inner unscaled content div. `html-to-image` captures at 2x pixel ratio → `jsPDF` renders to A4

### Backend

- **Stack:** Django 6 + DRF, single `CritiqueView` APIView
- **Validation:** DRF Serializer validates incoming resume data with defaults for missing fields
- **AI Client:** `google.genai.Client` with `gemini-2.5-flash` model
- **Error handling:** 502 if API key unconfigured, 400 for validation errors, JSON parse fallback for malformed AI responses

---

## Known Issues

### Pre-existing (not introduced by this project)

- **Type error in `src/components/ui/calendar.tsx`** — Pre-existing type incompatibility unrelated to resume builder functionality.
- **Lint errors in `src/components/ui/datePicker.tsx`, `eduInputSheet.tsx`, `inputSheet.tsx`** — Pre-existing lint issues (`any` types, `useCallback` patterns, setState-in-effect). These are third-party or existing component files not modified during development.
- **ESLint `@typescript-eslint/no-explicit-any` warnings** — Several pre-existing `any` usages in utility files (`helper.ts`, etc.).

### Project-specific

- **Mobile critique drawer scrolling** — The bottom-sheet critique drawer constrains height via inline `style={{ height: "70vh" }}` to override the shadcn Sheet component's `data-[side=bottom]:h-auto` class (which has higher CSS specificity). Scrolling works but the height constraint may need adjustment on very small screens.
- **No ATS Score feature** — Milestone 4 was not implemented. The backend and frontend would need keyword extraction, job description input UI, and ATS compatibility analysis logic.
- **PDF export captures screenshots** — Uses DOM-to-image approach rather than true PDF generation. Fonts are rasterized. Text is not selectable in the exported PDF.
- **No authentication** — The backend critique endpoint is unauthenticated. Anyone with the URL can submit resume data for analysis.
- **Gemini API key required** — The AI critique feature will not function without a valid `GEMINI_API_KEY` in `backend/.env`. The endpoint returns a 502 error if the key is missing.