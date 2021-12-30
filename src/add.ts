import { createCanvas, loadImage } from 'canvas';
import {
  applyPalette,
  ColorDistanceFormula,
  ImageQuantization,
  utils as iq,
} from 'image-q';
import { inRange } from 'lodash-es';
import {
  HEIGHT,
  paletteArr,
  WIDTH,
} from './constants';
import MotakiError from './error';
import { loadPlan, savePlan } from './io';

const palette = new iq.Palette();
paletteArr.forEach((col) => {
  palette.add(iq.Point.createByQuadruplet(col.slice()));
});

function indexInPalette(point: iq.Point) {
  for (let i = 0; i < paletteArr.length; i += 1) {
    const col = paletteArr[i];
    if (point.r === col[0] && point.g === col[1] && point.b === col[2]) return i;
  }
  return -1;
}

export default async function add(
  name: string,
  imagePath: string,
  leftX: string,
  topY: string,
  {
    colorDistanceFormula,
    imageQuantization,
    width,
    height,
  }: {
    colorDistanceFormula: ColorDistanceFormula,
    imageQuantization: ImageQuantization,
    width?: string,
    height?: string,
  },
) {
  const plan = await loadPlan();

  if (plan[name]) throw new MotakiError(`the name [${name}] is already in use`);

  const lx = parseInt(leftX, 10);
  if (!Number.isSafeInteger(lx) || !inRange(0, WIDTH)) throw new MotakiError(`"${leftX}" is not a valid x coordinate`);
  const ty = parseInt(topY, 10);
  if (!Number.isSafeInteger(ty) || !inRange(0, HEIGHT)) throw new MotakiError(`"${topY}" is not a valid y coordinate`);

  const image = await loadImage(imagePath);

  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  let finalWidth = image.width;
  let finalHeight = image.height;

  if (width || height) {
    let scaleX = 1;
    let scaleY = 1;
    if (width) {
      finalWidth = parseInt(width, 10);
      if (!Number.isSafeInteger(finalWidth) || finalWidth === 0) throw new MotakiError(`Invalid width: ${width}`);
      scaleX = finalWidth / image.width;
    }
    if (!height) {
      scaleY = scaleX;
      finalHeight = Math.ceil(image.height * scaleY);
    } else {
      finalHeight = parseInt(height, 10);
      if (!Number.isSafeInteger(finalHeight) || finalHeight === 0) throw new MotakiError(`Invalid height: ${height}`);
      scaleY = finalHeight / image.height;
      if (!width) {
        scaleX = scaleY;
        finalWidth = Math.ceil(image.width * scaleX);
      }
    }
    ctx.scale(scaleX, scaleY);
  }

  if (lx + finalWidth > WIDTH) throw new MotakiError('Image position on x-axis out of range');
  if (ty + finalHeight > HEIGHT) throw new MotakiError('Image position on y-axis out of range');

  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, finalWidth, finalHeight);
  const result = await applyPalette(
    iq.PointContainer.fromImageData(imageData),
    palette,
    {
      colorDistanceFormula,
      imageQuantization,
    },
  );

  const pointArr = result.getPointArray();
  let data = '';
  for (let i = 0; i < finalWidth; i += 1) {
    for (let j = 0; j < finalHeight; j += 1) {
      const index = i * finalHeight + j;
      const point = pointArr[index];
      data += indexInPalette(point).toString(32);
    }
    if (i !== finalWidth - 1) data += '\n';
  }

  plan[name] = { x: lx, y: ty, data };

  await savePlan(plan);
}
