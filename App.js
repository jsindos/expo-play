import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function getHeaderTitle (route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Explore'

  switch (routeName) {
    case 'Explore':
      return 'Explore sd'
    case 'Saved':
      return 'Saved'
    case 'Profile':
      return 'Profile'
    case 'Inbox':
      return 'Inbox'
    case 'Bag':
      return 'Bag'
    case 'Login':
      return 'Login'
  }
}

function MyStack () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home' component={
            ({ navigation }) =>
              <TouchableOpacity onPress={() => navigation.push('Notifications')} style={styles.container}>
                <$PayContainer />
                <Text>Home</Text>
              </TouchableOpacity>
          }
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerShown: false
          })}
        />
        <Stack.Screen
          name='Notifications' component={
            ({ navigation }) =>
              <TouchableOpacity onPress={() => navigation.push('Home')}>
                <Text>Notifications</Text>
              </TouchableOpacity>
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
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
