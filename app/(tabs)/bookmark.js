import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const bookmark = () => {
    return (
      <View style={{
        alignItems:'center',
        justifyContent:'center',
        height: 500,
      }}>
        <Text style={{
          fontWeight:"bold",
          fontSize:30
        }}>Bookmark Screen</Text>
      </View>
    )
}

export default bookmark

const styles = StyleSheet.create({})