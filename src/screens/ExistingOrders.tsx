import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CustomBackButton } from '../components';

import { createStyles } from '../styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
const styles = createStyles();

const { width, height } = Dimensions.get('window');

let listAllOrders = {
  errorCode: 0,
  message: 'Success',
  results: [
    {
      Id: 24,
      Order_id: 'MjQ',
      Created_date: 'Apr 30, 2019 10:24',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 23,
      Order_id: 'MjM',
      Created_date: 'Apr 30, 2019 10:23',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 22,
      Order_id: 'MjI',
      Created_date: 'Aug 03, 2018 05:18',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 21,
      Order_id: 'MjE',
      Created_date: 'Aug 03, 2018 05:15',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 19,
      Order_id: 'MTk',
      Created_date: 'Jul 24, 2018 08:03',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 18,
      Order_id: 'MTg',
      Created_date: 'Jul 24, 2018 07:33',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 17,
      Order_id: 'MTc',
      Created_date: 'Jul 24, 2018 07:18',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 16,
      Order_id: 'MTY',
      Created_date: 'Jul 24, 2018 07:14',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 15,
      Order_id: 'MTU',
      Created_date: 'Jul 23, 2018 10:24',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 14,
      Order_id: 'MTQ',
      Created_date: 'Jul 23, 2018 10:20',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 13,
      Order_id: 'MTM',
      Created_date: 'Jul 18, 2018 04:32',
      totalItems: 4,
      sumPrice: '480.00',
    },
    {
      Id: 12,
      Order_id: 'MTI',
      Created_date: 'Jul 16, 2018 16:11',
      totalItems: 4,
      sumPrice: '480.00',
    },
  ],
};

class ExistingOrders extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
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
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.push('orderDetails', { item: item })
          }
          style={{
            borderWidth: 0.2,
            backgroundColor: 'white',
            borderRadius: 2,
            borderColor: '#707070',
            shadowColor: '#707070',
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 10,
            marginBottom: 10,
            paddingLeft: 10,
            paddingTop: 10,
          }}
        >
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={styles.secondaryButtonText}>Order Number: </Text>
            <Text>{item.Id}</Text>
          </View>
          <Text style={{ flexDirection: 'row', marginBottom: 10 }}>
            {item.Created_date}
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.secondaryButtonText}>ANTAL ARTIKLAR: </Text>

              <Text style={{ flexDirection: 'row', marginRight: 10 }}>
                {item.totalItems}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.secondaryButtonText}>TOTALBELOPP: </Text>

              <Text style={{ flexDirection: 'row', marginBottom: 10 }}>
                {item.sumPrice}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.pageContainer}>
        <Text>Needs API & Design. Static list for now</Text>

        <View
          style={{
            width: width * 0.9,
            marginLeft: width * 0.05,
            marginTop: height * 0.05,
          }}
        >
          <FlatList
            data={listAllOrders.results}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.Id.toString()}
          />
        </View>
      </View>
    );
  }
}

export default ExistingOrders;
