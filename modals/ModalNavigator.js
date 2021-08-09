import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import Modal from './Modal'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='ModalScreen'>
      <Stack.Screen name='FirstScreen' component={FirstScreen} />
      <Stack.Screen name='SecondScreen' component={SecondScreen} />
      <Stack.Screen name='ThirdScreen' component={ThirdScreen} />
    </Stack.Navigator>
  )
}

const FirstScreen = ({ navigation }) => {
  return (
    <Modal withTitle='First Screen'>
      <TouchableOpacity onPress={() => navigation.push('SecondScreen')} style={styles.container}>
        <Text>1</Text>
      </TouchableOpacity>
    </Modal>
  )
}

const SecondScreen = ({ navigation }) => {
  return (
    <Modal withTitle='Second Screen' withBack>
      <TouchableOpacity onPress={() => navigation.push('ThirdScreen')} style={styles.container}>
        <Text>2</Text>
      </TouchableOpacity>
    </Modal>
  )
}

const ThirdScreen = ({ navigation }) => {
  return (
    <Modal withTitle='Third Screen'>
      <View style={styles.container}>
        <Text>3</Text>
      </View>
    </Modal>
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
