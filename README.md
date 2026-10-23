# Fridge to Fork

A simple English-language Generative AI assignment: enter one to five ingredients and generate a recipe with suggested quantities, estimated times, and numbered instructions. A real temperature slider (0–2) is passed to the model API. Choose one to four servings. No database or login is required.

## What is included

- `index.html`: responsive English interface and styles.
- `app.js`: form interaction, recipe display, and copy button.
- `api/generate.js`: server function that calls OpenAI and keeps the API key private.
- `package.json`: Node.js configuration; no external dependencies.
- `vercel.json`: function duration configuration.
- `README.md`: setup instructions.

## 1. Download and extract

Extract `fridge-to-fork.zip` on your computer. Upload the extracted files, not the ZIP. You do not need to install a code editor or Node.js to deploy through GitHub and Vercel.

## 2. Upload to GitHub

1. Sign in at https://github.com.
2. Click **+ → New repository**. Name it `fridge-to-fork`, choose Private, enable **Add a README file**, and click **Create repository**.
3. In the repository, choose **Add file → Upload files**.
4. Drag in `index.html`, `app.js`, `package.json`, `vercel.json`, `README.md`, and the whole `api` folder. Do not upload an outer folder that contains the project: `index.html` must be visible at the repository root.
5. Click **Commit changes**. Replacing the automatically created README with this one is expected.
6. If the browser does not preserve the `api` folder, select **Add file → Create new file**, type `api/generate.js` as the filename, paste the contents of the extracted file, and click **Commit changes**.

## 3. Deploy on Vercel

1. Sign in at https://vercel.com using **Continue with GitHub**.
2. Choose **Add New → Project**. Grant access to the `fridge-to-fork` repository if needed, then choose **Import**.
3. Set **Framework Preset** to **Other**. Keep **Root Directory** at the repository root. Leave **Build Command** empty. Keep **Output Directory** at the default for Other (the project root, `.`); do not enter `dist` or `public`.
4. Under **Environment Variables**, add:

| Name | Value |
| --- | --- |
| `OPENAI_API_KEY` | Your instructor's OpenAI API key, without quotation marks |
| `OPENAI_MODEL` | `gpt-4o-mini` |

5. Apply the variables to Production and Preview. Enable Sensitive for the API key if available.
6. Click **Deploy** and wait for completion. Open the website URL Vercel provides.
7. If you add or change variables later, use **Settings → Environment Variables → Save**, then **Deployments → latest deployment → three-dot menu → Redeploy**. Existing deployments do not pick up new variable values automatically.

“4 mini” is ambiguous. The default here is GPT-4o mini (letter o), API ID `gpt-4o-mini`. If your instructor meant GPT-4.1 mini, set `OPENAI_MODEL` to `gpt-4.1-mini` instead. Both are allowed by this project's server code. API access depends on your instructor's key.

## 4. Test the website

1. Enter pasta, tomatoes, mozzarella, olive oil, and salt.
2. Select 2 servings and temperature 0.7. Click **Create my recipe**.
3. Check that the recipe is English and contains suggested quantities, times, and steps. The footer below it displays the model and temperature actually used.
4. Clear four fields and try one ingredient such as potatoes. Empty fields are ignored; any one of the five fields may be used.
5. Leave all fields empty and confirm that the form asks for at least one ingredient.
6. Keep ingredients and servings unchanged; compare multiple generations at 0.2 and 1.2. Temperature changes probabilities, so a single pair of outputs may not show an obvious difference. A low value does not guarantee identical results.

## How it works

The browser sends ingredients, servings, and temperature to `/api/generate`. Vercel runs `api/generate.js`, reads `process.env.OPENAI_API_KEY`, and contacts `https://api.openai.com/v1/chat/completions`. The response is displayed as plain text. The key never goes to the browser. Do not put a key in GitHub, HTML, JavaScript sent to the browser, screenshots, or your assignment report.

Only the supplied ingredients and water are requested. Salt and oil must count among the five ingredients if desired. The model is instructed to reject unsafe or impractical combinations, but generated recipes still need review. Quantities and times are suggestions, not guarantees. The slider controls the actual `temperature` API field; it does not change oven temperature or insert a creativity instruction into the prompt.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Missing API key | Add `OPENAI_API_KEY` in Vercel and redeploy. |
| Invalid API key | Ask the instructor to confirm it is an OpenAI API key, copied in full. ChatGPT access alone is not API access. |
| Model access error | Ask the instructor to check model permissions and `OPENAI_MODEL`. |
| Credit or billing error | The owner of the API project needs to check the available credit/billing. |
| Website 404 | Put `index.html` at repository root; use Framework Preset Other. |
| Invalid server response | Check the exact path `api/generate.js` and the Vercel deployment logs. |
| Local file opens but cannot generate | Use the deployed Vercel URL. The server function cannot run from a local HTML file. |

## Validation and limits

JavaScript syntax and simulated server requests were checked, including one/five ingredient limits, invalid input, real temperature forwarding, an unchanged prompt across temperatures, and API error handling. No real API request was made with your instructor's key. A complete live test requires deployment and a valid key. Browser layout was not independently tested in a browser in this environment.

This is a small assignment demo without persistent rate limiting or authentication. Anyone able to access the site can make recipe requests against the configured API credit. It has not been prepared for unrestricted public use.

As checked on October 23, 2026, GPT-4o mini is still available but OpenAI lists its shutdown for January 14, 2027. If the assignment is due after that date, confirm a compatible model with the instructor.

## Sources

- https://developers.openai.com/api/docs/models/gpt-4o-mini
- https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create
- https://developers.openai.com/api/docs/deprecations
- https://vercel.com/docs/functions/runtimes/node-js
- https://vercel.com/docs/environment-variables
