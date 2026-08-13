/**
 * YouTube Shorts Thumbnail Maker (1080x1920)
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('shorts-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = 1080;
  canvas.height = 1920;

  function renderShorts() {
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 1080, 1920);

    ctx.fillStyle = '#FF0055';
    ctx.font = '900 100px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CRAZY SHORTS!', 540, 960);
  }

  renderShorts();

  const downloadBtn = document.getElementById('download-shorts');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'shorts-thumbnail.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
});

