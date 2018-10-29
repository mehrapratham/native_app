import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Text style={styles.title}>Welcome to React Native ⚛️</Text>
        </View>
        <Text style={styles.secondContainer}>
          To get started, edit src/App.js and save to reload.
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  firstContainer: {
    flex: 1,
    backgroundColor: '#a4a4e5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  secondContainer: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center'
  }
})