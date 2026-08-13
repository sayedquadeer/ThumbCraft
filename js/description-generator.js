/**
 * YouTube Structured Description Generator Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('desc-form');
  const outputArea = document.getElementById('desc-output');

  if (!form || !outputArea) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = document.getElementById('desc-topic').value;
    const keywords = document.getElementById('desc-keywords').value;

    const template = `📌 In this video, we dive deep into ${topic}! 

Key Topics Covered:
- ${keywords.split(',').join('\n- ')}

---------------------------------------------
💡 SUBSCRIBE FOR MORE CONTENT:
https://youtube.com/example?sub_confirmation=1

TIMESTAMPS:
0:00 - Introduction
0:45 - Key Insights
3:30 - Detailed Breakdown
8:15 - Final Thoughts

#${topic.replace(/\s+/g, '')} #YouTubeCreator #ThumbCraft`;

    outputArea.value = template;
    showToast('Description generated!');
  });
});

