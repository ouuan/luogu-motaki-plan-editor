import { readFile, writeFile } from 'fs/promises';
import { PLAN_FILE } from './constants';
import MotakiError from './error';
import { Plan } from './types';
import { isPlan, validatePlan } from './validatePlan';

export async function loadPlan(): Promise<Plan> {
  let buffer;
  try {
    buffer = await readFile(PLAN_FILE);
  } catch (e) {
    return {};
  }
  const plan = JSON.parse(buffer.toString());
  if (!isPlan(plan)) throw new MotakiError('invalid motaki-plan.json format');
  const validate = validatePlan(plan);
  if (validate !== true) throw new MotakiError(`invalid motaki-plan.json: ${validate}`);
  return plan;
}

export async function savePlan(plan: Plan) {
  const validate = validatePlan(plan);
  if (validate !== true) throw new MotakiError(`invalid plan after operation: ${validate}`);
  return writeFile(PLAN_FILE, JSON.stringify(plan, null, 2));
}
