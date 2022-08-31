const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const TOP_HUE = 144;
const BOTTOM_HUE = 50;

type PixelType = [number, number, number, number];

const getRandomHue = (): number => {
  return Math.floor(Math.random() * (TOP_HUE - BOTTOM_HUE) + BOTTOM_HUE);
};

const getRandomDirection = (): number => {
  return Math.random() > 0.5 ? 1 : -1;
};

const renderPixel = (pixel: PixelType, context: CanvasRenderingContext2D) => {
  const [x, y, hue] = pixel;
  context.fillStyle = `hsl(${hue}, 50%, 40%)`;
  context.fillRect(x, y, 1, 1);
  context.fillRect(x, y, 1, 1);
};

const renderPixels = (data: PixelType[], context: CanvasRenderingContext2D) => {
  data.forEach(pixel => renderPixel(pixel, context));
};

const updatePixel = (pixel: PixelType): PixelType => {
  let direction = pixel[3];
  const velocity = (Math.random() * 30 + 20) * 0.01 * direction;
  let hue = pixel[2] + velocity;
  if (hue >= BOTTOM_HUE && hue <= TOP_HUE) return [pixel[0], pixel[1], hue, direction];
  hue -= 2 * velocity;
  direction *= -1;
  return [pixel[0], pixel[1], hue, direction];
};

const updatePixels = (data: PixelType[]): PixelType[] => {
  return data.map(updatePixel);
};

const animate = ((): () => void => {
  let pixels: PixelType[] = [
    [0, 0, getRandomHue(), getRandomDirection()],
    [1, 0, getRandomHue(), getRandomDirection()],
    [0, 1, getRandomHue(), getRandomDirection()],
    [1, 1, getRandomHue(), getRandomDirection()],
  ];
  return () => {
    pixels = updatePixels(pixels);
    renderPixels(pixels, ctx);
    requestAnimationFrame(animate);
  };
})();

animate();
