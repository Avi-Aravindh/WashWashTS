import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CustomBackButton } from '../components';

import { createStyles } from '../styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { fetchAPI } from '../utilities/APIHelpers';
import { App_Settings } from '../constants';
const styles = createStyles();

const { width, height } = Dimensions.get('window');

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

    let url = `${App_Settings.API_GET_ALL_ORDERS}?phonenumber=442019991234`;

    fetchAPI(url).then((res) => {
      console.log('orders', res.results);
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
          {/* <FlatList
            data={listAllOrders.results}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.Id.toString()}
          /> */}
        </View>
      </View>
    );
  }
}

export default ExistingOrders;
