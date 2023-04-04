import {DefaultTheme} from '@react-navigation/native';
import colors from '../colors';

export default myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
};
