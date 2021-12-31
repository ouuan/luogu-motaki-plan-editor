import { inRange } from 'lodash-es';
import { HEIGHT, WIDTH } from './constants';
import { Plan } from './types';

export function isPlan(obj: object): obj is Plan {
  for (const value of Object.values(obj)) {
    if (typeof value?.x !== 'number') return false;
    if (typeof value?.y !== 'number') return false;
    if (typeof value?.data !== 'string') return false;
  }
  return true;
}

export function validatePlan(plan: Plan): true | string {
  const vis: {[index: number]: string} = {};
  for (const [name, { x, y, data }] of Object.entries(plan)) {
    if (/\s/.test(name)) return `task name [${name}] contains white space(s)`;
    const prefix = `task [${name}]: `;
    if (!Number.isSafeInteger(x) || !Number.isSafeInteger(y)) return `${prefix}coordinate is not integer`;
    if (!inRange(x, 0, WIDTH) || !inRange(y, 0, HEIGHT)) return `${prefix}coordinate out of range`;
    const lines = data.split('\n');
    const width = lines.length;
    if (width === 0 || x + width > WIDTH) return `${prefix}image out of x range`;
    const height = lines[0].length;
    if (height === 0 || y + height > HEIGHT) return `${prefix}image out of y range`;
    for (let i = x; i < x + width; i += 1) {
      if (lines[i - x].length !== height) {
        return `${prefix}data has different height in each column`;
      }
      for (let j = y; j < y + height; j += 1) {
        if (Number.isNaN(parseInt(lines[i - x][j - y], 32))) return `${prefix}data contains invalid character`;
        const index = i * HEIGHT + j;
        if (vis[index]) return `${prefix}overlaps with task [${vis[index]}]`;
        vis[index] = name;
      }
    }
  }
  return true;
}
