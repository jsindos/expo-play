import React from 'react'
import { Dimensions, Animated } from 'react-native'

import * as styles from '../styles'
import styled from 'styled-components/native'

import RightCaret from '../assets/RightCaret'

// ------------------------

export const ListRow = ({ onPress, rowIcon, label, isSkeleton }) => {
  // animation refs for the shimmer
  const skeletonOpacity = React.useRef(new Animated.Value(1)).current

  // sets up a looping animation
  const skeletonShine = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonOpacity, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(skeletonOpacity, { toValue: 0.6, duration: 750, useNativeDriver: true }),
        Animated.timing(skeletonOpacity, { toValue: 1, duration: 750, useNativeDriver: true })
      ])
    ).start()
  }

  // if the element is a skeleton, then the skeleton animations should
  // be initialised
  if (isSkeleton === true) {
    skeletonShine()
  }

  // ---------------------

  return (
    (isSkeleton)
      ? (
        <$ListSkeletonContainer>
          <$ListSkeletonIcon />
          <$ListSkeletonText />
        </$ListSkeletonContainer>
        )
      : (
        <$ListRowContainer onPress={onPress}>
          <$ListRowIcon source={rowIcon} />
          <$ListRowText>
            {label}
          </$ListRowText>
          <RightCaret style={{ height: 16 }} />
        </$ListRowContainer>
        )
  )
}

const $ListRowContainer = styled.TouchableOpacity`
  paddingVertical: 20px;
  paddingHorizontal: 25px;
  flexDirection: row;
  alignItems: center;
  borderBottomWidth: 1px;
  borderBottomColor: ${styles.colors.lightGrey};
`

const $ListRowIcon = styled.Image`
  height: 28px;
  width: 28px;
`

const $ListRowText = styled.Text`
  flex: 1;
  marginLeft: 15px;
  fontSize: ${styles.fontSizes.regular}px;
  fontFamily: "${styles.fonts.regular}";
`

// ------------------------

const $ListSkeletonContainer = styled.View`
  paddingVertical: 20px;
  paddingHorizontal: 25px;
  flexDirection: row;
  alignItems: center;
  borderBottomWidth: 1px;
  borderBottomColor: ${styles.colors.lightGrey};
`

const $ListSkeletonIcon = styled.View`
  backgroundColor: #E4E4E4;
  height: 28px;
  width: 28px;
  borderRadius: 5px;
`

const $ListSkeletonText = styled.View`
  backgroundColor: #E4E4E4;
  height: 12px;
  width: 128px;
  borderRadius: 5px;
  marginLeft: 15px;
`

// ------------------------

export const $LoginContainer = styled.View`
  flex: 1;
  justifyContent: flex-start;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height - 24}px;
  position: absolute;
  top: 24px;
  backgroundColor: #FFFFFF;
  borderTopLeftRadius: 10px;
  borderTopRightRadius: 10px;
  paddingBottom: 25px;
`

export const $SmallContainerOuter = styled.View`
  flex: 1;
  justifyContent: center;
  paddingHorizontal: 20px;
`

export const $SmallContainer = styled.View`
  justifyContent: center;
  backgroundColor: #FFFFFF;
  borderRadius: 10px;
  paddingBottom: 25px;
`

export const $StackContainer = styled.View`
  overflow: hidden;
`

export const $ScreenContainer = styled.View`
  width: ${Dimensions.get('window').width - 40}px;
  position: absolute;
  overflow: hidden;
`

export const $FullContainer = styled.View`
  flex: 1;
  backgroundColor: #FFFFFF;
`

// ------------------------

export const $PullDownContainer = styled.View`
  marginTop: 10px;
  height: 4px;
  flexDirection: row;
  justifyContent: center;
`

export const $PullDownIndicator = styled.View`
  width: 40px;
  height: 4px;
  borderRadius: 4px;
  backgroundColor: #AAAAAA;
`

// ------------------------

export const $TopBar = styled.View`
  paddingHorizontal: 25px;
  paddingTop: 22px;
  paddingBottom: 16px;
  flexDirection: row;
  borderBottomColor: #DDDDDD;
  borderBottomWidth: 1px;
  textAlign: center;
  alignSelf: stretch;
`

export const $ExitButton = styled.TouchableOpacity`
  position: absolute;
  top: 26px;
  left: 25px;
  zIndex: 4;
  overflow: hidden;
`

