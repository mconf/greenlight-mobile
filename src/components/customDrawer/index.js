import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Colors from '../../constants/colors';
import Styled from './styles';
import BottomDrawer from './bottomDrawer';
import ProfileDrawer from './profileDrawer';

const CustomDrawer = (props) => {
  return (
    <Styled.ViewContainer>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.blue }}
      >
        <ProfileDrawer />
        <Styled.ContainerDrawerItemList>
          <DrawerItemList {...props} />
        </Styled.ContainerDrawerItemList>
      </DrawerContentScrollView>
      <BottomDrawer />
    </Styled.ViewContainer>
  );
};

export default CustomDrawer;
