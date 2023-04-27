import styled from 'styled-components/native';
import Colors from '../../constants/colors';

// %%%%%%%% Type = 'primary' %%%%%%%% //
const ButtonOuterContainer = styled.View`
  display: flex;
  width: 100%;
  margin: 8px 0px;
`;

const ButtonInnerContainer = styled.Pressable`
  background-color: ${Colors.primary};
  justify-content: center;
  display: flex;
  border-radius: 40px;
  height: 40px;

  ${({ variant }) => variant === 'secondary'
    && `
    background-color: ${Colors.white};
    border: 2px solid ${Colors.primary};
  `}

  ${({ variant }) => variant === 'tertiary'
    && `
    background-color: ${Colors.secondary};
  `}

  ${({ disabled }) => disabled
    && `
    background-color: ${Colors.lightGray100};
    border: 2px solid ${Colors.lightGray100};
  `}
`;

const ButtonText = styled.Text`
  color: ${Colors.white};
  text-align: center;
  font-size: 18px;

  ${({ variant }) => variant === 'secondary'
    && `
    color: ${Colors.primary};
  `}

  ${({ disabled }) => disabled
    && `
    color: ${Colors.lightGray200};
  `}
`;

export default {
  ButtonOuterContainer,
  ButtonInnerContainer,
  ButtonText,
};
