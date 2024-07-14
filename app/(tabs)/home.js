import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View style={{
      alignItems:'center',
      justifyContent:'center',
      height: 500,
    }}>
      <Text style={{
        fontWeight:"bold",
        fontSize:30
      }}>Home Screen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})