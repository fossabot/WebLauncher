const chalk = require('chalk')
const error = require('./error')

module.exports = (api, list) => {

  try {
    if (list) {
      printCollection(api.get(list))
      console.log('\n')
    } else {
      const lists = api.get()
      if (lists.length) {
        lists.forEach(printCollection)
        console.log('\n')
      } else {
        console.log(chalk.green('\nNo groups found.\n'))
      }
    }
  } catch (e) {
    error(e)
  }
}

function printCollection (list) {
  console.log(chalk.green(`\n${list.name}:\n`))

  if (list.sites.length) {
    list.sites.forEach( (item, index) => {
      console.log(`${chalk.yellow(`${index}:`)}\t${chalk.cyan(item)}`)
    })
  } else {
    console.log(chalk.cyan('No sites stored.'))
  }
}
