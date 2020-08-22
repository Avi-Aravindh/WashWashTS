import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { createStyles } from '../styles';

interface ButtonProps {
  text: string;
  type: string;
  disabled?: boolean;
  onPress: () => void;
}

const DefaultButton = ({ text, type, disabled, onPress }: ButtonProps) => {
  const baseStyles = createStyles();

  return (
    <View>
      <TouchableOpacity
        disabled={disabled ? disabled : false}
        onPress={() => onPress()}
        style={[
          type == 'primary'
            ? baseStyles.primaryButton
            : type == 'secondary'
            ? baseStyles.secondaryButton
            : type == 'overlay'
            ? baseStyles.overlayButton
            : null,
          disabled ? { opacity: 0.3 } : { opacity: 1 },
        ]}
      >
        <Text
          style={
            type == 'primary'
              ? baseStyles.primaryButtonText
              : type == 'secondary'
              ? baseStyles.secondaryButtonText
              : type == 'overlay'
              ? baseStyles.overlayButtonText
              : null
          }
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// const Styles = StyleSheet.create({
//   buttonContainer: {
//     width: 160,
//     height: 50,
//   },
// });
export default DefaultButton;
