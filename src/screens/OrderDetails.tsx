import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { CircularProgress } from '../components';
import { CustomBackButton } from '../components';
import { createStyles } from '../styles';

const styles = createStyles();

const { width, height } = Dimensions.get('window');

let detailsFromAPI = {
  errorCode: 0,
  results: [
    {
      Title: 'Order mottagen',
      created_date: '05:18,03 August 2018',
    },
  ],
  percent: 74,
  dayCount: 2,
  status: 0,
};

let orderInformation = {
  errorCode: 0,
  message: 'Success',
  results: [
    {
      Id: 32,
      Name: 'white clothes  Wash and Fold',
      Price: 50,
      TotalPrice: '100.00',
      Item_id: 29,
      Quantity: 2,
      Created_date: 'Apr 30, 2019 00:00',
    },
    {
      Id: 33,
      Name: 'Rock ',
      Price: 240,
      TotalPrice: '480.00',
      Item_id: 12,
      Quantity: 2,
      Created_date: 'Apr 30, 2019 00:00',
    },
  ],
  totalItems: 4,
  sumPrice: 580,
  Order_id: 'MjM',
  customer_details: {
    Id: 9,
    Name: 'Vivek',
    Phone: '9894300131',
    Address: 'Test address',
    City: 'Uppsala',
    Zipcode: '75212',
    Floor_no: '12',
    Entrance_number: '123',
    Door_code1: '1234',
    Door_code2: '12345',
    Email: 'vivekpalanisamy@gmail.com',
  },
};

const OrderDetails = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerLeft: () => <CustomBackButton />,
      headerTitle: () => (
        <Text style={styles.headerText}>DINA BESTÄLLNINGAR</Text>
      ),
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={[styles.checkoutTextContainer, { height: 100, marginTop: 20 }]}
      >
        <TouchableOpacity
          onPress={() => {}}
          style={{ width: width * 0.2, height: width * 0.2 }}
        >
          {/* <Image
            source={{ uri: item.itemImage }}
            style={[styles.detailsImage, { borderRadius: 10 }]}
          /> */}
        </TouchableOpacity>
        <View style={{ width: width * 0.01 }} />
        <View style={{ width: width * 0.65 }}>
          <Text style={styles.descriptionText}>{item.Name} </Text>
          <Text style={styles.inputLabelText}>{item.Price} </Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text>{item.Quantity}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.pageContainer}>
      <CircularProgress
        progress={detailsFromAPI.percent}
        dayCount={detailsFromAPI.dayCount}
      />
      <Text>Needs API & Design. Static list for now</Text>

      <View
        style={{
          flexDirection: 'row',
          marginLeft: width * 0.05,
          width: width * 0.5,
          marginTop: height * 0.02,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text>{detailsFromAPI.results[0].Title}</Text>
      </View>

      <View style={{ marginTop: height * 0.05 }}>
        <View style={styles.checkoutTextContainer}>
          <Text style={[styles.inputLabelText, { fontSize: 13 }]}>
            Antal varor
          </Text>
          <Text style={[styles.inputLabelText, { fontSize: 13 }]}>
            {orderInformation.results.length}
          </Text>
        </View>

        <View style={styles.checkoutTextContainer}>
          <Text style={[styles.cartCostHeaderText]}>Kostnad</Text>
          <Text style={[styles.cartCostHeaderText]}>
            {orderInformation.sumPrice}
          </Text>
        </View>
        <View style={{ height: height * 0.45, marginTop: 20 }}>
          <FlatList
            data={orderInformation.results}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderDetails;
