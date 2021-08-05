/* global fetch */

import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HelloModal from './modals/HelloModal'
import WorldModal from './modals/WorldModal'
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

// const Hello = () => <Text>'Hello'</Text>

const screens = {
  screens: [
    {
      title: 'A',
      screen: HelloModal
    },
    {
      title: 'B',
      screen: WorldModal
    }
  ]
}

const Home = ({ navigation }) =>
  <>
    <TouchableOpacity onPress={() => navigation.push('Notifications')} style={styles.container}>
      <Text>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('BaseModal', { screens })} style={styles.container}>
      <Text>GenericModal</Text>
    </TouchableOpacity>
    <DispatchButton />
  </>

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

const fetchFonts = () => {
  return Font.loadAsync({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf')
  })
}

export default function App () {
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn} // eslint-disable-line react/jsx-handler-names
      />
    )
  }
  return (
    <MyStack />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 1
  }
})
