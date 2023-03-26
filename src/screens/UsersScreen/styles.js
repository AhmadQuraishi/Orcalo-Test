import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
});

export default styles;
