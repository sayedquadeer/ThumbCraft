/**
 * Browser-side Client Image Compressor Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  const upload = document.getElementById('compressor-upload');
  const qualitySlider = document.getElementById('quality-slider');
  const qualityVal = document.getElementById('quality-val');
  const downloadBtn = document.getElementById('compressor-download');
  const origSizeEl = document.getElementById('orig-size');
  const compSizeEl = document.getElementById('comp-size');

  if (!upload) return;

  let originalFile = null;
  let compressedBlob = null;

  upload.addEventListener('change', (e) => {
    originalFile = e.target.files[0];
    if (!originalFile) return;

    if (origSizeEl) origSizeEl.innerText = formatBytes(originalFile.size);
    processCompression();
  });

  if (qualitySlider) {
    qualitySlider.addEventListener('input', (e) => {
      if (qualityVal) qualityVal.innerText = `${e.target.value}%`;
      processCompression();
    });
  }

  function processCompression() {
    if (!originalFile) return;

    const quality = (qualitySlider ? qualitySlider.value : 80) / 100;
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          compressedBlob = blob;
          if (compSizeEl) compSizeEl.innerText = formatBytes(blob.size);
        }, 'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(originalFile);
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!compressedBlob) {
        showToast('Upload an image first', 'error');
        return;
      }
      const link = document.createElement('a');
      link.download = 'compressed-image.jpg';
      link.href = URL.createObjectURL(compressedBlob);
      link.click();
    });
  }
});

