const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const formatStrings = require('../assets/js/format-strings')

function loadStrings(filePath) {
  const stringsFile = path.resolve(__dirname, '..', 'locales', 'en', filePath)
  const strings = yaml.safeLoad(fs.readFileSync(stringsFile, 'utf8'))
  return formatStrings(strings)
}

const messages = formatStrings({
  en: {
    pages: {
      redalert: loadStrings('pages/redalert.yml'),
      index: loadStrings('pages/index.yml'),
      call: {
        california: loadStrings('pages/call/california.yml')
      },
      map: loadStrings('pages/map.yml'),
      scoreboard: {
        index: loadStrings('pages/scoreboard/index.yml'),
        all: loadStrings('pages/scoreboard/all.yml'),
        id: loadStrings('pages/scoreboard/id.yml'),
        social: loadStrings('pages/scoreboard/social.yml')
      }
    },
    components: {
      BattleStats: loadStrings('components/BattleStats.yml'),
      WantedPoster: loadStrings('components/WantedPoster.yml'),
      CreateEvent: loadStrings('components/CreateEvent.yml'),
      ScoreboardForm: loadStrings('components/ScoreboardForm.yml')
    },
    social: loadStrings('social.yml')
  }
})

const outputFile = path.resolve(__dirname, '..', 'assets', 'data', 'strings.json')
fs.writeFileSync(outputFile, JSON.stringify(messages, null, 2))
