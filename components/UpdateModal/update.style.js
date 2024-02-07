import { Dimensions, StatusBar, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height * 0.3,
    borderRadius: 25,
    marginHorizontal: 10,
    backgroundColor: '#464C55',
    marginTop: '50%',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 30,
  },
  input: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    fontSize: 20,
    padding: 15,
    paddingVertical: 20,
    borderColor: 'white',
    color: 'white',
  },
  editBtn: {
    backgroundColor: 'green',
    padding: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
  },
})
