const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'image.png';

img.addEventListener('load', () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
})