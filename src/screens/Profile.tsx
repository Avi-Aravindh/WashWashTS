import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { CustomBackButton } from '../components';
import { createStyles } from '../styles';
import withAppContext from '../context/withAppContext';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { OTPModal } from '../screens';
import { Address } from '../context/AppProvider';
import { colors } from '../styles/BaseStyles';

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

let allAddresses: Address[] = [
  {
    addressLine: 'Test1',
    city: 'As',
    doorNumber: '5',
    floor: '5',
    postCode: '72212',
  },
  {
    addressLine: 'Test2',
    city: 'As',
    doorNumber: '5',
    floor: '5',
    postCode: '72211',
  },
  {
    addressLine: 'Test3',
    city: 'As',
    doorNumber: '5',
    floor: '5',
    postCode: '72212',
  },
  {},
];

interface ProfileProps {
  props: any;
}

interface ProfileState {
  index: number;
  showModal: boolean;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      showModal: !props.context.verified,
    };
    this.renderAddress = this.renderAddress.bind(this);
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
        {item.addressLine && (
          <View style={{ marginLeft: 30 }}>
            <Text style={styles.addressNameHeader}>
              {this.props.context.userProfile.firstName +
                ' ' +
                this.props.context.userProfile.lastName}
            </Text>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.addressDetails}>
                {item.addressLine + ' ' + item.floor}
              </Text>
              <Text style={styles.addressDetails}>
                {item.postCode + ' ' + item.city}
              </Text>
            </View>
          </View>
        )}
        {!item.addressLine && (
          <TouchableOpacity style={{ height: '100%', width: '100%' }}>
            <View
              style={{
                backgroundColor: colors.PRIMARY,
                height: '70%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.primaryButtonText}>Add new address</Text>
            </View>
          </TouchableOpacity>
        )}
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
        {this.props.context.verified && (
          <View>
            <View
              style={{
                width: width,
                alignItems: 'center',
                marginTop: height * 0.03,
              }}
            >
              <Text style={styles.userNameHeader}>
                {this.props.context.userProfile.firstName}
                {' ' + this.props.context.userProfile.lastName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({ showModal: true });
                  }}
                >
                  <Text style={styles.userInfoSubText}>
                    {this.props.context.phoneNumber}
                  </Text>

                  <Image
                    source={require('../../assets/pencil.png')}
                    style={{ marginLeft: 5, height: 10, width: 10 }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
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
                data={allAddresses}
                renderItem={this.renderAddress}
                itemWidth={width * 0.8}
                sliderWidth={width}
                autoplay={false}
                autoplayInterval={5000}
                onSnapToItem={(index) => this.setState({ index: index })}
              />
            </View>
          </View>
        )}
        <OTPModal
          isVisible={this.state.showModal}
          hideModal={() => this.setState({ showModal: false })}
        />
      </ScrollView>
    );
  }
}

export default withAppContext(Profile);
