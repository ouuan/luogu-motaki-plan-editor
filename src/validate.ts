/* eslint-disable no-console */
import MotakiError from './error';
import { loadPlan } from './io';

export default async function validate({ planPath }: {planPath: string}) {
  try {
    await loadPlan(planPath);
    console.log('motaki-plan.json is valid');
  } catch (err) {
    if (err instanceof MotakiError) {
      console.log(err.msg);
    } else throw err;
  }
}
