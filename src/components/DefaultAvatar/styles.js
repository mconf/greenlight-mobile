import styled from 'styled-components/native';
import Colors from '../../constants/colors';

const Background = styled.View`
  width: 72px;
  height: 72px;
  border: ${Colors.white} solid 2px;
  border-radius: 100px;
  background-color: ${Colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ userColor }) => userColor
    && `
     background-color: ${userColor};
  `}
`;

const UserName = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
`;

export default {
  Background,
  UserName,
};
