import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: 'absolute',
    bottom: 0,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  confirmBtn: (value) => {
    return {
      backgroundColor: value ? 'green' : 'red',
      paddingVertical: 20,
      paddingHorizontal: 30,
      borderRadius: 10,
    }
  },
  title: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    marginVertical: 20,
  },
})
