import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

const List = ({ navigation }: any) => {
  // Approach 1 to add to collection
  // useEffect(() => {
  //   addDoc(collection(FIRESTORE_DB, 'todos'), { title: 'I am a test', done: false})
  // }, []);

  // Approach 2 - async method
  const addTodo = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, 'todos'), { title: 'I am a test', done: false })
  }
  
  return (
    <View>
      <Text>List</Text>
      <Button onPress={() => navigation.navigate('Details')} title="Open Details" />
      <Button onPress={() => addTodo()} title="Add Todo" />
    </View>
  )
}

export default List