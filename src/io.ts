import { readFile, writeFile } from 'fs/promises';
import MotakiError from './error';
import { Plan } from './types';
import { isPlan, validatePlan } from './validatePlan';

export async function loadPlan(planPath: string): Promise<Plan> {
  let buffer;
  try {
    buffer = await readFile(planPath);
  } catch (e) {
    return {};
  }
  const plan = JSON.parse(buffer.toString());
  if (!isPlan(plan)) throw new MotakiError(`[${planPath}] has a wrong format`);
  const validate = validatePlan(plan);
  if (validate !== true) throw new MotakiError(`[${planPath}] is invalid: ${validate}`);
  return plan;
}

export async function savePlan(plan: Plan, planPath: string) {
  const validate = validatePlan(plan);
  if (validate !== true) throw new MotakiError(`invalid plan after operation: ${validate}`);
  return writeFile(planPath, JSON.stringify(plan, null, 2));
}
