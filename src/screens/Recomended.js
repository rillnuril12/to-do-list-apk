import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const recomended = () => {
  return (
    <View>
       <TouchableOpacity
             
                onPress={async () => {
                   await AsyncStorage.removeItem('nip')
                   await AsyncStorage.removeItem('nama')
                   await AsyncStorage.removeItem('password')
                }}>
               <Text style ={{color:"#000"}}>log out</Text>

            </TouchableOpacity>
    </View>
  )
}

export default recomended