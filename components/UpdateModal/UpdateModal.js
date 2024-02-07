import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native'
import React from 'react'
import { styles } from './update.style'
import { AntDesign } from '@expo/vector-icons'

const UpdateModal = ({ isVisible, onClose, onConfirm, title, setTitle }) => {
  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Edit Todo</Text>
          <Pressable onPress={onClose}>
            <AntDesign name='closecircleo' color='#fff' size={30} />
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder='Todo Title'
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity onPress={onConfirm} style={styles.editBtn}>
            <Text style={{ color: 'white' }}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default UpdateModal
