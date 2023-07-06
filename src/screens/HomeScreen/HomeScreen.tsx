import { View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
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
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Overlay } from '@rneui/themed';
import storeTheme from '../../lib/storeTheme';
import retrieveTheme from '../../lib/retrieveTheme';
import { Configuration, OpenAIApi } from 'openai';
// @ts-ignore
import * as fcl from '@onflow/fcl/dist/fcl-react-native';
import CustomSnackBar from '../../components/CustomSnackBar/CustomSnackBar';

// @ts-ignore
import { OPENAI_API_KEY, LIGHTHOUSE_API_KEY } from '@env';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { mintNFT } from '../../../flow/cadence/transactions/mint_nfts';
import { getTotalSupply } from '../../../flow/cadence/scripts/getTotalSupply';

// @ts-ignore
import * as types from '@onflow/types';
import Loader from '../../components/Loader/Loader';
import lighthouse from '@lighthouse-web3/sdk';

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [openMintOverlay, setOpenMintOverlay] = useState<boolean>(false);
  const [openUploadOptionsOverlay, setOpenUploadOptionsOverlay] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState<string>('');
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('');
  const [themeChanged, setThemeChanged] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [imageDecsription, setImageDescription] = useState('');
  const [creationLoading, setCreationLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const user = useCurrentUser();
  const [mintStatus, setMintStatus] = useState<string>('');
  const [showMintLoader, setShowMintLoader] = useState<boolean>(false);
  const [showErrorBar, setShowErrorBar] = useState<boolean>(false);
  const [showNameBar, setShowNameBar] = useState<boolean>(false);

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

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
                marginRight: 0,
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

  const handleUploadImage = () => {
    if (!name) {
      setShowNameBar(true);
      return;
    }
    setOpenUploadOptionsOverlay(true);
  };

  const generateImage = async () => {
    if (!name) {
      setShowNameBar(true);
      return;
    }
    if (!imageDecsription) return;
    setImage('');
    setCreationLoading(true);
    try {
      const response = await openai.createImage({
        prompt: imageDecsription,
        n: 1,
        size: '512x512',
      });
      console.log(response);
      const image_url = response.data.data[0].url;
      console.log(image_url);
      if (image_url) {
        setImage(image_url);
        setOpenMintOverlay(true);
      }
      setCreationLoading(false);
    } catch (e) {
      console.log('ERROR IMAGE GENERATION', e);
    }
  };

  const mint = async (metadata?: any) => {
    setMintStatus('Opening your wallets...');
    let _totalSupply;
    try {
      _totalSupply = await fcl.query({
        cadence: `${getTotalSupply}`,
      });
    } catch (err) {
      console.log('ERROR FROM CLOSING WALLET', err);
      setShowMintLoader(false);
      setMintStatus('');
    }

    const _id = parseInt(_totalSupply) + 1;

    // console.log('_totalSupply', _totalSupply);

    // console.log('user', user);
    // console.log('user address', user?.address);
    try {
      setOpenMintOverlay(false);
      setShowMintLoader(true);
      const transactionId = await fcl.mutate({
        cadence: `${mintNFT}`,
        args: (arg: any, t: any) => [
          arg('0x' + user?.address, types.Address), //address to which the NFT should be minted
          arg('ArtGeniusAI # ' + _id.toString(), types.String), // Name
          arg('ArtGeniusAI NFTs on the Flow blockchain', types.String), // Description
          arg(metadata, types.String),
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        limit: 99,
      });
      // setMintStatus(`Minting NFT now with transaction ID ${transactionId}`);
      setMintStatus(`Minting NFT now with transaction ID...`);

      // console.log('Minting NFT now with transaction ID', transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      // console.log('transaction', JSON.stringify(transaction));
      setMintStatus('Minting NFT with transaction ID completed!');
      // console.log('minting nft with transacn id done!');
      // console.log(
      //   'Testnet explorer link:',
      //   `https://testnet.flowscan.org/transaction/${transactionId}`
      // );
      setShowMintLoader(false);
      setMintStatus('');
      setShowSnackbar(true);
    } catch (error) {
      console.log(error);
      setShowMintLoader(false);
      setMintStatus('');
      setShowErrorBar(true);
      // alert("Error minting NFT, please check the console for error details!");
    }
  };

  // const uploadImageToThirdWeb = async (e: any) => {
  //   console.log(e);
  //   // setLoading(2);
  //   // const storage = new ThirdwebStorage();
  //   // const url = await storage.upload(e);
  //   // console.log(url);
  //   // setLoading(0);
  //   // setUrl(url)
  //   // return url;
  // };

  const handleSendTransaction = async () => {
    if (!name) {
      setShowNameBar(true);
      return;
    }
    if (user?.address) {
      setOpenMintOverlay(false);
      setShowMintLoader(true);
      setMintStatus('Storing image to a Decentralized Storage');
      const uploadResponse = await lighthouse.upload(image, LIGHTHOUSE_API_KEY); // path, apiKey
      const metadata = `ipfs:${uploadResponse.data.Hash}`;
      console.log('metadata', metadata);
      mint(metadata);
    }
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
          label="Name (Required)"
          placeholderTextColor="gray"
          value={name}
          onChangeText={(text) => setName(text)}
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
          value={imageDecsription}
          onChangeText={(text) => setImageDescription(text)}
          mode="outlined"
          numberOfLines={5}
          contentStyle={{
            color: theme === 'dark' ? DARK_COLORS.LOGIN_TEXT : LIGHT_COLORS.LOGIN_TEXT,
          }}
          style={[
            styles.homeTextInput,
            {
              backgroundColor: theme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND,
            },
          ]}
          theme={{
            colors: {
              primary: COLORCODE.PRIMARY,
            },
          }}
          textAlignVertical="center"
        />

        <View style={{ marginTop: 30 }}>
          <GradientButton
            colors={['#2974FA', COLORCODE.PRIMARY, '#2974FA']}
            imageSource={ImageLinks.generate}
            imageStyle={{ height: 25, width: 25, marginRight: 10 }}
            title="Generate Image"
            onPress={generateImage}
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
            imageStyle={{ height: 25, width: 25, marginRight: 10 }}
            onPress={handleUploadImage}
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
          zIndex: 10,
        }}
        animationType="slide"
        onBackdropPress={() => {
          setImage('');
          setOpenMintOverlay(false);
          setShowErrorBar(true);
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
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              style={[
                styles.mintOverlayImage,
                {
                  position: 'relative',
                },
              ]}
            />
          )}

          {imageLoading && (
            <View
              style={{
                position: 'absolute',
                top: 100,
                left: 0,
                right: 0,
              }}
            >
              <Text
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontSize: 20,
                  color: COLORCODE.PRIMARY,
                  fontWeight: '500',
                  marginBottom: 18,
                }}
              >
                Loading Image...
              </Text>
              <ActivityIndicator color={COLORCODE.PRIMARY} size="large" />
            </View>
          )}

          {/* <AnimatedLoader
            visible={imageLoading}
            // overlayColor="rgba(255,255,255,0.75)"
            source={require('../../assets/loader.json')}
            animationStyle={{
              height: 200,
              width: 200,
            }}
            speed={1}
          >
            <Text
              style={{
                fontSize: 24,
                color: COLORCODE.PRIMARY,
                fontWeight: '500',
              }}
            >
              Loading Image...
            </Text>
          </AnimatedLoader> */}

          {/* <Button
            mode="contained"
            buttonColor={COLORCODE.PRIMARY}
            textColor="whitesmoke"
            onPress={handleSendTransaction}
          >
            <Text style={{ fontSize: 18, marginHorizontal: 10 }}>Mint</Text>
          </Button> */}

          <GradientButton
            colors={['#BE3EFA', '#4C3EFA', '#3E6EFA']}
            onPress={handleSendTransaction}
            title="Mint NFT"
            buttonStyle={[
              {
                marginHorizontal: 10,
                borderRadius: 10,
                width: '85%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
              },
            ]}
            gradientStyle={{
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
            titleStyle={{ fontSize: 18, textAlign: 'center', color: 'whitesmoke' }}
          />
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

      <CustomSnackBar
        showSnackBar={showErrorBar}
        customStyle={{
          backgroundColor: COLORCODE.ERROR,
        }}
        textStyle={{
          color: 'white',
        }}
        actionTextColor="white"
        onDismiss={() => setShowErrorBar(false)}
        onPressAction={() => setShowErrorBar(false)}
        text="Minting Cancelled."
      />

      <CustomSnackBar
        showSnackBar={showNameBar}
        customStyle={{
          backgroundColor: COLORCODE.PRIMARY,
        }}
        textStyle={{
          color: 'white',
        }}
        actionTextColor="white"
        onDismiss={() => setShowNameBar(false)}
        onPressAction={() => setShowNameBar(false)}
        text="Please add a NFT name."
      />

      <Loader visible={showMintLoader} message={mintStatus} theme={theme} />

      <Loader visible={creationLoading} message="Generating Image..." theme={theme} />
    </SafeAreaView>
  );
};

export default HomeScreen;
