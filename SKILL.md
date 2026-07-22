---
name: royal-shepherd-repo-maintainer
description: Use this skill when updating the Royal Shepherd website, dashboard pages, gallery data, or the FastAPI backend in this workspace. It captures the preferred repository workflow: inspect relevant files first, preserve existing behavior, and verify the change with targeted checks.
---

# Royal Shepherd Repo Maintainer

Use this skill when working in the Royal Shepherd workspace on frontend pages, dashboard interactions, gallery content, styling, or backend API changes.

## What this skill helps with
- Updating static site pages such as `index.html`, `captain-dashboard.html`, `commander-dashboard.html`, and `exco-dashboard.html`
- Adjusting shared frontend behavior in `app.js` and `index.css`
- Updating gallery content in `gallery-data.js`
- Aligning the FastAPI backend in `backend/main.py` with frontend expectations
- Improving local setup or documentation in `README.md`

## Preferred workflow
1. Read the relevant files before changing anything.
2. Confirm the current structure, UI flow, and data contract involved in the task.
3. Make the smallest targeted change that solves the stated request.
4. Preserve compatibility with the rest of the site unless the user explicitly requests a rewrite.
5. Validate the result with the most relevant check available:
   - frontend: confirm the affected page or script still loads and behaves as expected
   - backend: verify the endpoint logic, payload shape, and response structure
   - tests: run the repository’s targeted verification command where applicable

## Decision points
- If the task is mainly UI or client-side behavior, inspect the corresponding HTML, CSS, and JavaScript together.
- If the task touches API behavior, inspect the backend route definitions and confirm how the frontend depends on those shapes.
- If the task is documentation-only, update the setup guidance without changing app behavior.
- If the request is broad or ambiguous, narrow the scope to the smallest set of files needed to complete the task safely.

## Quality bar
A change is complete when all of the following are true:
- The requested change is implemented with minimal scope.
- Existing behavior outside the requested area is preserved.
- The data format expected by the frontend and backend remains compatible.
- The relevant validation step has been run or clearly noted if not runnable in the current environment.

## Example prompts
- Update the captain dashboard form flow to support a new field.
- Fix a broken modal interaction in the gallery or dashboard views.
- Add or adjust a FastAPI endpoint for company data.
- Improve the README setup instructions for running the project locally.

## Notes for future customization
This skill is workspace-scoped and intentionally focused on the Royal Shepherd repository’s existing architecture. If you want a broader variant later, create a second skill that emphasizes debugging or release verification rather than routine maintenance.
