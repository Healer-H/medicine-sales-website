const Handlebars = require('handlebars')

const helpers = {
  formatDate() {
    Handlebars.registerHelper('formatDate', date => {
      return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    })
  },
  formatCurrency() {
    Handlebars.registerHelper('formatCurrency', amount => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount)
    })
  },

  ifEquals() {
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this)
    })
  },

  ifNotEquals() {
    Handlebars.registerHelper('ifNotEquals', function (arg1, arg2, options) {
      return arg1 !== arg2 ? options.fn(this) : options.inverse(this)
    })
  },
}

module.exports = helpers
