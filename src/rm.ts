import MotakiError from './error';
import { loadPlan, savePlan } from './io';

export default async function rm(name: string, { planPath }: {planPath: string}) {
  const plan = await loadPlan(planPath);
  if (plan[name]) {
    delete plan[name];
    await savePlan(plan, planPath);
  } else {
    throw new MotakiError(`task [${name}] does not exist`);
  }
}
