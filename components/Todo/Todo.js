import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from './todo.style'
import { AntDesign } from '@expo/vector-icons'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import UpdateModal from '../UpdateModal/UpdateModal'

const Todo = ({ todo, deleteTodo, updateTodo }) => {
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false)
  const [title, setTitle] = useState(todo.title)
  return (
    <View>
      <ConfirmModal
        isVisible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false)
          deleteTodo(todo.id)
        }}
      />
      <UpdateModal
        isVisible={updateVisible}
        onClose={() => setUpdateVisible(false)}
        onConfirm={() => {
          setUpdateVisible(false)
          updateTodo(todo.id, title)
        }}
        title={title}
        setTitle={setTitle}
      />
      <View style={styles.container}>
        <Text>{todo.id}</Text>
        <Text>{todo.title}</Text>
        <View style={{ ...styles.container, gap: 5 }}>
          <TouchableOpacity
            onPress={() => {
              setUpdateVisible(true)
            }}
            style={styles.todoBtn('edit')}
          >
            <AntDesign size={20} color={'white'} name='edit' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setConfirmVisible(true)
            }}
            style={styles.todoBtn('delete')}
          >
            <AntDesign size={20} color={'white'} name='delete' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Todo
