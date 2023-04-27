import styled from 'styled-components/native';
import { css } from 'styled-components';
import { Image } from 'react-native';
import Colors from '../../constants/colors';
import Pressable from '../Pressable';
import DefaultAvatar from '../DefaultAvatar';

const ViewContainer = styled.View`
  flex: 1;
`;

const CustomDrawerContainer = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

const ContainerDrawerItemList = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  padding-top: 10px;
`;

const AppVersion = styled.Text`
  color: ${Colors.lightGray300};
  font-size: 14px;
  text-align: center;
  text-align-vertical: center;
  margin-bottom: 20px;
`;

const DrawerIcon = styled.View`
  margin-right: -24px;
`;

const ContainerCustomButtons = styled.View``;

const ButtonLanguageContainer = styled(Pressable).attrs(() => ({
  pressStyle: {
    opacity: 0.8,
  },
}))`
  ${() => css`
    padding:  20px 10px;
  `}
`;

const ViewLanguageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-top: -15px;
  margin-bottom: -15px;
  background-color: ${Colors.lightGray100};
  border-radius: 8px;
`;

const TextLanguageContainer = styled.Text`
  color: ${Colors.lightGray400};
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  text-align-vertical: center;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  gap: 7px;
  align-items: center;
`;

const IconViewContainer = styled.Text`
  margin-left: -4px;
`;

const ViewLanguageDrawerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin-top: -35px;
  margin-bottom: -50px;
  background-color: ${Colors.lightGray100};
`;

const TextLanguageDrawerContainer = styled.Text`
  padding-left: 29px;
  color: ${Colors.lightGray400};
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  text-align-vertical: center;
  margin-bottom: 8px;
`;

const DropIconContainer = styled.View`
  align-self: flex-end;
`;

const UserAvatar = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: -10px;
  margin-top: -10px;
`;

const AvatarImage = styled(Image)`
  width: 72px;
  height: 72px;
  border-radius: 36px !important;
`;

const DefaultAvatarImage = styled(DefaultAvatar)`
  height: 72px;
  width: 72px;
  border-radius: 36px;
`;

const UserName = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  padding-left: 20px;
`;

const UserEmail = styled.Text`
  color: ${Colors.white};
  font-size: 11px;
  padding-left: 20px;
`;

const UserData = styled.View`
  display: flex;
  flex-direction: column;
  width: 180px;
`;

export default {
  ViewContainer,
  CustomDrawerContainer,
  ContainerDrawerItemList,
  AppVersion,
  DrawerIcon,
  ContainerCustomButtons,
  ButtonLanguageContainer,
  ViewLanguageContainer,
  TextLanguageContainer,
  IconViewContainer,
  ViewLanguageDrawerContainer,
  TextLanguageDrawerContainer,
  DropIconContainer,
  UserAvatar,
  UserName,
  UserEmail,
  UserData,
  AvatarImage,
  DefaultAvatarImage,
  LeftContainer,
};
