import {
  useState, useEffect, useContext, useCallback,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput as TIPaper, ActivityIndicator } from 'react-native-paper';
import {
  Keyboard, Share, BackHandler, RefreshControl, KeyboardAvoidingView, TouchableWithoutFeedback
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Styled from './styles';
import api from '../../services/api';
import { AuthContext } from '../../store/context/auth-context';

const HomeScreen = (props) => {
  // React
  const { navigation } = props;
  const { platform } = Constants;
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  const { t } = useTranslation();

  // User data
  const [link, setLink] = useState('');
  const [shortPath, setShortPath] = useState('');
  const [userData, setUserData] = useState({});

  // Meeting
  const [privateSession, setPrivateSession] = useState(false);
  const [keyError, setKeyError] = useState(false);
  const [attendeeKey, setAttendeeKey] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState({
    value: true,
    reason: t('screens.home.loadingRoomInfo'),
  });
  const [participantCount, setParticipantCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  /* Handlers */
  const handleSwitchChange = () => {
    setPrivateSession((prevState) => !prevState);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    checkIsRunning().then(() => setRefreshing(false));
  }, []);

  /* useEffects */

  // Back button handler
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getUserData();
      checkIsRunning();
      setIsLoading({ value: true, reason: t('screens.home.loadingRoomInfo') });
      setTimeout(() => { setIsLoading({ value: false, reason: '' }); }, 5000);
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setIsLoading({
          value: false,
          reason: '',
        });
      }, 5000);
    }, [])
  );

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });
  }, []);

  /* Functions */
  const checkIsRunning = async () => {
    try {
      // eslint-disable-next-line react/destructuring-assignment
      const isRunningRqst = await api.get(`/api/v1/rooms/${authCtx.user.slug}/running`);
      const { data } = isRunningRqst.data;
      if (data.running === 'true') {
        setIsRunning(true);
        setParticipantCount(data.meeting_info.participantCount);
      }
      if (data.running === 'false') {
        setIsRunning(false);
        setParticipantCount(0);
      }
    } catch (e) {
      console.error('error /running', e);
    }
  };

  const getUserData = () => {
    api.get('/api/v1/users/data')
      .then((response) => {
        const { data } = response.data;
        setUserData({
          name: data.name,
          link: data.link,
          slug: data.roomSlug,
        });
        setLink(data.link);
        setPrivateSession(data.isPrivate);
        setAttendeeKey(data.attendeeKey);
        setShortPath(`${data.roomSlug}/${data.org}`);
      })
      .catch((error) => {
        console.error('error getting userdata', error);
      });
  };

  const onClickShare = async () => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error('error sharing link', error);
    }
  };

  const validateKey = () => {
    const reg = /[^\s]/;
    if (reg.test(attendeeKey) === false || attendeeKey.length > 16) {
      setKeyError(true);
      return false;
    }
    return true;
  };

  const createPrivateMeeting = () => {
    // Set room private
    if (validateKey()) {
      api.patch(`/api/v1/rooms/${userData.slug}`, {
        bigbluebutton_room: {
          private: true,
          attendee_key: attendeeKey
        },
      }).then(async () => {
        // get room url
        const response = await api.get(`/api/v1/rooms/join/${shortPath}`, {
          params: {
            key: attendeeKey
          }
        });
        const { data } = response.data;
        // Open bbb-sdk
        setIsLoading({
          value: true,
          reason: t('screens.home.joinSession'),
        });
        navigation.navigate('InsideConferenceScreen', {
          defaultLanguage: i18n.language,
          jUrl: data.mobileUrl
        });
        setIsLoading({
          value: false,
          reason: '',
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const closeMeeting = async () => {
    setIsLoading({
      value: true,
      reason: t('screens.home.closingMeeting'),
    });
    try {
      await api.delete(`/api/v1/rooms/close_room/${userData.slug}`);
    } catch (error) {
      console.error('closeMeeting', error);
    } finally {
      setTimeout(async () => {
        await checkIsRunning()
          .then(() => setIsLoading({
            value: false,
            reason: '',
          }));
      }, 10000);
    }
  };

  const createMeeting = async () => {
    // set room open
    setIsLoading({
      value: true,
      reason: t('screens.home.joinSession'),
    });
    await api.patch(`/api/v1/rooms/${userData.slug}`, {
      bigbluebutton_room: {
        private: false,
      },
    });

    // get room data
    const response = await api.get(`/api/v1/rooms/join/${shortPath}`);
    const { data } = response.data;

    // Open bbb-sdk
    await navigation.navigate('InsideConferenceScreen', {
      defaultLanguage: i18n.language,
      jUrl: data.mobileUrl
    });
  };

  /* View functions */
  const loadingAnimation = () => {
    return (
      <Styled.LoadingContainer>
        <ActivityIndicator animating size="large" />
        <Styled.LoadingText>{isLoading.reason}</Styled.LoadingText>
      </Styled.LoadingContainer>
    );
  };

  const renderSessionIsRunningView = () => {
    return (
      <>
        <Styled.Container>
          <Styled.Title>
            {t('screens.home.meetingRunning')}
          </Styled.Title>
          {participantCount === 1
            && (
              <Styled.Subtitle>
                {participantCount}
                {' '}
                {t('screens.home.participant')}
              </Styled.Subtitle>
            )}
          {participantCount !== 1
            && (
              <Styled.Subtitle>
                {participantCount}
                {' '}
                {t('screens.home.participants')}
              </Styled.Subtitle>
            )}
        </Styled.Container>
        <Button
          variant="primary"
          onPress={() => createMeeting()}
          disabled={isLoading.value}
        >
          {t('screens.home.joinMeeting')}
        </Button>
        <Button
          variant="secondary"
          onPress={() => closeMeeting()}
          disabled={isLoading.value}
        >
          {t('screens.home.closeRoom')}
        </Button>
      </>
    );
  };

  const renderSessionNotRunningView = () => {
    return (
      <>
        <Styled.Container>
          {!keyboardOpen && (
            <>
              <Styled.InputView>
                <TextInput
                  label="Link"
                  value={link.length >= 29 ? `.../${userData?.slug}` : link}
                  disabled
                  autoCorrect={false}
                  onError={false}
                  keyboardType="url"
                  autoCapitalize="none"
                  right={(
                    <TIPaper.Icon
                      name="export-variant"
                      onPress={onClickShare}
                    />
                  )}
                />
              </Styled.InputView>
              <Styled.InputView>
                <TextInput
                  label={t('screens.home.roomName')}
                  value={userData?.name}
                  autoCorrect={false}
                  onError={false}
                  disabled
                  keyboardType="url"
                  autoCapitalize="none"
                />
              </Styled.InputView>
            </>
          )}
          <Styled.PrivateContainer>
            <Styled.SwitchContainer>
              <Styled.Switch
                value={privateSession}
                onValueChange={handleSwitchChange}
              />
              <Styled.PrivateText>{t('screens.home.private')}</Styled.PrivateText>
            </Styled.SwitchContainer>
            {privateSession && (
            <Styled.VisibilityKey>
              <TextInput
                label={t('screens.home.roomKey')}
                value={attendeeKey}
                onChangeText={setAttendeeKey}
                autoCorrect={false}
                onError={keyError}
                keyboardType="url"
                autoCapitalize="none"
              />
            </Styled.VisibilityKey>
            )}
          </Styled.PrivateContainer>
        </Styled.Container>
        {!keyboardOpen && (
        <Styled.ButtonContainer>
          <Button
            variant="primary"
            disabled={isLoading.value}
            onPress={() => (privateSession ? createPrivateMeeting() : createMeeting())}
          >
            {t('screens.home.startMeeting')}
          </Button>
        </Styled.ButtonContainer>
        )}
      </>
    );
  };

  /* Render functions */
  return (
    <KeyboardAvoidingView
      behavior={platform.ios ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback>
        <Styled.ContainerScreen>
          <Styled.ScrollViewStyled
            contentContainerStyle={Styled.ContentContainerStyle}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
              )}
          >
            {isLoading.value
              ? loadingAnimation()
              : isRunning
                ? renderSessionIsRunningView()
                : renderSessionNotRunningView()}
          </Styled.ScrollViewStyled>
          <StatusBar style="light" />
        </Styled.ContainerScreen>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
