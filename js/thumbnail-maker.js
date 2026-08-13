/**
 * Canvas Engine for YouTube Thumbnail Maker (1280x720)
 */
class ThumbnailEditor {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.width = 1280;
    this.canvas.height = 720;
    
    this.elements = [];
    this.selectedElement = null;
    this.bgColor = '#0F172A';
    this.bgImage = null;

    this.history = [];
    this.historyStep = -1;

    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };

    this.initEvents();
    this.saveState();
    this.render();
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', () => this.handleMouseUp());

    // Controls
    const textBtn = document.getElementById('add-text-btn');
    if (textBtn) {
      textBtn.addEventListener('click', () => {
        this.addElement({
          type: 'text',
          text: 'YOUR TITLE HERE',
          x: 640,
          y: 360,
          fontSize: 70,
          fontFamily: 'Impact',
          fillColor: '#FFFFFF',
          strokeColor: '#000000',
          strokeWidth: 4,
          align: 'center'
        });
      });
    }

    const bgPicker = document.getElementById('bg-color-picker');
    if (bgPicker) {
      bgPicker.addEventListener('input', (e) => {
        this.bgColor = e.target.value;
        this.render();
      });
    }

    const imageUpload = document.getElementById('image-upload');
    if (imageUpload) {
      imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          const img = new Image();
          img.onload = () => {
            this.addElement({
              type: 'image',
              img: img,
              x: 640,
              y: 360,
              width: img.width > 600 ? 600 : img.width,
              height: img.width > 600 ? (600 * img.height) / img.width : img.height
            });
          };
          img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    const downloadPng = document.getElementById('download-png');
    if (downloadPng) {
      downloadPng.addEventListener('click', () => this.download('png'));
    }

    const downloadJpg = document.getElementById('download-jpg');
    if (downloadJpg) {
      downloadJpg.addEventListener('click', () => this.download('jpg'));
    }
  }

  addElement(el) {
    this.elements.push(el);
    this.selectedElement = el;
    this.saveState();
    this.render();
  }

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  handleMouseDown(e) {
    const pos = this.getMousePos(e);
    for (let i = this.elements.length - 1; i >= 0; i--) {
      const el = this.elements[i];
      if (this.isPointInElement(pos, el)) {
        this.selectedElement = el;
        this.isDragging = true;
        this.dragOffset = { x: pos.x - el.x, y: pos.y - el.y };
        this.render();
        return;
      }
    }
    this.selectedElement = null;
    this.render();
  }

  handleMouseMove(e) {
    if (!this.isDragging || !this.selectedElement) return;
    const pos = this.getMousePos(e);
    this.selectedElement.x = pos.x - this.dragOffset.x;
    this.selectedElement.y = pos.y - this.dragOffset.y;
    this.render();
  }

  handleMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.saveState();
    }
  }

  isPointInElement(pos, el) {
    if (el.type === 'text') {
      this.ctx.font = `${el.fontSize}px ${el.fontFamily}`;
      const width = this.ctx.measureText(el.text).width;
      return pos.x >= el.x - width / 2 && pos.x <= el.x + width / 2 &&
             pos.y >= el.y - el.fontSize && pos.y <= el.y;
    } else if (el.type === 'image') {
      return pos.x >= el.x - el.width / 2 && pos.x <= el.x + el.width / 2 &&
             pos.y >= el.y - el.height / 2 && pos.y <= el.y + el.height / 2;
    }
    return false;
  }

  saveState() {
    this.historyStep++;
    this.history = this.history.slice(0, this.historyStep);
    // Simple state clone
    this.history.push(JSON.stringify(this.elements));
  }

  render() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.elements.forEach((el) => {
      this.ctx.save();
      if (el.type === 'text') {
        this.ctx.font = `900 ${el.fontSize}px ${el.fontFamily}`;
        this.ctx.textAlign = el.align || 'center';
        this.ctx.textBaseline = 'middle';

        if (el.strokeWidth > 0) {
          this.ctx.strokeStyle = el.strokeColor;
          this.ctx.lineWidth = el.strokeWidth;
          this.ctx.strokeText(el.text, el.x, el.y);
        }

        this.ctx.fillStyle = el.fillColor;
        this.ctx.fillText(el.text, el.x, el.y);
      } else if (el.type === 'image') {
        this.ctx.drawImage(el.img, el.x - el.width / 2, el.y - el.height / 2, el.width, el.height);
      }

      if (el === this.selectedElement) {
        this.ctx.strokeStyle = '#00E5FF';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(el.x - 50, el.y - 30, 100, 60);
      }
      this.ctx.restore();
    });
  }

  download(format = 'png') {
    const link = document.createElement('a');
    link.download = `thumbcraft-thumbnail.${format}`;
    link.href = this.canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, 0.95);
    link.click();
    showToast(`Downloaded successfully as ${format.toUpperCase()}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('thumbnail-canvas')) {
    window.editor = new ThumbnailEditor('thumbnail-canvas');
  }
});
  
