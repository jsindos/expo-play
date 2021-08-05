/* global fetch */

import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Provider, useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import GenericModal from './modals/GenericModal'
import options from './modals/options'
import store from './redux'

const MainStack = createStackNavigator()
const SubStack = createStackNavigator()

function MyStack () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator
          mode='modal'
          headerMode='none'
          screenOptions={{
            headerShown: false
          }}
        >
          <MainStack.Screen
            name='Main'
            component={SubNavigator}
          />
          <MainStack.Screen
            name='BaseModal'
            component={GenericModal}
            options={options}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const SubNavigator = () =>
  <SubStack.Navigator>
    <SubStack.Screen
      name='Home' component={Home}
      options={({ route }) => ({
        headerShown: false
      })}
    />
    <SubStack.Screen
      name='Notifications' component={Notifications}
    />
  </SubStack.Navigator>

const Notifications = ({ navigation }) =>
  <TouchableOpacity onPress={() => navigation.push('Home')}>
    <Text>Notifications</Text>
  </TouchableOpacity>

const Home = ({ navigation }) =>
  <TouchableOpacity onPress={() => navigation.push('Notifications')} style={styles.container}>
    <$PayContainer />
    <Text>Home</Text>
    <DispatchButton />
  </TouchableOpacity>

const DispatchButton = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  useEffect(() => {
    async function fetchData () {
      const response = await fetch('http://172.20.10.2:8090')
      const { name } = await response.json()
      dispatch({ type: 'HELLO', payload: name })
    }
    fetchData()
  })

  return (
    <>
      <Button onPress={() => dispatch({ type: 'HELLO', payload: 'Clicked' })} title='a' />
      <Text>{state}</Text>
    </>
  )
}

export default function App () {
  return (
    <MyStack />
  )
}

const $PayContainer = styled.TouchableOpacity`
  flexDirection: row;
  alignItems: center;
  marginBottom: 20px;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 1
  }
})
