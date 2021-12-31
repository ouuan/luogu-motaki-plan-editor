import MotakiError from './error';
import { loadPlan, savePlan } from './io';

export default async function rename(
  oldName: string,
  newName: string,
  { planPath }: {planPath: string},
) {
  const plan = await loadPlan(planPath);
  if (!plan[oldName]) {
    throw new MotakiError(`task [${oldName}] does not exist`);
  }
  if (plan[newName]) {
    throw new MotakiError(`task [${newName}] already exists`);
  }
  plan[newName] = plan[oldName];
  delete plan[oldName];
  await savePlan(plan, planPath);
}
