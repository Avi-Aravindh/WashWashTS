import React, { FunctionComponent, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStyles } from '../styles';

interface ItemCounterProps {
  initialCount: Number;
  onChange: (newValue: Number) => void;
}

const styles = createStyles();

const ItemCounter: FunctionComponent<ItemCounterProps> = ({
  initialCount,
  onChange,
}) => {
  const [value, setValue] = useState(initialCount.toString());

  useEffect(() => {
    setValue(initialCount.toString());
  }, [initialCount]);

  const setNewValue = (newValue) => {
    if (newValue < 0 || undefined || null) {
      newValue = 0;
    }
    setValue(newValue);
    onChange(Number(newValue));
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.counterButton}
        onPress={() => setNewValue(String(value - 1))}
      >
        <Text style={styles.counterButtonText}>-</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.inputText, { width: 50 }]}
        value={String(value)}
        onChange={(e) => setNewValue(e.nativeEvent.text)}
        keyboardType='numeric'
        enablesReturnKeyAutomatically={true}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.counterButton}
        onPress={() => setNewValue(String(Number(value) + 1))}
      >
        <Text style={styles.counterButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCounter;
