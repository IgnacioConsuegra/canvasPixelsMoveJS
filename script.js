const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'image.png';
const PARTICLE_DIAMETER = 1;
const particles = [];
let mouseX = Infinity;
let mouseY = Infinity;
canvas.addEventListener('mousemove', (event) => {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
})
canvas.addEventListener('mouseleave', (event) => {
  mouseX = Infinity;
  mouseY = Infinity;
})

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
function updateParticles() {
  const REPEL_RADIUS = 50;
  const REPEL_SPEED = 5;

  particles.forEach((particle) => {
    const distanceFromMouseX = mouseX - particle.x;
    const distanceFromMouseY = mouseY - particle.y;
    const distanceFromMouse = Math.sqrt(
      distanceFromMouseX ** 2 + distanceFromMouseY ** 2
    );
    if(distanceFromMouse < REPEL_RADIUS) {
      const angle = Math.atan2(distanceFromMouseY, distanceFromMouseX);
      const force = (REPEL_RADIUS - distanceFromMouse) / REPEL_RADIUS;
      const moveX = Math.cos(angle) * force * REPEL_SPEED;
      const moveY = Math.sin(angle) * force * REPEL_SPEED;
      particle.x -= moveX;
      particle.y -= moveY; 
    } else if (
      particle.x !== particle.originX || 
      particle.y !== particle.originY) {
      const distanceFromOriginX = particle.originX - particle.x;
      const distanceFromOriginY = particle.originY - particle.y;
      const distanceFromOrigin = Math.sqrt(
        distanceFromOriginX ** 2 + distanceFromOriginY ** 2
      );
      const angle = Math.atan2(distanceFromOriginY, distanceFromOriginX);
      const moveX = Math.cos(angle) * distanceFromOrigin;
      const moveY = Math.sin(angle) * distanceFromOrigin;
      particle.x += moveX;
      particle.y += moveY; 
    }
    //Delete this else if, if you want particles to stay the
    //position they move To.
    
  });
}
function drawParticles() {
  updateParticles();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, PARTICLE_DIAMETER / 2, 0, Math.PI * 2);
    // ctx.rect(particle.x, particle.y, PARTICLE_DIAMETER, PARTICLE_DIAMETER);
    ctx.fillStyle = particle.color;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}