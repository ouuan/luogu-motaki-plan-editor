import MotakiError from './error';
import { loadPlan, savePlan } from './io';
import { Plan } from './types';

export default async function merge(planPaths: string[], { planPath }: {planPath: string}) {
  const promises = planPaths.map(async (path) => {
    const plan = await loadPlan(path);
    return [path, plan] as const;
  });
  const arr = await Promise.all(promises);
  const nameUsed = new Map<string, string>();
  const mergedPlan: Plan = {};

  arr.forEach(([path, plan]) => {
    Object.keys(plan).forEach((name) => {
      const previousPath = nameUsed.get(name);
      if (previousPath) {
        throw new MotakiError(`the task name [${name}] is used by both [${previousPath}] and [${path}]`);
      }
      nameUsed.set(name, path);
      mergedPlan[name] = plan[name];
    });
  });

  await savePlan(mergedPlan, planPath);
}
