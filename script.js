const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'image.png';
const PARTICLE_DIAMETER = 2;
const particles = [];
img.addEventListener('load', () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
  const numRows = Math.round(img.height / PARTICLE_DIAMETER);
  const numColumn = Math.round(img.width / PARTICLE_DIAMETER);
  for (let row = 0; row < numRows; row++) {
    for (let column = 0; column < numColumn; column++){
      const pixelIndex = (row * PARTICLE_DIAMETER * img.width + column * PARTICLE_DIAMETER) * 4;
      const red = imageData[pixelIndex];
      const green = imageData[pixelIndex + 1];
      const blue = imageData[pixelIndex + 2];
      const alpha = imageData[pixelIndex + 3];
      particles.push({
        x: column + PARTICLE_DIAMETER + PARTICLE_DIAMETER / 2,
        y: row * PARTICLE_DIAMETER + PARTICLE_DIAMETER / 2,
        originX: column * PARTICLE_DIAMETER + PARTICLE_DIAMETER / 2,
        originY: row * PARTICLE_DIAMETER + PARTICLE_DIAMETER / 2,
        color: `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`,
      })
    }
  }
  drawParticles(); 
})

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, PARTICLE_DIAMETER / 2, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  })
}