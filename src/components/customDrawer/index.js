import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Colors from '../../constants/colors';
import Styled from './styles';
import BottomDrawer from './bottomDrawer';
import LanguageDrawer from './languageDrawer';
import ProfileDrawer from './profileDrawer';

const CustomDrawer = (props) => {
  return (
    <Styled.ViewContainer>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.primary }}
      >
        <ProfileDrawer />
        <Styled.ContainerDrawerItemList>
          <DrawerItemList {...props} />
          <LanguageDrawer />
        </Styled.ContainerDrawerItemList>
      </DrawerContentScrollView>
      <BottomDrawer />
    </Styled.ViewContainer>
  );
};

export default CustomDrawer;
