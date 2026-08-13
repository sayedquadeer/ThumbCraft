/**
 * Thumbnail Text Generator Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('text-gen-form');
  const resultsContainer = document.getElementById('text-results');

  if (!form || !resultsContainer) return;

  const textFormats = [
    "DON'T DO THIS!",
    "IT WORKED?",
    "100% REAL",
    "THE TRUTH",
    "STOP NOW",
    "NEXT LEVEL"
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = document.getElementById('topic-input').value.trim();

    if (!topic) {
      showToast('Please enter a topic', 'error');
      return;
    }

    resultsContainer.innerHTML = '';
    textFormats.forEach((text) => {
      const card = document.createElement('div');
      card.className = 'output-card';
      card.innerHTML = `
        <span class="output-text" style="font-weight:900; color:var(--accent-cyan);">${text}</span>
        <button class="btn btn-secondary btn-sm" onclick="copyToClipboard('${text}')">Copy</button>
      `;
      resultsContainer.appendChild(card);
    });
  });
});

