import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  PRIMARY: '#45DDE6',
  SECONDARY_TEXT: '#858585',
  ERROR_TEXT: '#E64564',
  INSTRUCTIONS_TEXT: '#4A4A4A',
  INFORMATION_TEXT: '#7F7F7F',
  CART_UPDATED_TEXT: '#06EFA9',
  USERINFO_SUBTEXT: '#007587',
  INPUT_TEXT: '#888888',
  INPUT_BORDER: '#DBDBDB',
  SEPARATOR_BORDER: '#F2F2F2',
  CART_BACKGROUND: '#D58936',
  SEPARATOR_DOT: '#D8D8D8',
};

export const fontFamilies = {
  OpenSansBold: 'OpenSans_700Bold',
  OpenSansSemiBold: 'OpenSans_600SemiBold',
  OpenSansLight: 'OpenSans_300Light',
  OpenSansRegular: 'OpenSans_400Regular',
};

export const fontSizes = {
  sm: 12,
  md: 14,
  lg: 16,
  vlg: 20,
  xl: 24,
};

const baseStyles = {
  zIndexHighest: {
    zIndex: 1000,
  },

  separator: {
    width: width * 0.9,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.SEPARATOR_BORDER,
    height: 1,
  },

  stepperSeparator: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: '#000',
  },

  stepperDot: {
    width: 50,
    height: 1,
    backgroundColor: colors.SEPARATOR_DOT,
  },

  pageContainer: {
    backgroundColor: '#fff',
    flex: 1,
    width: width,
  },

  sectionContainer: {
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingBottom: 30,
  },

  widthContainer: {
    width: width,
    alignItems: 'center',
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  detailsImageContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    height: height * 0.35,
    width: width,
  },

  detailsContainer: {
    position: 'absolute',
    marginTop: height * 0.38,
    paddingLeft: width * 0.05,
  },

  cartCountContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 15,
    height: 15,
    backgroundColor: colors.CART_BACKGROUND,
    borderRadius: 50,
    zIndex: 10000,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    justifyContent: 'center',
    marginTop: 20,
  },

  checkoutTextContainer: {
    marginTop: 10,
    width: width,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  momsContainer: {
    marginTop: 10,
    width: width,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText: {
    fontFamily: fontFamilies.OpenSansBold,
    fontSize: fontSizes.lg,
    textTransform: 'uppercase',
  },

  descriptionText: {
    fontFamily: fontFamilies.OpenSansSemiBold,
    fontSize: fontSizes.md,
    color: colors.SECONDARY_TEXT,
  },

  informationText: {
    fontFamily: fontFamilies.OpenSansRegular,
    fontSize: fontSizes.md,
    color: colors.INFORMATION_TEXT,
    marginTop: 10,
    width: width * 0.8,
  },

  updateText: {
    fontFamily: fontFamilies.OpenSansRegular,
    fontSize: fontSizes.md,
    color: colors.CART_UPDATED_TEXT,
    textTransform: 'uppercase',
  },

  instructionsHeaderText: {
    fontFamily: fontFamilies.OpenSansLight,
    fontSize: fontSizes.xl,
    color: colors.INSTRUCTIONS_TEXT,
  },

  instructionText: {
    fontFamily: fontFamilies.OpenSansLight,
    fontSize: fontSizes.vlg,
    color: colors.INSTRUCTIONS_TEXT,
  },

  dealHeaderText: {
    fontFamily: fontFamilies.OpenSansBold,
    fontSize: fontSizes.lg,
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#666',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  welcomeText: {
    fontFamily: fontFamilies.OpenSansRegular,
    fontSize: fontSizes.lg,
    color: '#fff',
    textShadowColor: '#666',
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
  },

  inputLabelText: {
    fontFamily: fontFamilies.OpenSansRegular,
    fontSize: fontSizes.sm,
    color: colors.INSTRUCTIONS_TEXT,
  },

  inputText: {
    width: '80%',
    fontFamily: fontFamilies.OpenSansRegular,
    fontSize: fontSizes.vlg,
    color: colors.INPUT_TEXT,
    borderBottomWidth: 1,
    borderColor: colors.INPUT_BORDER,
    textAlign: 'center',
  },

  cartCountText: {
    fontSize: 8,
    fontWeight: 'bold',
  },

  errorText: {
    color: colors.ERROR_TEXT,
    fontFamily: fontFamilies.OpenSansSemiBold,
    fontSize: fontSizes.md,
  },

  primaryButton: {
    width: 170,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    borderWidth: 0,
    borderRadius: 20,
    color: 'white',
    borderColor: '#707070',
  },

  primaryButtonText: {
    color: 'white',
    fontFamily: fontFamilies.OpenSansSemiBold,
    fontSize: fontSizes.md,
  },

  secondaryButton: {
    width: 170,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 20,
    color: 'white',
    borderColor: colors.PRIMARY,
  },

  secondaryButtonText: {
    color: colors.PRIMARY,
    fontFamily: fontFamilies.OpenSansSemiBold,
    fontSize: fontSizes.md,
  },

  counterButton: {
    height: 25,
    width: 25,
    borderRadius: 50,
    backgroundColor: colors.PRIMARY,
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterButtonText: {
    color: '#333',
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.OpenSansBold,
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartCostHeaderText: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.OpenSansRegular,
    color: colors.PRIMARY,
  },

  userNameHeader: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.OpenSansLight,
    color: colors.PRIMARY,
  },

  userInfoSubText: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.OpenSansRegular,
    color: colors.USERINFO_SUBTEXT,
    marginTop: 10,
  },

  addressNameHeader: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.OpenSansBold,
    color: colors.PRIMARY,
    marginTop: 20,
  },

  addressDetails: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.OpenSansRegular,
    color: colors.SECONDARY_TEXT,
    marginTop: 10,
  },

  cardNumbers: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.OpenSansRegular,
    color: colors.SECONDARY_TEXT,
    // marginTop: 10,
  },

  cardHeader: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.OpenSansRegular,
  },

  cardDetails: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.OpenSansBold,
    color: colors.PRIMARY,
  },

  overlayButton: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    borderWidth: 0,
    borderRadius: 20,
    color: 'white',
    borderColor: '#fff',
  },

  overlayButtonText: {
    color: '#333',
    fontFamily: fontFamilies.OpenSansSemiBold,
    fontSize: fontSizes.md,
  },

  detailsImage: {
    height: undefined,
    width: undefined,
    flex: 1,
  },

  imageFullScreenBackground: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center',
  },

  otpInputText: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    backgroundColor: '#EFEFEF',
    fontSize: fontSizes.xl,
    borderRadius: 5,
    width: width * 0.1,
    height: height * 0.07,
    textAlign: 'center',
    marginRight: 10,
  },
};

export default function () {
  return StyleSheet.create({ ...baseStyles });
}
