import styled from 'styled-components/native';
import Colors from '../../../constants/colors';

const Container = styled.View`
  display: flex;
  padding: 24px;
  justify-content: center;
`;

const InputView = styled.View`
  height: 64px;
  margin: 8px;
`;

const InfoContainer = styled.View`
  margin: 8px;
  justify-content: flex-end;
  align-items: center;
  flex-flow: nowrap;
`;

const ForgotPassword = styled.Text`
  align-self: flex-end;
  color: ${Colors.lightGray400}
  text-decoration: underline;
  text-decoration-color: ${Colors.lightGray400}
`;

const WrongCredentials = styled.Text`
  color: ${Colors.red}
`;

export default {
  Container,
  InfoContainer,
  InputView,
  ForgotPassword,
  WrongCredentials,
};
