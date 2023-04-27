import styled from 'styled-components/native';
import Colors from '../../constants/colors';

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 42px;
  justify-content: center;
`;

const AlternateLogin = styled.View`
  padding-top: 16px;
  flex-direction: row;
  align-items: center;
`;

const AlternateLoginText = styled.Text`
  font-size: 20px;
  padding: 10px;
  font-weight: 600;
  color: ${Colors.primary};
`;

const LoadingText = styled.Text`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  font-weight: 400;
  color: ${Colors.primary};
`;

const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${Colors.lightGray100};
  border-radius: 20px;
  padding: 25% 0;
  width: 100%
`;

export default {
  Container,
  AlternateLogin,
  AlternateLoginText,
  LoadingText,
  LoadingContainer
};
