import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './confirm.style'

const ConfirmModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.title}> Are You Sure</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmBtn(true)}>
            <Text style={{ color: 'white' }}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.confirmBtn(false)}>
            <Text style={{ color: 'white' }}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmModal
