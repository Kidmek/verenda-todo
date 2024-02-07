import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoBtn: (type) => {
    return {
      backgroundColor: type == 'delete' ? 'red' : 'blue',
      padding: 10,
      borderRadius: 10,
    }
  },
})
