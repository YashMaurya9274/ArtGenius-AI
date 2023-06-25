import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  // TextInput,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigator/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './HomeScreen.styles';
import {COLORCODE, DARK_COLORS, LIGHT_COLORS} from '../../enums';
import GradientText from '../../components/GradientText';
import ImageLinks from '../../assets/images';
import GradientButton from '../../components/GradientButton';
import {ScrollView} from 'react-native';
import {Button, TextInput, Snackbar} from 'react-native-paper';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Overlay} from '@rneui/themed';

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const scheme = useColorScheme();
  const [openMintOverlay, setOpenMintOverlay] = useState<boolean>(false);
  const [openUploadOptionsOverlay, setOpenUploadOptionsOverlay] =
    useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.homeHeaderLeft}>
          <GradientText style={styles.gradientAppName}>
            ArtGenius AI
          </GradientText>
        </View>
      ),
      headerTitle: '',
      headerRight: () => (
        <View style={styles.homeButtonContainer}>
          <TouchableOpacity
            style={[
              styles.homeButton,
              {
                backgroundColor:
                  scheme === 'dark'
                    ? DARK_COLORS.HOME_BUTTON
                    : LIGHT_COLORS.HOME_BUTTON,
              },
            ]}>
            <Image
              source={scheme === 'dark' ? ImageLinks.sun : ImageLinks.moon}
              style={styles.homeButtonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[
              styles.homeButton,
              {
                backgroundColor:
                  scheme === 'dark'
                    ? DARK_COLORS.HOME_BUTTON
                    : LIGHT_COLORS.HOME_BUTTON,
              },
            ]}>
            <Image source={ImageLinks.logout} style={styles.homeButtonIcon} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const uploadImage = async (takePicture?: boolean) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 300,
      maxHeight: 300,
    };

    setOpenUploadOptionsOverlay(false);

    if (takePicture) {
      const result = await launchCamera(options);
      if (result.assets) {
        setOpenMintOverlay(true);
        setImage(result.assets[0].uri!);
      }
    } else {
      const result = await launchImageLibrary(options);
      if (result.assets) {
        setOpenMintOverlay(true);
        setImage(result.assets[0].uri!);
      }
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
          backgroundColor:
            scheme === 'dark'
              ? DARK_COLORS.BACKGROUND
              : LIGHT_COLORS.BACKGROUND,
        },
      ]}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={
          scheme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND
        }
      />

      <ScrollView contentContainerStyle={styles.homeScrollViewContainer}>
        <Image source={ImageLinks.logo} style={styles.homeLogo} />

        <Text style={styles.homeDescribeHeader}>
          Describe the image you want!
        </Text>

        <TextInput
          label="Name"
          placeholderTextColor="gray"
          mode="outlined"
          style={{
            margin: 20,
            fontSize: 15,
          }}
          theme={{
            colors: {
              primary: COLORCODE.primary,
            },
          }}
          textAlignVertical="center"
        />

        <TextInput
          label="Decscription"
          placeholderTextColor="gray"
          multiline
          mode="outlined"
          numberOfLines={5}
          style={{
            margin: 20,
            marginTop: 0,
            fontSize: 15,
            height: 100,
            maxHeight: 150,
          }}
          theme={{
            colors: {
              primary: COLORCODE.primary,
            },
          }}
          textAlignVertical="center"
        />

        <View style={{marginTop: 30, gap: 15}}>
          <GradientButton
            colors={['#2974FA', COLORCODE.primary, '#2974FA']}
            imageSource={ImageLinks.generate}
            imageStyle={{height: 25, width: 25}}
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
                  backgroundColor: scheme === 'dark' ? '#2E2E2E' : 'lightgray',
                },
              ]}
            />

            <Text style={{color: scheme === 'dark' ? '#494949' : '#a7a7a7'}}>
              OR
            </Text>

            <View
              style={[
                styles.partitionLine,
                {
                  backgroundColor: scheme === 'dark' ? '#2E2E2E' : 'lightgray',
                },
              ]}
            />
          </View>

          <GradientButton
            // colors={['#FF2B2B', '#FF5757', '#FF2B2B']}
            colors={['#782BFF', '#7B57FF', '#782BFF']}
            imageSource={ImageLinks.addImage}
            imageStyle={{height: 25, width: 25}}
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
            backgroundColor: '#579CFF',
            padding: 25,
            borderRadius: 100,
          }}>
          <Image source={ImageLinks.camera} style={{height: 40, width: 40}} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => uploadImage(false)}
          style={{
            backgroundColor: '#579CFF',
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
            backgroundColor:
              scheme === 'dark' ? DARK_COLORS.MODAL_BG : LIGHT_COLORS.MODAL_BG,
          },
        ]}>
        <View
          style={[
            styles.homeBottomSheetTopBar,
            {
              backgroundColor: scheme === 'dark' ? 'gray' : 'lightgray',
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => uploadImage(true)}
          style={styles.homeBottomSheetOption}>
          <View style={styles.homeBottomSheetIcon}>
            <Image
              source={ImageLinks.camera}
              style={styles.homeBottomSheetImage}
            />
          </View>
          <Text style={styles.homeBottomSheetText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => uploadImage(false)}
          style={styles.homeBottomSheetOption}>
          <View style={styles.homeBottomSheetIcon}>
            <Image
              source={ImageLinks.gallery}
              style={styles.homeBottomSheetImage}
            />
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
        }}>
        <View
          style={[
            styles.mintOverlayContainer,
            {
              backgroundColor:
                scheme === 'dark'
                  ? DARK_COLORS.MODAL_BG
                  : LIGHT_COLORS.MODAL_BG,
            },
          ]}>
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
            buttonColor={COLORCODE.primary}
            textColor="whitesmoke"
            onPress={mint}>
            <Text style={{fontSize: 18, marginHorizontal: 10}}>Mint</Text>
          </Button>
        </View>
      </Overlay>

      {/* After Minting Snackbar status */}
      {/* <Snackbar
        visible={showSnackbar}
        style={{
          backgroundColor:
            scheme === 'dark' ? DARK_COLORS.MODAL_BG : LIGHT_COLORS.MODAL_BG,
        }}
        onDismiss={() => setShowSnackbar(false)}
        action={{
          textColor: COLORCODE.primary,
          label: 'Ok',
          onPress: () => setShowSnackbar(false),
        }}>
        <Text
          style={{
            color: scheme === 'dark' ? 'lightgray' : 'gray',
            // fontSize: 15,
          }}>
          NFT Minted succesfully.
        </Text>
      </Snackbar> */}

      <Snackbar
        visible={showSnackbar}
        style={{
          backgroundColor: COLORCODE.primary,
          // backgroundColor:
          //   scheme === 'dark' ? DARK_COLORS.MODAL_BG : LIGHT_COLORS.MODAL_BG,
        }}
        onDismiss={() => setShowSnackbar(false)}
        action={{
          textColor: 'white',
          label: 'Ok',
          onPress: () => setShowSnackbar(false),
        }}>
        <Text style={{color: 'white', fontSize: 16}}>
          NFT Minted succesfully.
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default HomeScreen;
