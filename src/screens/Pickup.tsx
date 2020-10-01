import React, {
  useContext,
  useEffect,
  useState,
  FunctionComponent,
} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CustomBackButton, Stepper, Button } from '../components';
import { createStyles } from '../styles';
import { colors } from '../styles/BaseStyles';
import { fetchAPI } from '../utilities/APIHelpers';
import { App_Settings } from '../constants';
import AppContext from '../context/AppContext';
import { TimeSlot } from '../context/AppProvider';
const styles = createStyles();
const { width, height } = Dimensions.get('window');

let tempArray = [
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 1,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '01-Oct-2020',
    Id: 2,
    Postcode: 72212,
    Time: '09:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '03-Oct-2020',
    Id: 3,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '05-Oct-2020',
    Id: 4,
    Postcode: 72212,
    Time: '08:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '30-Sep-2020',
    Id: 5,
    Postcode: 72212,
    Time: '09:00',
    Zone: 3,
  },
  {
    City: 'Uppsala',
    Date: '02-Oct-2020',
    Id: 7,
    Postcode: 72212,
    Time: '10:00',
    Zone: 3,
  },
];

const Pickup = () => {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [filteredDates, setFilteredDates] = useState();
  const [filteredSlots, setFilteredSlots] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>();

  let url = `${App_Settings.API_GET_TIMESLOTS}?postCode=${appContext.postCode}`;

  useEffect(() => {
    fetchAPI(url).then((res) => {
      setTimeSlots(res.results);
      // setTimeSlots(tempArray);
      setSelectedDate(res.results[0].Date);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerLeft: () => <CustomBackButton />,
      headerTitle: () => <Text style={styles.headerText}>LEVERANS</Text>,
    });
  }, [navigation]);

  useEffect(() => {
    let dates = timeSlots.map((timeSlot) => timeSlot.Date);
    dates = [...new Set(dates)];
    dates.sort((a, b) => new Date(a) > new Date(b));
    setFilteredDates(dates);
  }, [timeSlots]);

  useEffect(() => {
    setFilteredSlots(
      timeSlots.filter((timeSlot) => timeSlot.Date === selectedDate)
    );
  }, [timeSlots, selectedDate]);

  return (
    <View style={styles.pageContainer}>
      <Stepper totalPages={4} currentPage={4} />
      <View style={{ marginTop: height * 0.05 }}>
        <View
          style={{
            width: width * 0.7,
            marginLeft: width * 0.15,
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              styles.instructionText,
              { textAlign: 'center', lineHeight: 35 },
            ]}
          >
            När kan vi hämta
          </Text>
        </View>
        <View
          style={{
            height: height * 0.1,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              paddingLeft: 10,
              backgroundColor: '#fff',
              marginTop: 20,
              marginBottom: 10,
            }}
            horizontal={true}
            indicatorStyle={'white'}
          >
            {filteredDates &&
              filteredDates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedDate(date);
                  }}
                  style={{
                    marginRight: 15,
                    height: 30,
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderRadius: 50,
                    }}
                  >
                    <Text
                      style={[
                        styles.overlayButtonText,
                        selectedDate && date === selectedDate
                          ? { color: colors.PRIMARY, fontWeight: 'bold' }
                          : '',
                      ]}
                    >
                      {date}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingBottom: 10,
            width: width * 0.9,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: width * 0.075,
            backgroundColor: '#fff',
          }}
          style={{ height: height * 0.4 }}
          indicatorStyle={'white'}
        >
          {filteredSlots &&
            filteredSlots.map((timeSlot, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedTimeSlot(timeSlot);
                }}
                style={{
                  marginRight: width * 0.05,
                  marginTop: 20,

                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.19,
                  shadowRadius: 4,
                  elevation: 7,
                }}
              >
                <View
                  style={[
                    {
                      height: 50,
                      width: width * 0.25,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: colors.SEPARATOR_BORDER,
                    },

                    selectedTimeSlot && timeSlot === selectedTimeSlot
                      ? { backgroundColor: colors.PRIMARY }
                      : '',

                    selectedTimeSlot && timeSlot === selectedTimeSlot
                      ? { borderColor: colors.PRIMARY }
                      : '',
                  ]}
                >
                  <Text style={[styles.overlayButtonText]}>
                    {timeSlot.Time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            marginTop: height * 0.6,
            marginLeft: width * 0.5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            text='Slutför 😊'
            type='primary'
            onPress={() => navigation.navigate('confirmation')}
          />
        </View>
      </View>
    </View>
  );
};

export default Pickup;
