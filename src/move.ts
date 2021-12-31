import MotakiError from './error';
import { loadPlan, savePlan } from './io';

export default async function move(
  name: string,
  newx: string,
  newy: string,
  { planPath }: {planPath: string},
) {
  const plan = await loadPlan(planPath);
  if (plan[name]) {
    plan[name].x = parseInt(newx, 10);
    plan[name].y = parseInt(newy, 10);
    await savePlan(plan, planPath);
  } else {
    throw new MotakiError(`task [${name}] does not exist`);
  }
}
