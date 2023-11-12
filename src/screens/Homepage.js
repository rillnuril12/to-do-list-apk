import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/list.png'


const Homepage = () => {
  const [todo, setTodo] = useState([]);
  const navigation = useNavigation();
  const [data, setData] = useState({
    userid: '',
    password: '',
    nama: '',
  });

  console.log('ini data todolist', todo);
  useEffect(() => {
    axios.get('http://10.10.10.146:3300/todo').then(res => {
      // console.log('res', res);

      setTodo(res.data.data);
    });
  }, []);

  // const [todo, setTodo] = useState({
  //   listid: '',
  //   title: '',
  //   desc: '',
  //   tanggal: '',
  //   status: '',
  // });

  console.log('userid', data.userid);
  console.log('password', data.password);
  console.log('nama', data.nama);

  // console.log('listid', todo.listid);
  // console.log('title', todo.title);
  // console.log('decs', todo.desc);
  // console.log('tanggal', todo.tanggal);
  // console.log('status', todo.status);

  useEffect(() => {
    getData();
    // getTodo();
    return () => {};
  }, []);

  const getData = async () => {
    try {
      let userid = await AsyncStorage.getItem('userid');
      let password = await AsyncStorage.getItem('password');
      let nama = await AsyncStorage.getItem('nama');
      if (userid !== null) {
        // value previously stored
        setData({
          userid: userid,
          nama: nama,
          password: password,
        });
      }
    } catch (e) {
      // error reading value
    }
  };
  // const getTodo = async () => {
  //   try {
  //     let listid = await AsyncStorage.getItem('listid');
  //     let title = await AsyncStorage.getItem('title');
  //     let desc = await AsyncStorage.getItem('desc');
  //     let tanggal = await AsyncStorage.getItem('tanggal');
  //     let status = await AsyncStorage.getItem('status');
  //     if (listid !== null) {
  //       // value previously stored
  //       setTodo({
  //         listid: listid,
  //         title: title,
  //         desc: desc,
  //         tanggal: tanggal,
  //         status: status,
  //       });
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  return ( 
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 70,
          flexDirection: 'row',
          backgroundColor: '#000',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>

        <Text
          style={{
            fontSize:25,
            fontWeight: 'bold',
            color: '#F79E89',
          }}>
          TO DO LIST {data.nama}
        </Text>
        <Image source={logo} style={{width:24 , height: 24 }} />
      </View>
      <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
        <View style = {{flexDirection: 'row'}}>
        <Image source={require('../asset/union.png')} style={{width:40 , height: 34 ,marginTop:20}} />
      <Text 
        style={{
          fontSize:30,
          fontWeight: 'bold',
          color: '#F76C6A',
          marginLeft: 10,
          marginTop : 15
        }}>
        LIST OF TODO</Text> 
        </View>
        <Image source={require('../asset/filter.png')} style={{width:30 , height: 24, marginTop: 25}}/>
      </View>
      <FlatList
        data={todo}
        numColumns={1}
        keyExtractor={item => item.id}
        renderItem={e => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                borderWidth: 2,
                borderColor: 'yellow',
                borderRadius: 10,
                backgroundColor: '#fff',
                padding: 5,
                elevation: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {e.item.title}
                </Text>
                <Text>{e.item.desc}</Text>
                <Text>{e.item.tanggal}</Text>
                <Text>{e.item.status}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
          marginRight: 20,
        }}
        onPress={() => navigation.navigate('TodoScreen')}>
        <Icon name="plus-circle" color={'#b0cef5'} size={80} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default Homepage;