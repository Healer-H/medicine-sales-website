const Message = require('../constants/messages')

function getStartAndEndDates(type, date) {
  let start, end, timeFormat
  let year, quarter

  switch (type) {
    case 'daily':
      start = new Date(date)
      end = new Date(date)
      end.setDate(end.getDate() + 1)
      timeFormat = '%Y-%m-%d %H:00:00'
      break

    case 'weekly':
      start = new Date(date)
      end = new Date(start)
      end.setDate(end.getDate() + 7)
      timeFormat = '%Y-%m-%d'
      break

    case 'monthly':
      start = new Date(date)
      start.setDate(1)
      end = new Date(start)
      end.setMonth(end.getMonth() + 1)
      timeFormat = '%Y-%u'
      break

    case 'yearly':
      start = new Date(date)
      start.setMonth(0, 1)
      end = new Date(start)
      end.setFullYear(end.getFullYear() + 1)
      timeFormat = '%Y-%m'
      break

    case 'quarterly':
      ;[year, quarter] = date.split('-Q')
      start = new Date(year, (quarter - 1) * 3, 1)
      end = new Date(start)
      end.setMonth(end.getMonth() + 3)
      timeFormat = '%Y-%m'
      break

    default:
      throw new Error(Message.REPORTS_MESSAGES.REPORTS_REVENUE.INVALID_TYPE)
  }

  return { start, end, timeFormat }
}

function getPreviousStartAndEndDates(type, start, end) {
  let previousStart, previousEnd

  switch (type) {
    case 'daily':
      previousStart = new Date(start)
      previousStart.setDate(previousStart.getDate() - 1)
      previousEnd = new Date(end)
      previousEnd.setDate(previousEnd.getDate() - 1)
      break

    case 'weekly':
      previousStart = new Date(start)
      previousStart.setDate(previousStart.getDate() - 7)
      previousEnd = new Date(end)
      previousEnd.setDate(previousEnd.getDate() - 7)
      break

    case 'monthly':
      previousStart = new Date(start)
      previousStart.setMonth(previousStart.getMonth() - 1)
      previousEnd = new Date(end)
      previousEnd.setMonth(previousEnd.getMonth() - 1)
      break

    case 'yearly':
      previousStart = new Date(start)
      previousStart.setFullYear(previousStart.getFullYear() - 1)
      previousEnd = new Date(end)
      previousEnd.setFullYear(previousEnd.getFullYear() - 1)
      break

    case 'quarterly':
      previousStart = new Date(start)
      previousStart.setMonth(previousStart.getMonth() - 3)
      previousEnd = new Date(end)
      previousEnd.setMonth(previousEnd.getMonth() - 3)
      break

    default:
      throw new Error(Message.REPORTS_MESSAGES.REPORTS_REVENUE.INVALID_TYPE)
  }

  return { previousStart, previousEnd }
}

module.exports = { getStartAndEndDates, getPreviousStartAndEndDates }
