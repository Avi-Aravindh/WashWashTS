import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const PostCode = () => {
  const [postCode, setPostCode] = useState<Number>();
  return (
    <View>
      <Text>post code screen</Text>
    </View>
  );
};

export default PostCode;
