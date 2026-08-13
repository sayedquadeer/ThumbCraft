/**
 * Image Resizer Core Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  const upload = document.getElementById('resizer-upload');
  const canvas = document.getElementById('resizer-canvas');
  const downloadBtn = document.getElementById('resizer-download');
  
  if (!upload || !canvas) return;
  const ctx = canvas.getContext('2d');
  let currentImg = null;

  upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      currentImg = new Image();
      currentImg.onload = () => {
        applyPreset(1280, 720);
      };
      currentImg.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  });

  function applyPreset(width, height) {
    if (!currentImg) return;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(currentImg, 0, 0, width, height);
    showToast(`Resized image to ${width}x${height}`);
  }

  const presetBtns = document.querySelectorAll('.preset-btn');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const w = parseInt(btn.dataset.width);
      const h = parseInt(btn.dataset.height);
      applyPreset(w, h);
    });
  });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!currentImg) {
        showToast('Please upload an image first.', 'error');
        return;
      }
      const link = document.createElement('a');
      link.download = 'resized-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
});

