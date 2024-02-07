import { Dimensions, StatusBar, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingVertical: 20,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 30,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  calendarBtn: {
    position: 'absolute',
    right: 15,
    bottom: '25%',
    top: '25%',
  },
  errTxt: {
    color: 'red',
    bottom: 0,
    paddingHorizontal: 40,
  },
  input: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    paddingRight: 40,
  },
  addBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  divider: {
    backgroundColor: 'black',
    // width: Dimensions.get('screen').width,
    height: StyleSheet.hairlineWidth,
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 30,
    marginBottom: 10,
    flexGrow: 1,
    paddingBottom: 20,
  },
  separator: {
    height: 25,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
})
