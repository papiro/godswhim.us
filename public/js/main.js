'use strict'

new Livity({
  routes: {
    '/': {
      template: '/home.bns',
      body () {
        const themeSwitcher = l('#themeSwitch')        

        themeSwitcher.on('click', function () {
          const { themes: themesStr, currentTheme } = this.dataset
          const themes = themesStr.split(/\s+/)
          let nextThemeIndex = themes.indexOf(currentTheme) + 1
          if (nextThemeIndex === themes.length) {
            nextThemeIndex = 0
          }
          const nextTheme = themes[nextThemeIndex]
          this.dataset.currentTheme = nextTheme
          l('body').removeClass(currentTheme).addClass(nextTheme)
        })
        // On load, animate title.
        setTimeout(() => {
          l('body').addClass('theme-1').removeClass('theme-2')
        }, 1000)
      }
    },
    '/poems': {
      template: '/poems.bns'
    }
  }
})
