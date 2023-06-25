import {StyleSheet} from 'react-native';
import {COLORCODE} from '../../enums';

const styles = StyleSheet.create({
  gradientAppName: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: 8,
  },
  homeContainer: {
    display: 'flex',
    flex: 1,
  },
  homeHeaderLeft: {
    alignItems: 'center',
    gap: 12,
  },
  homeScrollViewContainer: {
    height: 'auto',
    justifyContent: 'center',
    paddingTop: 60,
  },
  homeButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
  },
  homeDescribeHeader: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    color: COLORCODE.primary,
    fontWeight: '500',
  },
  homeButton: {
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonIcon: {
    height: 25,
    width: 25,
    tintColor: '#579CFF',
  },
  homeLogo: {
    height: 120,
    width: 120,
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  homeGenerateUploadButton: {
    borderRadius: 10,
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  homeUploadButtonText: {
    color: 'whitesmoke',
    textAlign: 'center',
    fontSize: 16,
  },
  partitionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partitionLine: {
    height: 1,
    width: '42%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  gradient: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
  },
  homeGalleryBottomSheet: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 'auto',
    height: 150,
    padding: 10,
    paddingBottom: 15,
    gap: 15,
  },
  homeBottomSheetTopBar: {
    height: 4,
    width: 40,
    borderRadius: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  homeBottomSheetOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  homeBottomSheetIcon: {
    backgroundColor: COLORCODE.primary,
    padding: 8,
    borderRadius: 100,
  },
  homeBottomSheetImage: {
    height: 20,
    width: 20,
  },
  homeBottomSheetText: {
    fontSize: 17,
    color: COLORCODE.primary,
  },
  mintOverlayContainer: {
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  mintOverlayImage: {
    height: 300,
    width: 300,
    borderRadius: 10,
  },
});

export default styles;
