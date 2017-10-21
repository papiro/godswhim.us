'use strict'

const poemPages = (page) => `/poems/pages/${page}`

new Livity({
  routes: {
    '/': {
      template: '/home.bns',
      body () {
        const hour = (new Date()).getHours()
        if (hour > 20 || hour < 6) {
          l('body').addClass('moon').removeClass('sun')
        }

        const lthemeSwitch = l('#themeSwitch')
        lthemeSwitch.on('click', function () {
          const { currentTheme, nextTheme } = getThemeInfo(this)
          this.dataset.currentTheme = nextTheme
          l('body').removeClass(currentTheme).addClass(nextTheme)
        })
        // On load, animate title.
//        setTimeout(() => {
//          const { currentTheme, nextTheme } = getThemeInfo(lthemeSwitch[0])
//          l('body').addClass(currentTheme).removeClass(nextTheme)
//        }, 1000)

        function getThemeInfo (themeSwitcher) {
          const { themes: availableThemesStr, currentTheme } = lthemeSwitch[0].dataset
          const availableThemes = availableThemesStr.split(/\s+/)
          let nextThemeIndex = availableThemes.indexOf(currentTheme) + 1
          const nextTheme = availableThemes[nextThemeIndex === availableThemes.length ? 0 : nextThemeIndex]

          return {
            availableThemes,
            currentTheme,
            nextTheme
          }
        }
      }
    },
    '/poems': {
      template: '/poems.bns'
    },
    '/poems/a_heart_of_darkness': {
      template: poemPages('a_heart_of_darkness.bns')
    },
    '/poems/cozy_little_lamb': {
      template: poemPages('the_eyelids_of_the_house_spider.bns')
    },
    '/poems/dream_swell': {
      template: poemPages('dream_swell.bns')
    },
    '/poems/our_way_back_home': {
      template: poemPages('our_way_back_home.bns')
    },
    '/poems/to_love': {
      template: poemPages('to_love.bns')
    },
    '/sound_art': {
      template: 'sound-art.bns',
      body () {
        l('.volume-slider').on('input', function () {
          // Adjust all sliders.
          Array.from(document.getElementsByClassName('volume-slider')).forEach( slider => {
            slider.value = this.value
            document.getElementById(this.dataset['for']).volume = this.value
          })
        })
      }
    }
  }
})

