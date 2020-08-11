import React, { FunctionComponent } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { createStyles } from '../styles';

interface StepperProps {
  totalPages: number;
  currentPage: number;
}

const styles = createStyles();

const Stepper: FunctionComponent<StepperProps> = ({
  totalPages,
  currentPage,
}) => {
  return (
    <View style={styles.stepperContainer}>
      {[...Array(totalPages)].map((item, index) => (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flexDirection: 'row', alignItems: 'center' }}
          key={index}
        >
          <View
            key={index}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: currentPage - 1 == index ? 30 : undefined,
              height: 30,
              borderRadius: 50,
              backgroundColor: currentPage - 1 == index ? '#45DDE6' : undefined,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <View style={styles.stepperSeparator} />
          </View>
          {index !== totalPages - 1 && <View style={styles.stepperDot} />}
        </View>
      ))}
    </View>
  );
};

export default Stepper;
