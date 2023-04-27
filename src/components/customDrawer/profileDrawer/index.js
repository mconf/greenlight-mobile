/* eslint-disable react/destructuring-assignment */
import { useContext } from 'react';
import Styled from '../styles';
import { AuthContext } from '../../../store/context/auth-context';

const ProfileDrawer = () => {
  const authCtx = useContext(AuthContext);

  const { name } = authCtx.user;
  const { email } = authCtx.user;
  const { avatar } = authCtx.user;

  return (
    <Styled.CustomDrawerContainer>
      <Styled.UserAvatar>
        {avatar ? (
          <Styled.AvatarImage
            source={{ uri: avatar }}
            resizeMode="cover"
          />
        ) : (
          <Styled.DefaultAvatarImage
            userName={name}
          />
        )}
        <Styled.UserData>
          <Styled.UserName>
            {name}
          </Styled.UserName>
          <Styled.UserEmail numberOfLines={2} ellipsizeMode="tail">
            {email}
          </Styled.UserEmail>
        </Styled.UserData>
      </Styled.UserAvatar>
    </Styled.CustomDrawerContainer>
  );
};

export default ProfileDrawer;
