/**
 * Gaming Thumbnail Maker Specialization
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gaming-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = 1280;
  canvas.height = 720;

  function renderGaming() {
    ctx.fillStyle = '#05050A';
    ctx.fillRect(0, 0, 1280, 720);

    // High energy glowing background accent
    const grad = ctx.createRadialGradient(640, 360, 50, 640, 360, 600);
    grad.addColorStop(0, '#7600FF');
    grad.addColorStop(1, '#05050A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1280, 720);

    ctx.fillStyle = '#00E5FF';
    ctx.font = '900 110px Impact';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00E5FF';
    ctx.shadowBlur = 20;
    ctx.fillText('EPIC VICTORY', 640, 380);
  }

  renderGaming();

  const downloadBtn = document.getElementById('download-gaming');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'gaming-thumbnail.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
});

