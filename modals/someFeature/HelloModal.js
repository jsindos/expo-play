import React, { useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { ModalNavigator } from '../GenericModal'

const HelloModal = () => {
  const modalNavigator = useContext(ModalNavigator)
  return (
    <TouchableOpacity onPress={() => modalNavigator.navigate('World')} style={styles.container}>
      <Text>Hello</Text>
    </TouchableOpacity>
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

export default HelloModal
