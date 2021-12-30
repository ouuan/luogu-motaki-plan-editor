import MotakiError from './error';
import { loadPlan, savePlan } from './io';

export default async function rm(name: string) {
  const plan = await loadPlan();
  if (plan[name]) {
    delete plan[name];
    await savePlan(plan);
  } else {
    throw new MotakiError(`task [${name}] does not exist`);
  }
}
