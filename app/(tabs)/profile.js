import { Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{
      alignItems:'center',
      justifyContent:'center',
      height: 500,
    }}>
      <Text style={{
        fontWeight:"bold",
        fontSize:30
      }}>Profile Screen</Text>
    </View>
  )
}
