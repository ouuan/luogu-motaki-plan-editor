import { Command, Option } from 'commander';
import add from './add';
import { colorDistanceFormulas, imageQuantizations } from './constants';
import MotakiError from './error';
import info from './info';
import move from './move';
import rename from './rename';
import rm from './rm';
import validate from './validate';

const cmd = new Command();

cmd.version('0.0.1');
cmd.showSuggestionAfterError();

cmd.command('add <name> <imageFilePath> <leftX> <topY>')
  .description('add a new task')
  .option('--width <width>', 'resize image, set width')
  .option('--height <height>', 'resize image, set height')
  .option('--override', 'allow overriding existing task')
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
  .action(info);

cmd.command('rm <name>')
  .description('remove a task')
  .action(rm);

cmd.command('move <name> <newx> <newy>')
  .description('move the position of a task')
  .action(move);

cmd.command('rename <oldName> <newName>')
  .description('rename a task')
  .action(rename);

cmd.command('validate')
  .description('validate the current plan')
  .action(validate);

cmd.parseAsync(process.argv)
  .catch((e) => {
    if (e instanceof MotakiError) {
      // eslint-disable-next-line no-console
      console.error(`error: ${e.msg}`);
    } else throw e;
  });
