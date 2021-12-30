import {
  ColorDistanceFormula,
  ImageQuantization,
} from 'image-q';
import { assertTypeEqual } from './assertTypeEqual';

export type {
  ColorDistanceFormula,
  ImageQuantization,
};

export const colorDistanceFormulas = [
  'cie94-textiles',
  'cie94-graphic-arts',
  'ciede2000',
  'color-metric',
  'euclidean',
  'euclidean-bt709-noalpha',
  'euclidean-bt709',
  'manhattan',
  'manhattan-bt709',
  'manhattan-nommyde',
  'pngquant',
] as const;

assertTypeEqual<ColorDistanceFormula, (typeof colorDistanceFormulas)[number]>(true);

export const imageQuantizations = [
  'nearest',
  'riemersma',
  'floyd-steinberg',
  'false-floyd-steinberg',
  'stucki',
  'atkinson',
  'jarvis',
  'burkes',
  'sierra',
  'two-sierra',
  'sierra-lite',
] as const;

assertTypeEqual<ImageQuantization, (typeof imageQuantizations)[number]>(true);

export const paletteArr = [
  [0, 0, 0],
  [255, 255, 255],
  [170, 170, 170],
  [85, 85, 85],
  [254, 211, 199],
  [255, 196, 206],
  [250, 172, 142],
  [255, 139, 131],
  [244, 67, 54],
  [233, 30, 99],
  [226, 102, 158],
  [156, 39, 176],
  [103, 58, 183],
  [63, 81, 181],
  [0, 70, 112],
  [5, 113, 151],
  [33, 150, 243],
  [0, 188, 212],
  [59, 229, 219],
  [151, 253, 220],
  [22, 115, 0],
  [55, 169, 60],
  [137, 230, 66],
  [215, 255, 7],
  [255, 246, 209],
  [248, 203, 140],
  [255, 235, 59],
  [255, 193, 7],
  [255, 152, 0],
  [255, 87, 34],
  [184, 63, 39],
  [121, 85, 72],
] as const;

export const PLAN_FILE = 'motaki-plan.json';
export const WIDTH = 1000;
export const HEIGHT = 600;
