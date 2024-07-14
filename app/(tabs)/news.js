import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const news = () => {
  return (
    <View style={{
      alignItems:'center',
      justifyContent:'center',
      height: 500,
    }}>
      <Text style={{
        fontWeight:"bold",
        fontSize:30
      }}>News Screen</Text>
    </View>
  )
}

export default news

const styles = StyleSheet.create({})