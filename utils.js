import { Animated, LayoutAnimation, Platform, UIManager } from 'react-native'

// ------------------------

// gives a formatted version of an item's price.
const formatPrice = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return formatter.format(value / 100)
}

// gets the price range for products in a bag
const getPriceRange = (item) => {
  // gets the item variants
  const variants = item.variants

  if (item.variants != null) {
    // gets the minimum and maximum values of the items through a reduce
    const min = variants.reduce((currMin, currValue) => Math.min(currMin, currValue.price || 0), Infinity)
    const max = variants.reduce((currMax, currValue) => Math.max(currMax, currValue.price || 0), 0)

    // if the min and max are equal, format the price
    if (min === max) {
      return formatPrice(max)
    }

    return `${formatPrice(min)} - ${formatPrice(max)}`
  } else {
    return '$0.00 - $0.00'
  }
}

// ------------------------

// function for obtaining the total cost of the bag
const getTotalBagCosts = (items) => {
  let total = 0
  for (const product of items) {
    const itemsPrice = product.quantity * product.variant.price
    total = total + itemsPrice
  }
  return formatPrice(total)
}

const getDeliveryTime = (minDateString, maxDateString) => {
  // gets a min and max date from strings
  const minDate = new Date(minDateString)
  const maxDate = new Date(maxDateString)

  // gets the difference between the two dates in days
  const diffDate = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24))

  // if the difference is less than a week, then return the day. else, return a week range
  if (diffDate < 7) {
    return diffDate + ' days'
  } else {
    return `${Math.floor(diffDate / 7)} - ${Math.ceil(diffDate / 7)} weeks`
  }
}

const formatDate = (deliveryString) => {
  // gets the current date
  const currDate = new Date(deliveryString)

  // gets the year, month and day
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currDate)
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(currDate)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(currDate)

  return `${day}/${month}/${year}`
}

// ------------------------

// date formatting for deliveries
const prettifyDate = (dateInput) => {
  // creates a date from the string
  const currDate = new Date(dateInput)

  // gets a new datestring from the currDate, splits based on spaces
  const dateString = currDate.toDateString().split(' ')

  // format appropriately for the order display
  return dateString[1] + ' ' + dateString[2] + ', ' + dateString[3]
}

// inits a string array of days
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// date formatting for min/max dates of deliveries
const prettifyMinMax = (minMaxInput) => {
  // creates a date from the string
  const currDate = new Date(minMaxInput)

  // gets a new datestring from the currDate, splits based on spaces
  const dateString = currDate.toDateString().split(' ')

  // format appropriately for the order display
  return days[currDate.getDay()] + ', ' + dateString[1] + ' ' + dateString[2]
}

// ------------------------

// sets up layout animations for android
const setupLayoutAnimations = () => {
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

// sets up a layout animation for the next animation
const quickAnimConfigure = () => {
  LayoutAnimation.configureNext({
    duration: 200,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut
    }
  })
}

// defines time interval suffixes
const intervalSuffix = [
  ' years',
  ' months',
  ' weeks',
  ' days',
  ' hours',
  ' minutes',
  ' seconds'
]

const timeSince = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000)

  // defines time intervals
  const intervals = [
    seconds / 31536000,
    seconds / 2592000,
    seconds / 604800,
    seconds / 86400,
    seconds / 3600,
    seconds / 60,
    seconds
  ]

  // loops over the intervals
  for (let i = 0; i < intervals.length; i++) {
    // check the interval
    if (intervals[i] > 1) {
      return Math.floor(intervals[i]) + intervalSuffix[i]
    }
  }
}

const timeDifference = (startDate, endDate) => {
  const seconds = Math.floor((new Date(endDate) - new Date(startDate)) / 1000)

  // defines time intervals
  const intervals = [
    seconds / 31536000,
    seconds / 2592000,
    seconds / 604800,
    seconds / 86400,
    seconds / 3600,
    seconds / 60,
    seconds
  ]

  // loops over the intervals
  for (let i = 0; i < intervals.length; i++) {
    // check the interval
    if (intervals[i] > 1) {
      return Math.floor(intervals[i]) + intervalSuffix[i]
    }
  }
}

// ------------------------

const skeletonShine = (targetRef) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(targetRef, { toValue: 1, duration: 750, useNativeDriver: true }),
      Animated.timing(targetRef, { toValue: 0.6, duration: 750, useNativeDriver: true }),
      Animated.timing(targetRef, { toValue: 1, duration: 750, useNativeDriver: true })
    ])
  ).start()
}

// ------------------------

export default {
  bag: {
    getTotalBagCosts,
    getDeliveryTime,
    formatDate
  },
  products: {
    getPriceRange,
    formatPrice
  },
  orders: {
    prettifyDate,
    prettifyMinMax
  },
  animations: {
    quickAnimConfigure,
    setupLayoutAnimations,
    skeletonShine
  },
  time: {
    timeSince,
    timeDifference
  }
}
