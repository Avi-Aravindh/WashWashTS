import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { CustomBackButton } from '../components';
import { createStyles } from '../styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const styles = createStyles();

const { width, height } = Dimensions.get('window');

let customerInfo = {
  Id: 9,
  Name: 'Vivek',
  lastName: 'Palanisamy',
  Phone: '9894300131',
  addresses: [
    {
      Name: 'Vivek',
      lastName: 'Palanisamy',
      Address: 'Test address',
      City: 'Uppsala',
      Zipcode: '75212',
      Floor_no: '12',
      Entrance_number: '123',
      Door_code1: '1234',
      Door_code2: '12345',
    },
    {
      Name: 'Vivek',
      lastName: 'Palanisamy',
      Address: 'Test address',
      City: 'Uppsala',
      Zipcode: '75212',
      Floor_no: '12',
      Entrance_number: '123',
      Door_code1: '1234',
      Door_code2: '12345',
    },
  ],
  Email: 'vivekpalanisamy@gmail.com',
  Delivery: '',
};

let cards = [
  {
    id: 'card_1CoXQFFZcwsjBN0lGnI6ioqd',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'MasterCard',
    country: 'US',
    customer: 'cus_CxhzAepiMG2eH1',
    cvc_check: 'pass',
    dynamic_last4: null,
    exp_month: 12,
    exp_year: 2020,
    fingerprint: 'CzaVU1OyW7uHxmt6',
    funding: 'credit',
    last4: '4444',
    metadata: [],
    name: 'undefined',
    tokenization_method: null,
  },
  {
    id: 'card_1HIGvqFZcwsjBN0lL5sYOYfN',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'Visa',
    country: 'US',
    customer: 'cus_CxhzAepiMG2eH1',
    cvc_check: 'pass',
    dynamic_last4: null,
    exp_month: 12,
    exp_year: 2020,
    fingerprint: 'qP8h0I2hvhD7CHpb',
    funding: 'credit',
    last4: '1111',
    metadata: [],
    name: 'Vivek',
    tokenization_method: null,
  },
  {
    id: 'card_1CvgLuFZcwsjBN0lFTvZklKz',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'Visa',
    country: 'US',
    customer: 'cus_CxhzAepiMG2eH1',
    cvc_check: 'pass',
    dynamic_last4: null,
    exp_month: 12,
    exp_year: 2020,
    fingerprint: 'udHVhLBRSu24mXJn',
    funding: 'credit',
    last4: '4242',
    metadata: [],
    name: 'undefined',
    tokenization_method: null,
  },
];
interface ProfileProps {
  props: any;
}

interface ProfileState {
  index: number;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
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
      headerTitle: () => <Text style={styles.headerText}>PROFIL</Text>,
    });
  }

  renderAddress({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginTop: height * 0.025,
          height: height * 0.25,
          // borderWidth: 0.2,
          borderRadius: 10,
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
        }}
      >
        <View style={{ marginLeft: 30 }}>
          <Text style={styles.addressNameHeader}>
            {item.Name + ' ' + item.lastName}
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.addressDetails}>
              {item.Address + ' ' + item.Floor_no}
            </Text>
            <Text style={styles.addressDetails}>
              {item.Zipcode + ' ' + item.City}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderCards({ item, index }) {
    let imageSource =
      item.brandName === 'MasterCard'
        ? '../../assets/masterCardLogo.png'
        : item.brandName === 'Visa'
        ? '../../assets/visaLogo.png'
        : '../../assets/krLogo.png';
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginTop: height * 0.025,
          height: height * 0.25,
          // borderWidth: 0.2,
          borderRadius: 10,
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
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'flex-end',
            paddingRight: 20,
          }}
        >
          <ImageBackground
            key={1}
            source={{ uri: imageSource }}
            style={{
              width: 100,
              height: 70,
              opacity: 0.2,
            }}
            resizeMode='contain'
          ></ImageBackground>
        </View>
        <View style={{ marginLeft: 30 }}>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.cardNumbers}>
              {'XXXX - XXXX - XXXX - ' + item.last4}
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 30,
                alignItems: 'center',
              }}
            >
              <Text style={styles.cardHeader}>Ägare</Text>
              <Text style={styles.cardHeader}>Utgångsdatum</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 30,
                alignItems: 'center',
              }}
            >
              <Text style={styles.cardDetails}>{item.name}</Text>
              <Text style={styles.cardDetails}>
                {item.exp_month + ' ' + item.exp_year}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.pageContainer}>
        <View
          style={{
            width: width,
            alignItems: 'center',
            marginTop: height * 0.03,
          }}
        >
          <Text style={styles.userNameHeader}>Jonas Storm</Text>
          <Text style={styles.userInfoSubText}>+1 2015656670</Text>
        </View>
        <View
          style={{
            width: width,
            alignItems: 'flex-start',
            paddingLeft: width * 0,
            marginTop: height * 0.03,
          }}
        >
          <Text style={{ marginLeft: width * 0.1 }}>Adress</Text>
          <Carousel
            layout={'default'}
            useScrollView={true}
            data={customerInfo.addresses}
            renderItem={this.renderAddress}
            itemWidth={width * 0.8}
            sliderWidth={width}
            autoplay={false}
            autoplayInterval={5000}
            onSnapToItem={(index) => this.setState({ index: index })}
          />
        </View>
        <View
          style={{
            width: width,
            alignItems: 'flex-start',
            paddingLeft: width * 0,
            marginTop: height * 0.03,
          }}
        >
          <Text style={{ marginLeft: width * 0.1 }}>Betalmedel</Text>
          <Carousel
            layout={'default'}
            useScrollView={true}
            data={cards}
            renderItem={this.renderCards}
            itemWidth={width * 0.8}
            sliderWidth={width}
            autoplay={false}
            autoplayInterval={5000}
            onSnapToItem={(index) => this.setState({ index: index })}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Profile;
