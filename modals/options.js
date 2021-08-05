import { Dimensions } from 'react-native'
import { TransitionSpecs } from '@react-navigation/stack'

export default {
  gestureEnabled: true,
  gestureDirection: 'vertical',
  gestureResponseDistance: {
    vertical: Dimensions.get('window').height
  },
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec
  },
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1]
      }),
      transform: [{
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [150, 0],
          extrapolate: 'clamp'
        })
      }]
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp'
      })
    }
  })
}
