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
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CustomBackButton, Stepper, Button } from '../components';
import { createStyles } from '../styles';
import { colors } from '../styles/BaseStyles';
import { fetchAPI } from '../utilities/APIHelpers';
import { App_Settings } from '../constants';
import AppContext from '../context/AppContext';
import { TimeSlots } from '../context/AppProvider';
const styles = createStyles();
const { width, height } = Dimensions.get('window');

const Pickup = () => {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeSlots, setTimeSlots] = useState<TimeSlots[]>([]);

  let url = `${App_Settings.API_GET_TIMESLOTS}?zipcode=${appContext.postCode}`;

  useEffect(() => {
    fetchAPI(url)
      .then((res) => {
        setTimeSlots(res.results);
        setLoading(false);
      })
      .catch((err) => console.log('pickup slots fetch error', err));
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

  const confirmOrder = () => {
    appContext.createOrder();
    navigation.navigate('confirmation');
  };

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

        {loading && (
          <View style={{ marginTop: 30 }}>
            <ActivityIndicator />
          </View>
        )}
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
          }}
          style={{
            marginTop: 30,
            indicatorStyle: 'white',
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {timeSlots &&
            timeSlots.map((timeSlot) => (
              <View
                style={{
                  width: width * 0.34,
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.counterButtonText}>{timeSlot.day}</Text>
                  <Text style={{ marginTop: 10 }}>{timeSlot.date}</Text>

                  <View style={{}}>
                    {timeSlot.timeSlots.map((slot) => (
                      <TouchableOpacity
                        style={[
                          {
                            height: 50,
                            width: width * 0.25,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: colors.SEPARATOR_BORDER,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: height * 0.05,
                            shadowOffset: {
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.19,
                            shadowRadius: 4,
                            elevation: 7,
                          },
                          appContext.pickupSlot &&
                          timeSlot.date === appContext.pickupSlot.date &&
                          slot === appContext.pickupSlot.timeSlot
                            ? { backgroundColor: colors.PRIMARY }
                            : '',

                          appContext.pickupSlot &&
                          timeSlot.date === appContext.pickupSlot.date &&
                          slot === appContext.pickupSlot.timeSlot
                            ? { borderColor: colors.PRIMARY }
                            : '',
                        ]}
                        onPress={() => {
                          appContext.updatePickupSlot({
                            day: timeSlot.day,
                            date: timeSlot.date,
                            timeSlot: slot,
                          });
                        }}
                      >
                        <Text>{slot}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
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
            disabled={!appContext.pickupSlot}
            onPress={() => confirmOrder()}
          />
        </View>
      </View>
    </View>
  );
};

export default Pickup;
