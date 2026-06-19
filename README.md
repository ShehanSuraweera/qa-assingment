# CSCI 44052 – Software Quality and Automation
## Assignment 1 — Playwright & Postman Testing

### Live Playwright Test Report
**https://shehansuraweera.github.io/qa-assingment**

---

### Project Structure

| Path | Description |
|------|-------------|
| `tests/login.spec.js` | Playwright UI tests — login flow on the-internet.herokuapp.com |
| `postman/` | Postman collection — GET, POST, DELETE against JSONPlaceholder API |
| `docs/index.html` | Generated Playwright HTML report (served via GitHub Pages) |
| `playwright.config.js` | Playwright configuration |

### Running the Tests

```bash
npm install
npx playwright install chromium
npm test
```

### Test Coverage

**Playwright (4 tests):**
- Successful login redirects to secure area
- Failed login displays error message
- Login page renders all required UI components
- Logout returns user to login page

**Postman (14 assertions across 4 requests):**
- `GET /posts` — status 200, response < 200ms, array schema valid
- `GET /posts/1` — status 200, response < 200ms, object schema valid
- `POST /posts` — status 201, resource created with correct fields
- `DELETE /posts/1` — status 200, empty response body returned
