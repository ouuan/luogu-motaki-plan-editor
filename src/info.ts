/* eslint-disable no-console */
import MotakiError from './error';
import { loadPlan } from './io';

export default async function info(args: string[]) {
  const plan = await loadPlan();
  const names = args.length ? args : Object.keys(plan);
  if (names.length === 0) {
    console.log('The plan is empty');
    return;
  }
  names.forEach((name) => {
    if (plan[name]) {
      const { x, y, data } = plan[name];
      const lines = data.split('\n');
      const width = lines.length;
      const height = lines[0].length;
      console.log(`Name:  ${name}`);
      console.log(`Range: (${x}, ${y}) ~ (${x + width - 1}, ${y + height - 1})`);
      console.log(`Size:  ${width} x ${height} = ${width * height}\n`);
    } else {
      throw new MotakiError(`task [${name}] does not exist`);
    }
  });
}
