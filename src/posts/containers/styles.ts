import {StyleSheet} from 'react-native';
import {colors} from '../../commons/colors';

const styles = StyleSheet.create({
  tabStyle: {backgroundColor: '#10c64e', borderWidth: 0, color: '#fff'},
  activeTabStyle: {backgroundColor: '#10c64e'},
  iconHeaderRight: {color: colors.white, padding: 5},
  commentsHeader: {
    fontSize: 14,
    backgroundColor: colors.darkGray,
    textTransform: 'uppercase',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 5
  },
  containerPost: {
    backgroundColor: colors.lightGray
  },
  contentPost: {
    paddingHorizontal: 10
  },
  fabIcon: {
    backgroundColor: colors.danger
  }
});

export default styles;
