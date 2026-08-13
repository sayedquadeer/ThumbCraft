/**
 * Intelligent Frontend Template Title Generator
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('title-form');
  const resultsContainer = document.getElementById('title-results');

  if (!form || !resultsContainer) return;

  const templates = {
    curiosity: [
      "I Tried {topic} For 30 Days (Here's What Happened)",
      "The Secret About {topic} Nobody Talks About",
      "Why Everyone Is Wrong About {topic}"
    ],
    educational: [
      "The Ultimate Guide to {topic} (Step-by-Step)",
      "How to Master {topic} in 10 Minutes",
      "5 Simple Steps to Improve Your {topic}"
    ],
    viral: [
      "I Spent $1,000 on {topic} So You Don't Have To",
      "Testing Viral {topic} Hacks!",
      "Stop Doing {topic} Like This!"
    ]
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = document.getElementById('topic-input').value.trim();
    const tone = document.getElementById('tone-select').value;

    if (!topic) {
      showToast('Please enter a topic', 'error');
      return;
    }

    resultsContainer.innerHTML = '';
    const selectedTemplates = templates[tone] || templates.curiosity;

    selectedTemplates.forEach((tpl) => {
      const titleText = tpl.replace('{topic}', topic);
      const card = document.createElement('div');
      card.className = 'output-card';
      card.innerHTML = `
        <span class="output-text">${titleText}</span>
        <button class="btn btn-secondary btn-sm" onclick="copyToClipboard('${titleText.replace(/'/g, "\\'")}')">Copy</button>
      `;
      resultsContainer.appendChild(card);
    });

    showToast('Generated title suggestions!');
  });
});

