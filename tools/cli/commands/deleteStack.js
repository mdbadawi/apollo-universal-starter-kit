import fs from 'fs';
import chalk from 'chalk';
import deleteStack from '../helpers/deleteStack';

import { STACK_LIST, BASE_PATH } from '../config';

const handleDeleteStackList = (stackList, logger) => {
  const formatStackList = stackList.map(stack => stack.toLowerCase());
  checkStackList(formatStackList, logger);
};

const checkStackList = (stackList, logger) => {
  const existsStackList = fs
    .readdirSync(`${BASE_PATH}/packages`)
    .filter(stack => stack !== 'common' && stack !== 'mobile')
    .map(stack => (stack === 'client' ? 'react' : STACK_LIST[stack]));

  const notExistsStackList = stackList
    .reduce((prev, curr) => {
      return existsStackList.includes(curr) ? [...prev] : [...prev, curr];
    }, [])
    .map(stack => {
      logger.error(chalk.red(`The stack of technology ${stack} not exists.`));
      return stack;
    });
  // console.log('notExistsStackList --->', notExistsStackList);

  if (notExistsStackList.length) {
    logger.error(chalk.yellow(`Please enter correct stack of technology`));
    return;
  }

  deleteStackList(stackList);
};

const deleteStackList = stackList => {
  let unusedStack = [];

  for (let stack in STACK_LIST) {
    const stackName = STACK_LIST[stack].includes('react') ? 'react' : STACK_LIST[stack];
    if (stackList.includes(stackName)) {
      unusedStack = [
        ...unusedStack,
        ...(stack === 'client' ? ['client', 'client-react', 'client-react-native', 'mobile'] : [stack])
      ];
    }
  }

  deleteStack(unusedStack);
};

module.exports = handleDeleteStackList;