export const $ExitImageContainer = styled.View`
  overflow: hidden;
  height: 16px;
  width: 16px;
`

export const $ExitImage = styled.Image`
  height: 16px;
  width: 16px;
`

export const $TopBarTextContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: center;
`

export const $TopBarTitle = styled.Text`
  flex: 1;
  textAlign: center;
  fontFamily: "${styles.fonts.regularSemiBold}";
  fontSize: 18px;
`

export const $TopBarTitleFader = styled.Text`
  flex: 1;
  textAlign: center;
  fontFamily: "${styles.fonts.regularSemiBold}";
  fontSize: 18px;
  position: absolute;
  opacity: 0;
`

// ------------------------

export const $BodyContainer = styled.View`
  paddingHorizontal: 25px;
  backgroundColor: #FFFFFF;
`

export const $TextInputContainer = styled.View`
  paddingVertical: 4px;
  paddingHorizontal: 12px;
  borderRadius: 5px;
  borderColor: #DDDDDD;
  borderWidth: 1px;
  flex-direction: row;
  marginTop: 25px;
`

export const $MultiInputContainer = styled.View`
  borderRadius: 5px;
  borderColor: #DDDDDD;
  borderWidth: 1px;
  marginTop: 25px;
`

export const $MultiInputRow = styled.View`
  paddingVertical: 4px;
  paddingHorizontal: 12px;
`

export const $MultiInputLine = styled.View`
  borderColor: #DDDDDD;
  borderTopWidth: 1px;
`

export const $TextInput = styled.TextInput`
  height: 40px;
  fontFamily: "${styles.fonts.regularSemiBold}";
  flex: 1;
`

export const $TextInputPrefill = styled.Text`
  fontFamily: "${styles.fonts.regular}";
  paddingRight: 12px;
  paddingTop: 10px;
  marginRight: 12px;
  borderRightWidth: 1px;
  borderRightColor: #DDDDDD;
`

// ------------------------

export const $TextInputDisabled = styled.View`
  paddingVertical: 4px;
  paddingHorizontal: 12px;
  borderRadius: 5px;
  borderColor: #DDDDDD;
  backgroundColor: #F7F7F7;
  borderWidth: 1px;
  flex-direction: row;
  marginTop: 25px;
`

export const $TextInputDisabledText = styled.Text`
  fontFamily: "${styles.fonts.regularSemiBold}";
  color: #CCCCCC;
  paddingVertical: 10px;
`

// ------------------------

export const $OrContainer = styled.View`
  flexDirection: row;
  marginVertical: 20px;
`

export const $OrText = styled.Text`
  fontSize: 12px;
  fontFamily: "${styles.fonts.regularSemiBold}";
  color: ${styles.colors.secondary};
  textAlign: center;
  flex: 1;
`

export const $OrLineLeft = styled.View`
  top: 8px;
  position: absolute;
  width: ${(Dimensions.get('window').width / 2) - 42}px;
  left: 0px;
  height: 1px;
  backgroundColor: ${styles.colors.secondary};
`

export const $OrLineRight = styled.View`
  top: 8px;
  position: absolute;
  width: ${(Dimensions.get('window').width / 2) - 42}px;
  right: 0px;
  height: 1px;
  backgroundColor: ${styles.colors.secondary};
`

// ------------------------

export const $AltLoginButton = styled.TouchableOpacity`
  borderRadius: 5px;
  borderColor: ${styles.colors.secondary};
  borderWidth: 1px;
  paddingVertical: 15px;
  paddingHorizontal: 30px;
  marginBottom: 14px;
`

export const $AltLoginButtonText = styled.Text`
  color: ${styles.colors.black};
  fontSize: 15px;
  font-family: "${styles.fonts.regular}";
  textAlign: center;
`

export const $AltLoginImage = styled.Image`
  position: absolute;
  top: 18px;
  left: 18px;
  height: 16px;
  width: 16px;
`

// ------------------------

export const $ErrorView = styled.View`
  font-family: "${styles.fonts.regular}";
  marginTop: 8px;
  flexDirection: row;
  overflow: hidden;
`

export const $ErrorImage = styled.Image`
  height: 16px;
  width: 16px;
  marginTop: 2px;
  marginRight: 6px;
`

export const $ErrorText = styled.Text`
  color: #FF5555;
`
