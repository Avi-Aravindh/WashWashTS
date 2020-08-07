import { StyleSheet, Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  PRIMARY: '#45DDE6',
  SECONDARY_TEXT: '#858585',
  INSTRUCTIONS_TEXT: '#4A4A4A',
  INPUT_TEXT: '#ACACAC',
  INPUT_BORDER: '#DBDBDB',
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
  vvlg: 22,
};

const baseStyles = {
  pageContainer: {
    backgroundColor: '#fff',
    flex: 1,
    width: dimensions.fullWidth,
  },

  sectionContainer: {
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingBottom: 30,
  },

  fullWidthContainer: {
    width: dimensions.fullWidth,
    alignItems: 'center',
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

  instructionText: {
    fontFamily: fontFamilies.OpenSansLight,
    fontSize: fontSizes.vlg,
    color: colors.INSTRUCTIONS_TEXT,
  },

  dealHeaderText: {
    fontFamily: fontFamilies.OpenSansRegular,
    fontSize: fontSizes.lg,
    color: '#fff',
    marginBottom: 10,
  },

  welcomeText: {
    fontFamily: fontFamilies.OpenSansRegular,
    fontSize: fontSizes.vvlg,
    color: '#fff',
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

  imageFullScreenBackground: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function () {
  return StyleSheet.create({ ...baseStyles });
}
