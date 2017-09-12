'use strict'

new Livity({
  routes: {
    '/': {
      template: '/home.bns',
      body () {
        const themeSwitcher = l('#themeSwitch')        

        themeSwitcher.on('click', function () {
          debugger 
        })
      }
    },
    '/poems': {
      template: '/poems.bns'
    }
  }
})
