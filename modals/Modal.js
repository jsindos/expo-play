import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import * as s from '../styles'
import CrossIcon from '../assets/CrossIcon.png'
import LeftCaret from '../assets/LeftCaret'

export default ({ withTitle: title, children, withBack }) => {
  const navigation = useNavigation()

  return (
    <$LoginContainer>
      <$PullDownContainer>
        <$PullDownIndicator />
      </$PullDownContainer>
      <$TopBar>
        <$ExitButton onPress={() => withBack ? navigation.goBack() : navigation.dangerouslyGetParent()?.goBack()}>
          {
            withBack ? <LeftCaret /> : <$ExitImage source={CrossIcon} />
          }
        </$ExitButton>
        <$TopBarTitle>
          {title}
        </$TopBarTitle>
      </$TopBar>
      {children}
    </$LoginContainer>
  )
}

const $LoginContainer = styled.View`
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

const $TopBar = styled.View`
  paddingHorizontal: 25px;
  paddingTop: 22px;
  paddingBottom: 16px;
  flexDirection: row;
  borderBottomColor: #DDDDDD;
  borderBottomWidth: 1px;
  textAlign: center;
  alignSelf: stretch;
`

const $TopBarTitle = styled.Text`
  flex: 1;
  textAlign: center;
  fontFamily: "${s.fonts.regularSemiBold}";
  fontSize: 18px;
`

const $ExitImage = styled.Image`
  height: 16px;
  width: 16px;
`

const $ExitButton = styled.TouchableOpacity`
  position: absolute;
  top: 26px;
  left: 25px;
  zIndex: 4;
  overflow: hidden;
`

const $PullDownContainer = styled.View`
  marginTop: 10px;
  height: 4px;
  flexDirection: row;
  justifyContent: center;
`

const $PullDownIndicator = styled.View`
  width: 40px;
  height: 4px;
  borderRadius: 4px;
  backgroundColor: #AAAAAA;
`
