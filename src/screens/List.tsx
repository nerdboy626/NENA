import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { addTodo, createUserData, updateUserData } from '../../backend/usersAPI'

let num = 0;

const List = ({ navigation }: any) => {
  // Approach 1 to add to collection
  // useEffect(() => {
  //   addDoc(collection(FIRESTORE_DB, 'todos'), { title: 'I am a test', done: false})
  // }, []);

  // Approach 2 - async method
  // const addTodo = async () => {
  //   const doc = addDoc(collection(FIRESTORE_DB, 'todos'), { title: 'I am a test', done: false })
  // }

  let userProfile = {
    'user_id': 'ngorli',
    'password': 'eeee',
    'email': 'ngorli@stanford.edu',
    'profile_picture': 'hihi.com',
    'preferred_cuisine': 'Minnesota'
  }
  
  return (
    <View>
      <Text>List</Text>
      <Button onPress={() => navigation.navigate('Details')} title="Open Details" />
      <Button onPress={() => addTodo(num)} title="Add Todo" />
      <Button onPress={() => createUserData(userProfile)} title="Add User" />
    </View>
  )
}

export default List