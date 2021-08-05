import React, { useEffect, createContext } from 'react'
import { Animated } from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { useIsFocused } from '@react-navigation/native'

import CrossIcon from '../assets/CrossIcon.png'

import * as MStyles from './styles'
import utils from '../utils'

const Stack = createStackNavigator()

// -----------------------------

// creates a modalcontext that mounts all of the useful functions
// on to the modal
export const ModalNavigator = createContext()

// -----------------------------

const GenericModal = ({ navigation, route }) => {
  // gets the route params
  const { screens, defaultParams, modalType } = route.params

  // gets a default screen
  let defaultScreen = screens.screens.find((screen) => screen.default === true)

  // if the default screen was not found, set to the first screen
  if (defaultScreen == null) {
    defaultScreen = screens.screens[0]
  }

  // stores an array of all the previous modal routes
  const [backRouteArray, setBackRouteArray] = React.useState([defaultScreen.screen.name.replace('Modal', '')])

  // stores an array of previous modal titles
  const [pastTitles, setPastTitles] = React.useState([defaultScreen.title])

  const [headerTitle, setHeaderTitle] = React.useState(defaultScreen.title)
  const [prevHeaderTitle, setPrevHeaderTitle] = React.useState(defaultScreen.title)

  // this is a weird state thing, will need changes
  const [[headerCache, rightTransition], transitionTitle] = React.useState([defaultScreen.title, true])

  // --------------

  // state specific to the popup modal type
  const [popupHeight, setPopupHeight] = React.useState(0)

  // --------------

  // animation for the cross/arrow transformation (a la airbnb)
  const crossArrowTransition = React.useRef(new Animated.Value(0)).current
  const crossArrowContainerTransition = React.useRef(new Animated.Value(0)).current

  const transitionArrow = () => {
    Animated.timing(crossArrowTransition, {
      toValue: -8,
      duration: 150,
      useNativeDriver: true
    }).start()

    Animated.timing(crossArrowContainerTransition, {
      toValue: 4,
      duration: 150,
      useNativeDriver: true
    }).start()
  }

  const transitionCross = () => {
    Animated.timing(crossArrowTransition, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start()

    Animated.timing(crossArrowContainerTransition, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start()
  }

  // animation for the title at the top, the fader's a fake title
  // that shows up whenever a transition happens

  const titleOpacityTransition = React.useRef(new Animated.Value(1)).current
  const titleFaderOpacityTransition = React.useRef(new Animated.Value(0)).current

  const titleTransformTransition = React.useRef(new Animated.Value(0)).current
  const titleFaderTransformTransition = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
    // if the headertitle and prevheadertitle aren't equal, do the anim
    if (prevHeaderTitle !== headerTitle) {
      // animates their movement and opacity values
      Animated.timing(titleOpacityTransition, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }).start()

      Animated.timing(titleFaderOpacityTransition, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()

      Animated.timing(titleTransformTransition, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()

      Animated.timing(titleFaderTransformTransition, {
        toValue: rightTransition === true ? -32 : 32,
        duration: 250,
        useNativeDriver: true
      }).start(() => {
        // use this animation to run the setPrevHeaderTitle callback
        setPrevHeaderTitle(headerTitle)
      })
    }
  }, [headerTitle])

  // --------------

  // controls animation for the transitions
  const backTransition = () => { backRouteArray.length <= 1 ? transitionCross() : transitionArrow() }

  // when the backRouteArray gets changed, perform a transition
  useEffect(() => {
    backTransition()
    // console.log('back routes:')
    // console.log(backRouteArray)
  }, [backRouteArray])

  useEffect(() => {
    // console.log('past titles:')
    // console.log(pastTitles)
  }, [pastTitles])

  // uses the transitionTitle state in order to make the changes
  useEffect(() => {
    // inits the animation refs
    titleOpacityTransition.setValue(0)
    titleFaderOpacityTransition.setValue(1)

    titleTransformTransition.setValue(rightTransition === true ? 32 : -32)
    titleFaderTransformTransition.setValue(0)

    // sets the headerTitle
    setHeaderTitle(headerCache)
  }, [headerCache, rightTransition])

  // --------------

  // helper for getting the screen title from a screen
  const getScreenTitle = (screenName) => {
    const screen = screens.screens.find((screenInfo) => screenName === screenInfo.screen.name.replace('Modal', ''))

    if (screen != null) {
      return screen.title
    } else {
      return 'SCREEN NOT FOUND'
    }
  }

  // back navigation function that works w/ the strange
  // navigation system here needed for the anim effects
  const backNavigation = () => {
    if (backRouteArray.length <= 1) {
      navigation.goBack()
    } else {
      // navigates to the last backroute
      navigation.navigate(backRouteArray[backRouteArray.length - 2])

      // sets up a backroutearray without the last element
      const backRouteNew = [...backRouteArray]
      backRouteNew.pop()

      // blanks out the backroute so that the modal is
      // ready to be closed
      setBackRouteArray(backRouteNew)

      // sets the header title
      transitionTitle([pastTitles[pastTitles.length - 2], false])

      // removes the title from the past titles
      const pastTitlesNew = [...pastTitles]
      pastTitlesNew.pop()

      // sets the past titles
      setPastTitles(pastTitlesNew)
    }
  }

  // navigation for the modal so that this component can receive
  // new headings and other properties
  const modalNavigation = (routeName, params, options) => {
    // gets the new screentitle
    const screenTitle = getScreenTitle(routeName)

    // if the "back" option is true, we need to find the index of the
    // last screen with the routeName and chop off all the other
    // elements in the backroute and title arrays
    if (options?.back === true) {
      // sets up a backroutearray without the last element
      let backRouteNew = [...backRouteArray]
      let pastTitlesNew = [...pastTitles]

      // from the backroutearray, finds the last instance of the route in
      // the array to get an index
      const lastInstance = [...backRouteArray].reverse().indexOf(routeName)

      // if the index is -1, then we assume a standard pop operation
      // otherwise, we do some cool slicing stuff
      if (lastInstance === -1) {
        // removes the last elements from the backRoute and pastTitles
        backRouteNew.pop()
        pastTitlesNew.pop()
      } else {
        // gets sliced versions of the back routes and past titles
        backRouteNew = [...backRouteArray].slice(0, backRouteArray.length - lastInstance)
        pastTitlesNew = [...pastTitles].slice(0, pastTitles.length - lastInstance)
      }

      // blanks out the backroute so that the modal is
      // ready to be closed
      setBackRouteArray(backRouteNew)

      // sets the header title
      transitionTitle([screenTitle, false])

      // sets the past titles
      setPastTitles(pastTitlesNew)

      // navigates to the specified route
      navigation.navigate(routeName, params)
    } else {
      // sets the backroute value
      setBackRouteArray((oldArray) => [...oldArray, routeName])

      // sets the header title
      transitionTitle([screenTitle, true])

      // sets the past titles
      setPastTitles((oldTitles) => [...oldTitles, screenTitle])

      // navigates to the specified route
      navigation.navigate(routeName, params)
    }
  }

  // --------------

  // creates a function dispatcher that gets used in the ModalContext
  const dispatcher = {
    navigate: modalNavigation
  }

  // --------------

  return (
    <>
      <ModalNavigator.Provider
        value={dispatcher}
      >
        {(modalType == null || modalType === 'standard') && (
          <MStyles.$LoginContainer>
            <MStyles.$PullDownContainer>
              <MStyles.$PullDownIndicator />
            </MStyles.$PullDownContainer>
            <MStyles.$TopBar>
              <MStyles.$ExitButton onPress={() => {
                backNavigation()
              }}
              >
                <MStyles.$ExitImageContainer as={Animated.View} style={{ transform: [{ translateX: crossArrowContainerTransition }] }}>
                  <MStyles.$ExitImage as={Animated.Image} style={{ transform: [{ translateX: crossArrowTransition }] }} source={CrossIcon} />
                </MStyles.$ExitImageContainer>
              </MStyles.$ExitButton>
              <MStyles.$TopBarTextContainer>
                <MStyles.$TopBarTitle
                  as={Animated.Text} style={{
                    opacity: titleOpacityTransition,
                    transform: [{ translateX: titleTransformTransition }]
                  }}
                >
                  {headerTitle}
                </MStyles.$TopBarTitle>
                <MStyles.$TopBarTitleFader
                  as={Animated.Text} style={{
                    opacity: titleFaderOpacityTransition,
                    transform: [{ translateX: titleFaderTransformTransition }]
                  }}
                >
                  {prevHeaderTitle}
                </MStyles.$TopBarTitleFader>
              </MStyles.$TopBarTextContainer>
            </MStyles.$TopBar>

            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              {screens.screens.map((screenInfo, i) => {
                const screenContained = (props) => {
                  return (
                    <MStyles.$FullContainer>
                      {screenInfo.screen({ ...props })}
                    </MStyles.$FullContainer>
                  )
                }

                return (
                  <Stack.Screen
                    key={i}
                    name={screenInfo.screen.name.replace('Modal', '')}
                    options={{
                      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                      cardStyle: { backgroundColor: 'transparent' },
                      cardOverlayEnabled: true
                    }}
                    component={screenContained}
                    initialParams={{
                      modalNavigation: modalNavigation,
                      ...defaultParams
                    }}
                  />
                )
              })}
            </Stack.Navigator>
          </MStyles.$LoginContainer>
        )}
        {(modalType === 'popup') && (
          <MStyles.$SmallContainerOuter>
            <MStyles.$SmallContainer>
              <MStyles.$PullDownContainer>
                <MStyles.$PullDownIndicator />
              </MStyles.$PullDownContainer>
              <MStyles.$TopBar>
                <MStyles.$ExitButton onPress={() => {
                  backNavigation()
                }}
                >
                  <MStyles.$ExitImageContainer as={Animated.View} style={{ transform: [{ translateX: crossArrowContainerTransition }] }}>
                    <MStyles.$ExitImage as={Animated.Image} style={{ transform: [{ translateX: crossArrowTransition }] }} source={CrossIcon} />
                  </MStyles.$ExitImageContainer>
                </MStyles.$ExitButton>
                <MStyles.$TopBarTextContainer>
                  <MStyles.$TopBarTitle
                    as={Animated.Text} style={{
                      opacity: titleOpacityTransition,
                      transform: [{ translateX: titleTransformTransition }]
                    }}
                  >
                    {headerTitle}
                  </MStyles.$TopBarTitle>
                  <MStyles.$TopBarTitleFader
                    as={Animated.Text} style={{
                      opacity: titleFaderOpacityTransition,
                      transform: [{ translateX: titleFaderTransformTransition }]
                    }}
                  >
                    {prevHeaderTitle}
                  </MStyles.$TopBarTitleFader>
                </MStyles.$TopBarTextContainer>
              </MStyles.$TopBar>

              <MStyles.$StackContainer
                style={{
                  height: popupHeight
                }}
              >
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  {screens.screens.map((screenInfo, i) => {
                    // gets the name of the screen
                    const screenName = screenInfo.screen.name.replace('Modal', '')

                    // creates a new component that contains onLayout callbacks for
                    // obtaining the current screen height
                    const screenContained = ({ navigation, route }) => {
                      // sets the focus of the screen
                      const isFocused = useIsFocused()

                      return (
                        <MStyles.$FullContainer key={i}>
                          <MStyles.$ScreenContainer
                            onLayout={(event) => {
                              // gets the height of the current screen
                              const currHeight = event.nativeEvent.layout.height

                              // if the screenheight hasn't been set, set it
                              if (Math.abs(popupHeight - currHeight) > 1 && isFocused) {
                                // sets the popup height
                                utils.animations.quickAnimConfigure()
                                setPopupHeight(currHeight)
                              }
                            }}
                          >
                            {screenInfo.screen({ navigation, route })}
                          </MStyles.$ScreenContainer>
                        </MStyles.$FullContainer>
                      )
                    }

                    return (
                      <Stack.Screen
                        key={i}
                        name={screenName}
                        options={{
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                          cardStyle: { backgroundColor: 'transparent' },
                          cardOverlayEnabled: true
                        }}
                        component={screenContained}
                        initialParams={{
                          modalNavigation: modalNavigation,
                          ...defaultParams
                        }}
                      />
                    )
                  })}
                </Stack.Navigator>
              </MStyles.$StackContainer>
            </MStyles.$SmallContainer>
          </MStyles.$SmallContainerOuter>
        )}
      </ModalNavigator.Provider>
    </>
  )
}

export default GenericModal
