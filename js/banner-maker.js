/**
 * YouTube Banner Maker Canvas (2560x1440)
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('banner-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = 2560;
  canvas.height = 1440;

  function drawBanner() {
    // Background
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 2560, 1440);

    // Safe Area Overlay Guide
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(507, 507, 1546, 423); // Safe Desktop/Mobile area

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CHANNEL NAME', 1280, 700);
  }

  drawBanner();

  const downloadBtn = document.getElementById('download-banner');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'youtube-banner.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
});
