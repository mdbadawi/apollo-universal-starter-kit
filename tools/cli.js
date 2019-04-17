require('@babel/register')({ cwd: __dirname + '/..' });
require('@babel/polyfill');
const prog = require('caporal');
const addModuleCommand = require('./cli/commands/addModule');
const deleteModuleCommand = require('./cli/commands/deleteModule');
const chooseTemplate = require('./cli/commands/chooseTemplate');
const deleteStackCommand = require('./cli/commands/deleteStack');

const CommandInvoker = require('./cli/CommandInvoker');

const commandInvoker = new CommandInvoker(addModuleCommand, deleteModuleCommand, chooseTemplate, deleteStackCommand);

prog
  .version('1.0.0')
  .description('Full info: https://github.com/sysgears/apollo-universal-starter-kit/wiki/Apollo-Starter-Kit-CLI')
  // Add module
  .command('addmodule', 'Create a new Module.')
  .argument('<moduleName>', 'Module name')
  .argument(
    '[location]',
    'Where should new module be created. [both, server, client]',
    ['both', 'server', 'client'],
    'both'
  )
  .option('-o, --old', 'Old Structure')
  .action((args, options, logger) => commandInvoker.runAddModule(args, options, logger))
  // Delete module
  .command('deletemodule', 'Delete a Module')
  .argument('<moduleName>', 'Module name')
  .argument('[location]', 'Where should we delete module. [both, server, client]', ['both', 'server', 'client'], 'both')
  .option('-o, --old', 'Old Structure')
  .action((args, options, logger) => commandInvoker.runDeleteModule(args, options, logger))
  // Choose stack
  .command('choosestack', 'Choose the stack of technologies for the app')
  .action(() => commandInvoker.runChooseStack())
  .command(
    'deletestack',
    `Delete the stack of technologies for the app.
List of technologies [react, angular, vue, scala, node]`
  )
  .argument('<stackList...>', 'List of technologies [react, angular, vue, scala, node]')

  /*eslint-disable */
  .action(({ stackList }, {}, logger) => {
    /*eslint-enable */
    commandInvoker.runDeleteStack(stackList, logger);
  });

prog.parse(process.argv);
