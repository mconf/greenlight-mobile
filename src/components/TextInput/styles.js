import styled from 'styled-components/native';
import { TextInput as TIComponent } from 'react-native-paper';
import Colors from '../../constants/colors';

const TextInput = styled(TIComponent).attrs({
  mode: 'outlined',
  outlineColor: `${Colors.lightGray300}`,
  activeOutlineColor: `${Colors.lightGray300}`,
  textColor: `${Colors.lightGray300}`,
})``;

const ErrorInput = styled(TIComponent).attrs({
  mode: 'outlined',
  outlineColor: `${Colors.red}`,
  activeOutlineColor: `${Colors.red}`,
  textColor: `${Colors.red}`,
})``;

export default {
  TextInput,
  ErrorInput,
};
