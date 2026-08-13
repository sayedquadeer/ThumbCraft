/**
 * Profile Picture Creator (800x800)
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('profile-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 800;

  function renderProfile() {
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, 0, 800, 800);

    // Circle Border
    ctx.beginPath();
    ctx.arc(400, 400, 360, 0, Math.PI * 2);
    ctx.strokeStyle = '#7600FF';
    ctx.lineWidth = 20;
    ctx.stroke();
  }

  renderProfile();

  const downloadBtn = document.getElementById('download-profile');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'profile-picture.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
});

