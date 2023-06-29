import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import styles from './HomeScreen.styles';
import { COLORCODE, DARK_COLORS, LIGHT_COLORS } from '../../enums';
import GradientText from '../../components/GradientText/GradientText';
import ImageLinks from '../../assets/images';
import GradientButton from '../../components/GradientButton/GradientButton';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Overlay } from '@rneui/themed';
import storeTheme from '../../lib/storeTheme';
import retrieveTheme from '../../lib/retrieveTheme';

// @ts-ignore
import * as fcl from '@onflow/fcl/dist/fcl-react-native';
import CustomSnackBar from '../../components/CustomSnackBar/CustomSnackBar';

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [openMintOverlay, setOpenMintOverlay] = useState<boolean>(false);
  const [openUploadOptionsOverlay, setOpenUploadOptionsOverlay] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('');
  const [themeChanged, setThemeChanged] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const fetchTheme = async () => {
    const themeFromStorage = await retrieveTheme();
    if (themeFromStorage) {
      setTheme(themeFromStorage);
    }
  };

  useEffect(() => {
    if (isFocused || themeChanged) {
      fetchTheme();
      setThemeChanged(false);
    }
  }, [isFocused, themeChanged]);

  const handleLogout = () => {
    // navigation.navigate("Login")
    fcl.unauthenticate();
  };

  const changeTheme = async () => {
    await storeTheme(theme).then(() => {
      setThemeChanged(true);
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.homeHeaderLeft}>
          <GradientText style={styles.gradientAppName}>ArtGenius AI</GradientText>
        </View>
      ),
      headerStyle: {
        backgroundColor: theme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND,
      },
      headerTitle: '',
      headerRight: () => (
        <View style={styles.homeButtonContainer}>
          <TouchableOpacity
            onPress={changeTheme}
            style={[
              styles.homeButton,
              {
                backgroundColor:
                  theme === 'dark' ? DARK_COLORS.HOME_BUTTON : LIGHT_COLORS.HOME_BUTTON,
              },
            ]}
          >
            <Image
              source={theme === 'dark' ? ImageLinks.sun : ImageLinks.moon}
              style={styles.homeButtonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={[
              styles.homeButton,
              {
                backgroundColor:
                  theme === 'dark' ? DARK_COLORS.HOME_BUTTON : LIGHT_COLORS.HOME_BUTTON,
              },
            ]}
          >
            <Image source={ImageLinks.logout} style={styles.homeButtonIcon} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [theme]);

  const uploadImage = async (takePicture?: boolean) => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true, // Not working for IOS
      quality: 0.8,
      aspect: [3, 3],
    };

    setOpenUploadOptionsOverlay(false);

    try {
      if (takePicture) {
        const result = await ImagePicker.launchCameraAsync(options);
        if (!result.canceled) {
          setOpenMintOverlay(true);
          setImage(result.assets[0].uri);
        }
      } else {
        const result = await ImagePicker.launchImageLibraryAsync(options);
        if (!result.canceled) {
          setOpenMintOverlay(true);
          setImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log('Image Picker Error', error);
    }
  };

  const mint = () => {
    setOpenMintOverlay(false);
    setShowSnackbar(true);
  };

  return (
    <SafeAreaView
      style={[
        styles.homeContainer,
        {
          backgroundColor: theme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND,
        },
      ]}
    >
      <StatusBar
        animated
        style={theme === 'dark' ? 'light' : 'dark'}
        backgroundColor={theme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND}
      />
      <ScrollView contentContainerStyle={styles.homeScrollViewContainer}>
        <Image source={ImageLinks.logo} style={styles.homeLogo} />

        <Text style={styles.homeDescribeHeader}>Describe the image you want!</Text>

        <TextInput
          label="Name"
          placeholderTextColor="gray"
          mode="outlined"
          contentStyle={{
            color: theme === 'dark' ? DARK_COLORS.LOGIN_TEXT : LIGHT_COLORS.LOGIN_TEXT,
          }}
          style={{
            margin: 20,
            fontSize: 15,
            backgroundColor: theme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND,
          }}
          theme={{
            colors: {
              primary: COLORCODE.PRIMARY,
            },
          }}
          textAlignVertical="center"
        />

        <TextInput
          label="Decscription"
          multiline
          mode="outlined"
          numberOfLines={5}
          contentStyle={{
            color: theme === 'dark' ? DARK_COLORS.LOGIN_TEXT : LIGHT_COLORS.LOGIN_TEXT,
          }}
          style={{
            margin: 20,
            marginTop: 0,
            fontSize: 15,
            height: 100,
            maxHeight: 150,
            backgroundColor: theme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND,
          }}
          theme={{
            colors: {
              primary: COLORCODE.PRIMARY,
            },
          }}
          textAlignVertical="center"
        />

        <View style={{ marginTop: 30, gap: 15 }}>
          <GradientButton
            colors={['#2974FA', COLORCODE.PRIMARY, '#2974FA']}
            imageSource={ImageLinks.generate}
            imageStyle={{ height: 25, width: 25 }}
            title="Generate Image"
            buttonStyle={styles.homeGenerateUploadButton}
            gradientStyle={styles.gradient}
            titleStyle={styles.homeUploadButtonText}
          />

          <View style={styles.partitionContainer}>
            <View
              style={[
                styles.partitionLine,
                {
                  backgroundColor: theme === 'dark' ? '#2E2E2E' : 'lightgray',
                },
              ]}
            />

            <Text style={{ color: theme === 'dark' ? '#494949' : '#a7a7a7' }}>OR</Text>

            <View
              style={[
                styles.partitionLine,
                {
                  backgroundColor: theme === 'dark' ? '#2E2E2E' : 'lightgray',
                },
              ]}
            />
          </View>

          <GradientButton
            // colors={['#FF2B2B', '#FF5757', '#FF2B2B']}
            colors={['#782BFF', '#7B57FF', '#782BFF']}
            imageSource={ImageLinks.addImage}
            imageStyle={{ height: 25, width: 25 }}
            onPress={() => setOpenUploadOptionsOverlay(true)}
            title="Upload Image"
            buttonStyle={[
              styles.homeGenerateUploadButton,
              {
                marginBottom: 20,
              },
            ]}
            gradientStyle={styles.gradient}
            titleStyle={styles.homeUploadButtonText}
          />
        </View>
      </ScrollView>
      {/* Gallery or Camera selection bottom sheet */}
      {/* <Overlay
        isVisible={openUploadOptionsOverlay}
        onBackdropPress={() => setOpenUploadOptionsOverlay(false)}
        animationType="slide"
        overlayStyle={{
          backgroundColor: 'white',
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: 'auto',
          height: 150,
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => uploadImage(true)}
          style={{
            backgroundColor: COLORCODE.PRIMARY,
            padding: 25,
            borderRadius: 100,
          }}>
          <Image source={ImageLinks.camera} style={{height: 40, width: 40}} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => uploadImage(false)}
          style={{
            backgroundColor: COLORCODE.PRIMARY,
            padding: 25,
            borderRadius: 100,
          }}>
          <Image source={ImageLinks.gallery} style={{height: 40, width: 40}} />
        </TouchableOpacity>
      </Overlay> */}
      {/* Gallery or Camera selection bottom sheet */}
      <Overlay
        isVisible={openUploadOptionsOverlay}
        onBackdropPress={() => setOpenUploadOptionsOverlay(false)}
        animationType="slide"
        overlayStyle={[
          styles.homeGalleryBottomSheet,
          {
            backgroundColor: theme === 'dark' ? DARK_COLORS.MODAL_BG : LIGHT_COLORS.MODAL_BG,
          },
        ]}
      >
        <View
          style={[
            styles.homeBottomSheetTopBar,
            {
              backgroundColor: theme === 'dark' ? 'gray' : 'lightgray',
            },
          ]}
        />
        <TouchableOpacity onPress={() => uploadImage(true)} style={styles.homeBottomSheetOption}>
          <View style={styles.homeBottomSheetIcon}>
            <Image source={ImageLinks.camera} style={styles.homeBottomSheetImage} />
          </View>
          <Text style={styles.homeBottomSheetText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => uploadImage(false)} style={styles.homeBottomSheetOption}>
          <View style={styles.homeBottomSheetIcon}>
            <Image source={ImageLinks.gallery} style={styles.homeBottomSheetImage} />
          </View>
          <Text style={styles.homeBottomSheetText}>Open Gallery</Text>
        </TouchableOpacity>
      </Overlay>
      {/* Mint & Image Overlay */}
      <Overlay
        isVisible={openMintOverlay}
        overlayStyle={{
          backgroundColor: 'transparent',
        }}
        animationType="slide"
        onBackdropPress={() => {
          setImage('');
          setOpenMintOverlay(false);
        }}
      >
        <View
          style={[
            styles.mintOverlayContainer,
            {
              backgroundColor: theme === 'dark' ? DARK_COLORS.MODAL_BG : LIGHT_COLORS.MODAL_BG,
            },
          ]}
        >
          {image && (
            <Image
              source={{
                uri: image,
              }}
              style={styles.mintOverlayImage}
            />
          )}

          <Button
            mode="contained"
            buttonColor={COLORCODE.PRIMARY}
            textColor="whitesmoke"
            onPress={mint}
          >
            <Text style={{ fontSize: 18, marginHorizontal: 10 }}>Mint</Text>
          </Button>
        </View>
      </Overlay>

      <CustomSnackBar
        showSnackBar={showSnackbar}
        customStyle={{
          backgroundColor: theme === 'dark' ? DARK_COLORS.SNACKBAR_BG : LIGHT_COLORS.SNACKBAR_BG,
        }}
        textStyle={{
          color: COLORCODE.PRIMARY,
        }}
        actionTextColor={COLORCODE.PRIMARY}
        onDismiss={() => setShowSnackbar(false)}
        onPressAction={() => setShowSnackbar(false)}
        text="NFT Minted succesfully."
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
