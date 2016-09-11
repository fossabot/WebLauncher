const chalk = require('chalk')
const list = require('./list')
const error = require('./error')
const execute = require('./execute')

module.exports = (api, args, collection) => {

  const command = args.splice(0, 1)[0]

  switch (command) {
    case 'list':
    case 'ls':
      list(api, collection)
      break

    case 'add':
      addSites(api, args, collection)
      break

    case 'clear':
      clearSites(api, args, collection)
      break

    case undefined:
      execute(api, collection, collection)
      break
  }
}

function addSites (api, args, collection) {
  if (args.length) {
    api.add(collection, args)
  } else {
    error(`${chalk.underline.bgRed('add')} must be followed by URLS to be added.`)
  }
}

function clearSites (api, args, collection) {
  const validatedArgs = args
    .map( arg => parseInt(arg))
    .filter( arg => !isNaN(arg))

  if (args.length && validatedArgs.length === args.length) {
    api.remove(collection, validatedArgs)
  } else if (!args.length) {
    api.remove(collection)
  } else {
    error(`${chalk.underline.bgRed('clear')} must have 0 or more integer arguments.`)
  }
}