const form = document.querySelector('#form');
const slider = document.querySelector('#temperature');
const value = document.querySelector('#tempvalue');
const generate = document.querySelector('#generate');
const recipe = document.querySelector('#recipe');
const meta = document.querySelector('#meta');
const errorBox = document.querySelector('#error');
const copy = document.querySelector('#copy');
let busy = false;
slider.addEventListener('input', () => { value.textContent = Number(slider.value).toFixed(1); });
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (busy) return;
  const ingredients = [...document.querySelectorAll('[data-ingredient]')].map(i => i.value.trim()).filter(Boolean);
  if (!ingredients.length) {
    errorBox.textContent = 'Please enter at least one ingredient.';
    errorBox.hidden = false;
    return;
  }
  const temperature = Number(slider.value);
  const servings = Number(document.querySelector('#servings').value);
  busy = true;
  generate.disabled = true;
  generate.textContent = 'Your recipe is taking shape…';
  recipe.setAttribute('aria-busy', 'true');
  errorBox.hidden = true;
  try {
    if (location.protocol === 'file:') throw new Error('To generate a recipe, open your deployed Vercel website. The local file only displays the page.');
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients, servings, temperature }),
      signal: AbortSignal.timeout(55000)
    });
    let data;
    try { data = await response.json(); }
    catch { throw new Error('Invalid server response. Check that api/generate.js exists in your repository and that deployment has completed.'); }
    if (!response.ok) throw new Error(data.error || 'Unable to generate a recipe.');
    if (typeof data.recipe !== 'string' || !data.recipe.trim()) throw new Error('The response was empty. Please try again.');
    recipe.classList.remove('empty');
    recipe.textContent = data.recipe;
    meta.textContent = `${data.servings} ${data.servings === 1 ? 'serving' : 'servings'} · Temperature ${data.temperature.toFixed(1)} · ${data.model}`;
    copy.hidden = false;
    copy.textContent = 'Copy';
  } catch (error) {
    errorBox.textContent = error.name === 'TimeoutError' ? 'The request is taking too long. Please wait and try again.' : error.message;
    errorBox.hidden = false;
  } finally {
    busy = false;
    generate.disabled = false;
    generate.textContent = 'Create my recipe ↗';
    recipe.removeAttribute('aria-busy');
  }
});
copy.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(recipe.textContent); copy.textContent = 'Copied!'; }
  catch { copy.textContent = 'Select and copy the text'; }
});
