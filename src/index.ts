import { Command, Option } from 'commander';
import add from './add';
import { colorDistanceFormulas, imageQuantizations, PLAN_FILE } from './constants';
import MotakiError from './error';
import info from './info';
import merge from './merge';
import move from './move';
import rename from './rename';
import rm from './rm';
import validate from './validate';

const cmd = new Command();

cmd.version('0.1.0');
cmd.showSuggestionAfterError();

const planPathOption = new Option('-p, --planPath <planPath>', 'the path to motaki-plan.json').default(PLAN_FILE);

cmd.command('add <name> <imageFilePath> <leftX> <topY>')
  .description('add a new task')
  .option('--width <width>', 'resize image, set width')
  .option('--height <height>', 'resize image, set height')
  .option('--override', 'allow overriding existing task')
  .addOption(planPathOption)
  .addOption(
    new Option('--colorDistanceFormula <formula>', 'set color distance formula for image quantization')
      .choices(colorDistanceFormulas as any as string[]) // https://github.com/tj/commander.js/pull/1667
      .default('color-metric'),
  )
  .addOption(
    new Option('--imageQuantization <method>', 'set image quantization method')
      .choices(imageQuantizations as any as string[])
      .default('floyd-steinberg'),
  )
  .action(add);

cmd.command('info [names...]')
  .description('show info of some task(s) or all tasks if no name is provided')
  .addOption(planPathOption)
  .action(info);

cmd.command('rm <name>')
  .description('remove a task')
  .addOption(planPathOption)
  .action(rm);

cmd.command('move <name> <newx> <newy>')
  .description('move the position of a task')
  .addOption(planPathOption)
  .action(move);

cmd.command('rename <oldName> <newName>')
  .description('rename a task')
  .addOption(planPathOption)
  .action(rename);

cmd.command('validate')
  .description('validate the current plan')
  .addOption(planPathOption)
  .action(validate);

cmd.command('merge <planPaths...>')
  .description('merge multiple plans into a single plan')
  .addOption(planPathOption)
  .action(merge);

cmd.parseAsync(process.argv)
  .catch((e) => {
    if (e instanceof MotakiError) {
      // eslint-disable-next-line no-console
      console.error(`error: ${e.msg}`);
      process.exit(1);
    } else throw e;
  });
