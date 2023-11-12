import { View, Text ,StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import Logo from '../assets/list.png'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const register = () => {
  const [nip, setNip] = useState("")
  const [nama, setNama] = useState("")
  const [password, setPassword] = useState("")

  const [data, setData] = React.useState({
      nip: '',
      nama: '',
      password: ''
  })

  useEffect(() => {
      getData()
      return () => { };
  }, []);

  const getData = async () => {
      try {
          let nip = await AsyncStorage.getItem('nip')
          let password = await AsyncStorage.getItem('password')
          let name = await AsyncStorage.getItem('name')
          if (nip !== null) {
              // value previously stored
              setData({
                  nip: nip,
                  nama: name,
                  password: password,
                  name: name
              })
          }
      } catch (e) {
          // error reading value
      }
  }

  const register = async (value) => {
      console.log('value', value);
      try {
          const response = await axios.post('http://10.10.10.146:3300/users', {
              nip: value.nip,
              nama: value.nama,
              password: value.password,
          })
          if (response.data.status == 200) {
              console.log('response', response)
              ToastAndroid.show("Register berhasil", ToastAndroid.SHORT)
          }
      } catch (error) {
          console.log(error.message)
          ToastAndroid.show("Register gagal", ToastAndroid.SHORT)
      }
  }

  const navigation = useNavigation();
  return (
      <View style={styles.container}>
          <Image source={Logo} style={styles.logo} />
          <View>
              <TextInput
                   style={[styles.input,{marginTop:100}]}
                  placeholder="Nip"
                  placeholderTextColor="#fff"
                  onChangeText={(nip) => setNip(nip)}
                  value={nip}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Nama"
                  placeholderTextColor="#fff"
                  onChangeText={(nama) => setNama(nama)}
                  value={nama}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  value={password}
              />
              <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                      if (nip == "" || nama == "" || password == "") {
                          ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
                      } else {
                          register({ nip, nama, password });
                      }
                  }}>
                  <Text style={styles.textButtom}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Already Have An Acccount?<Text
                  style={{ fontWeight: 'bold' }} onPress={() => navigation.goBack()}> Sign In</Text></Text>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
      },
      logo:{
        width: 187,
        height: 180,
      },
    input: {
     width:300,
    height: 50,
    backgroundColor: '#333',
    borderRadius:10,
    color:'white',
    paddingHorizontal:20,
    marginBottom:20,
      },
      button : {
        width:300,
        height:50,
        backgroundColor:'#F79E89',
        justifyContent:'center',
        alignItems:'center',
      },
      textButtom:{
        color:'white',
        fontSize:20,
      },
      text: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
        fontSize:16,
      }
    
    }
)

export default register