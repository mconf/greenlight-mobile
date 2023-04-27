import styled from 'styled-components/native';
import { Switch as SwitchPaper } from 'react-native-paper';
import Colors from '../../constants/colors';

const ContainerScreen = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: center;
  background-color: ${Colors.white};
  height: 100%;
`;

const Image = styled.Image`
  align-self: center;
  position: absolute;
  margin: 8px;
  top: -120px;
`;

const Container = styled.View`
  position: relative;
  top: 40px;
  padding: 27px 20px 20px;
  margin-bottom: 120px;
  justify-content: center;
  background-color: ${Colors.lightGray100};
  border-radius: 20px;
`;

const InputView = styled.View`
  height: 64px;
  margin: 8px;
`;

const Switch = styled(SwitchPaper)`
  align-self: flex-start;
`;

const PrivateContainer = styled.View`
  height: auto;
  flex-direction: column;
  justify-content: space-between;
`;

const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ButtonContainer = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0px;
  left: 0px;
`;

const VisibilityKey = styled.View`
  width: 100%;
  padding: 8px;
  float: right;
  margin: auto;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  color: ${Colors.primary};
  margin-bottom: 16px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${Colors.lightGray300};
`;

const PrivateText = styled.Text`
  padding-left: 10px;
`;

const ScrollViewStyled = styled.ScrollView`
`;

const ContentContainerStyle = {
  justifyContent: 'center', height: '100%'
};

const LoadingText = styled.Text`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  font-weight: 600;
  color: ${Colors.primary};
`;

const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${Colors.lightGray100};
  border-radius: 20px;
  padding: 25% 0;
`;

export default {
  ButtonContainer,
  ContainerScreen,
  Container,
  Image,
  InputView,
  PrivateContainer,
  PrivateText,
  Subtitle,
  Switch,
  SwitchContainer,
  Title,
  VisibilityKey,
  ScrollViewStyled,
  ContentContainerStyle,
  LoadingContainer,
  LoadingText,
};
