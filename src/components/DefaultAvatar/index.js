import Styled from './styles';

const DefaultAvatar = (props) => {
  const { userName, userColor } = props;

  return (
    <Styled.Background userColor={userColor}>
      <Styled.UserName>{userName?.substring(0, 2)}</Styled.UserName>
    </Styled.Background>
  );
};

export default DefaultAvatar;
