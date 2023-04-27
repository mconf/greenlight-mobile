import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Styled from '../styles';

const LanguageDrawer = () => {
  const { t, i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);

  // Opens the sub menu
  const languagehandler = () => {
    setShowLanguages((current) => !current);
  };

  // Changes the language
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };


  // TODO: Turn this view into a component
  // TODO: Set the current active language as bold?
  const LanguagesView = () => {
    return (
      <Styled.ContainerCustomButtons>
        <Styled.ButtonLanguageContainer onPress={() => changeLanguage('en')}>
          <Styled.ViewLanguageDrawerContainer>
            <Styled.TextLanguageDrawerContainer>
              English
            </Styled.TextLanguageDrawerContainer>
          </Styled.ViewLanguageDrawerContainer>
        </Styled.ButtonLanguageContainer>
        <Styled.ButtonLanguageContainer onPress={() => changeLanguage('es')}>
          <Styled.ViewLanguageDrawerContainer>
            <Styled.TextLanguageDrawerContainer>
              Español
            </Styled.TextLanguageDrawerContainer>
          </Styled.ViewLanguageDrawerContainer>
        </Styled.ButtonLanguageContainer>
        <Styled.ButtonLanguageContainer onPress={() => changeLanguage('pt_BR')}>
          <Styled.ViewLanguageDrawerContainer style={{ borderRadius: 8 }}>
            <Styled.TextLanguageDrawerContainer>
              Português
            </Styled.TextLanguageDrawerContainer>
          </Styled.ViewLanguageDrawerContainer>
        </Styled.ButtonLanguageContainer>
      </Styled.ContainerCustomButtons>
    );
  };

  // TODO: Fix drop down arrow leaving the container when in english
  const LanguageButton = () => {
    return (
      <Styled.ContainerCustomButtons>
        <Styled.ButtonLanguageContainer onPress={languagehandler}>
          <Styled.ViewLanguageContainer>
            <Styled.LeftContainer>
              <Styled.IconViewContainer>
                <Fontisto name="world-o" size={23} color="black" />
              </Styled.IconViewContainer>
              <Styled.TextLanguageContainer>
                {t('components.drawer.languages')}
              </Styled.TextLanguageContainer>
            </Styled.LeftContainer>

            {showLanguages ? (
              <Styled.DropIconContainer>
                <MaterialIcons name="arrow-drop-up" size={24} color="black" />
              </Styled.DropIconContainer>
            ) : (
              <Styled.DropIconContainer>
                <MaterialIcons name="arrow-drop-down" size={24} color="black" />
              </Styled.DropIconContainer>
            )}
          </Styled.ViewLanguageContainer>
        </Styled.ButtonLanguageContainer>
      </Styled.ContainerCustomButtons>
    );
  };

  return (
    <>
      {LanguageButton()}
      {showLanguages && (
        LanguagesView()
      )}
    </>
  );
};

export default LanguageDrawer;

