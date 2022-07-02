/** @format */

import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  Button,
  Alert,
  Linking,
} from "react-native";
import axios from "axios";
import Button1 from "../../../components/GradientButton";
import Modal from "react-native-modal";
import CustomText from "../../../components/Text";
import Headers1 from "../../../components/Headers1";
import CountDown from "react-native-countdown-component";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import TrackPlayer from "react-native-track-player";
// import auth from "@react-native-firebase/auth";
//logo
import {
  location,
  currentlocation,
  carmove,
  Persons,
  message,
  caricon,
} from "../../../assets";
import { GradientButton } from "../../../components/GradientButton";
//redux
import {
  cancelride,
  paymentfromuserbalance,
  startmyRide,
  viewmyride,
  acceptride,
  updatetoken,
  apppushnotification,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge } from "react-native-elements";

import fonts from "../../../theme/fonts";

import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import PolylineDirection from "react-native-maps/polyline-direction";
import PolylineDirection from "@react-native-maps/polyline-direction";
import Geolocation from "@react-native-community/geolocation";
import messaging from "@react-native-firebase/messaging";

import SelectDropdown from "react-native-select-dropdown";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";
import database from "@react-native-firebase/database";

const roomRef = database().ref("rooms");

const DriverViewRequest = ({
  cancelride,
  route,
  paymentfromuserbalance,
  selectedLanguages,
  viewmyride,
  user,
  acceptride,
  trip_id,
  updatetoken,
  translation,
  apppushnotification,
}) => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [loading, setloading] = useState(true);
  const [Data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const [showAlertuser, setshowAlertuser] = useState(false);
  const [buttonshow, setbuttonshow] = useState("Accepted");

  const [isModalVisible, setModalVisible] = useState(false);

  //////messaging code start

  console.log("myalltranslations", translation);

  const checkkey = async (item) => {
    try {
      roomRef.on("value", (snapshot) => {
        let roomsFB = [];
        snapshot.forEach((element) => {
          roomsFB.push({
            key: element.key,
            send_uid: element.val().send_uid,
            recv_uid: element.val().recv_uid,
            created_at: element.val().created_at,
            trip_id: element.val().trip_id,
          });
        });

        const res = roomsFB?.some((element) => {
          return (
            (element.recv_uid == user.u_id &&
              element.send_uid == Data[0].u_id &&
              element.trip_id == Data[0].trip_id) ||
            (element.recv_uid == Data[0].u_id &&
              element.send_uid == user.u_id &&
              element.trip_id == Data[0].trip_id)
          );
        });
        console.log(res);

        if (res) {
          const index = roomsFB.find((element) => {
            return (
              (element.recv_uid == user.u_id &&
                element.send_uid == Data[0].u_id &&
                element.trip_id == Data[0].trip_id) ||
              (element.recv_uid == Data[0].u_id &&
                element.send_uid == user.u_id &&
                element.trip_id == Data[0].trip_id)
            );
          });

          navigation.navigate("chatting", {
            messagekey: `messages/${index.key}`,
            receiverid: Data[0].u_id,
            dname: Data[0].name,
            screen: "driver",
            devicetoken: Data[0].device_token,
          });
        } else {
          addRoom(item);
        }
      });
    } catch (err) {
      console.log(err);
    }

    const addRoom = async (item) => {
      try {
        await roomRef.push({
          send_uid: user.u_id,
          recv_uid: Data[0].u_id,
          created_at: new Date().getTime(),
          trip_id: Data[0].trip_id,
        });
      } catch (err) {
        alert(err);
      }
    };
  };

  const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    //   // Add a track to the queue
    await TrackPlayer.add({
      id: "trackId",
      url: require("../../../assets/images/beep.mp3"),
      title: "Track Title",
      artist: "Track Artist",
      artwork: "https://picsum.photos/300",
    });

    // Start playing it
    await TrackPlayer.play();
  };

  const cancelmodel = async (item) => {
    setModalVisible(false);
  };
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);

  const [date, setdate] = useState("");
  const [destination, setdestination] = useState("");
  const [destination1, setdestination1] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const formData = new FormData();
        formData.append("u_id", user.u_id);
        const res = await viewmyride(formData);
        console.log("formDataformData", res);
        if (res.data.status == true) {
          if (res.data.data[0].ride_status == "Completed") {
            navigation.navigate("Map");
          }

          setbuttonshow("Accepted");

          //////////////

          let fromaddres = {
            latitude: parseFloat(res.data.data[0].trip_from_lat),
            longitude: parseFloat(res.data.data[0].trip_from_long),
          };
          setdestination(fromaddres);

          let toaddress = {
            latitude: parseFloat(res.data.data[0].trip_to_lat),
            longitude: parseFloat(res.data.data[0].trip_to_long),
          };
          setdestination1(toaddress);
          //////////////

          setData(res.data.data);
          setloading(false);
        } else {
          setloading(false);
        }
      })();
    }, [date])
  );

  const acceptridehandle = async (id) => {
    setloading(true);
    const formData = new FormData();
    formData.append("status", id);
    formData.append("trip_id", Data[0].trip_id);

    const res = await acceptride(formData, Data[0].trip_id, id, navigation);

    if (res.data.status == true) {
      if (id == "declined") {
        navigation.navigate("Map");
      } else if (id == "complete") {
        navigation.navigate("RideAmmount", { amount: res.data.data });
        return false;
      }
      setdate(Math.random());
      setloading(false);
    } else if (res.data.status == 0) {
      //trip cancelled
      navigation.navigate("Map");
      alert(res.data.message);
    } else {
      setloading(false);
    }
  };

  const cancelride1 = async (id) => {
    setloading(true);
    const formData = new FormData();
    formData.append("u_id", user.u_id);
    formData.append("trip_id", id);
    formData.append("status", "cancel");
    const res = await cancelride(formData);
    console.log("myres", res);
    if (res.data.status == 0) {
      setloading(false);
      navigation.navigate("Map");
      alert(res.data.message);
    } else {
      setloading(false);
      alert(res.data.message);
    }
  };
  const cancelridenow = async (id) => {
    Alert.alert("Alert", translation[328][selectedLanguages], [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          cancelride1(id);
        },
      },
    ]);
  };

  // const latitude = "37.7816";
  // const longitude = "122.4156";
  // const label = "Civic Center";

  //////open gogle map code hare
  const cashHandle = async (item) => {
    setModalVisible(false);

    navigation.navigate("GetPayment", {
      tripId: Data[0].trip_id,
      uid: Data[0].u_id,
    });
  };

  const handlecardd = async (item) => {
    setModalVisible(false);
    setShowAlert(false);
    navigation.navigate("Map");
  };

  const cardhHandle = async (item) => {
    setModalVisible(false);

    navigation.navigate("BillingPayment", {
      payment: Data[0].ride_actual_payment,
      screen: "ride",
      receiverid: Data[0].u_id,
      trpid: Data[0].trip_id,
    });
  };

  const yespress = async (id) => {
    const formData = new FormData();
    formData.append("u_id", Data[0].u_id);
    formData.append("amount", Data[0].ride_actual_payment);
    formData.append("trip_id", Data[0].trip_id);

    const res = await paymentfromuserbalance(formData);
    console.log("pay_by_userblnc", res, formData);
    if (res.data.status == true) {
      navigation.navigate("Map");
      setshowAlertuser(false);
      setModalVisible(false);
    } else {
      setMsg(res.data.message);
      setShowAlert1(true);
      setshowAlertuser(false);
    }
  };

  const cancelpress = async (id) => {
    setshowAlertuser(false);
  };

  const userbalance = async (item) => {
    setshowAlertuser(true);
    setMsg("Are you sure you want to proceed with user balance?");
  };

  const openmap = async (item) => {
    //  openMap({start: "My Location",end:'dhok kala khan',navigate:true });
    if (Data[0].ride_status == "Accepted") {
      const url = Platform.select({
        ios:
          "maps:" +
          Data[0].trip_from_lat +
          "," +
          Data[0].trip_from_long +
          "?q=" +
          Data[0].trip_from_address,
        android:
          "geo:" +
          Data[0].trip_from_lat +
          "," +
          Data[0].trip_from_long +
          "?q=" +
          Data[0].trip_from_address,
      });
      Linking.openURL(url);
    } else if (Data[0].ride_status == "Started") {
      const url = Platform.select({
        ios:
          "maps:" +
          Data[0].trip_to_lat +
          "," +
          Data[0].trip_to_long +
          "?q=" +
          Data[0].trip_to_address,
        android:
          "geo:" +
          Data[0].trip_to_lat +
          "," +
          Data[0].trip_to_long +
          "?q=" +
          Data[0].trip_to_address,
      });
      Linking.openURL(url);
    }
  };

  const [currentLongitude, setCurrentLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");

  Geolocation.getCurrentPosition(
    //Will give you the current location
    (position) => {
      //getting the Longitude from the location json
      const currentLongitude = JSON.stringify(position.coords.longitude);

      //getting the Latitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);

      //Setting Longitude state

      setCurrentLongitude(currentLongitude);

      //Setting Longitude state
      setCurrentLatitude(currentLatitude);
    }
  );

  const lati = parseFloat(currentLatitude);
  const longi = parseFloat(currentLongitude);
  let origin = {
    latitude: lati,
    longitude: longi,
  };

  const stopcounter = async (id) => {
    setbuttonshow("start");
    const pushdata = [];

    pushdata["scree_name"] = "Map";
    pushdata["body"] = translation[342][selectedLanguages];
    pushdata["token"] = user.device_token;

    pushdata["messagekey"] = "";
    pushdata["receiverid"] = "";
    pushdata["screen"] = `Map`;
    pushdata["dname"] = "";
    pushdata["device_token"] = user.device_token;

    console.log("mydata===>", pushdata);

    const res = await apppushnotification(pushdata);
  };

  useFocusEffect(
    React.useCallback(() => {
      const api_interval = setInterval(() => {
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            //getting the Longitude from the location json
            const currentLongitude = JSON.stringify(position.coords.longitude);
            // setCurrentLongitude(currentLongitude);

            //getting the Latitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            // setCurrentLatitude(currentLatitude);
            (async () => {
              const fcmToken = await messaging().getToken();
              const fomData = new FormData();
              fomData.append("lat", currentLatitude);
              fomData.append("long", currentLongitude);

              fomData.append("u_id", user.u_id);
              fomData.append("token", fcmToken);
              fomData.append("trip_id", trip_id);
              fomData.append("selectedLanguages", selectedLanguages);
              const res = await updatetoken(fomData, navigation);

              console.log("api response from driver view request", res);

              if (res.data.status == true) {
              } else if (res.data.status == 2) {
                start();
                alert(res.data.message);
                navigation.navigate("Map");
              }
            })();
          }
        );
      }, 7000);
      return () => {
        clearInterval(api_interval);
      };
    }, [])
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}>
      <Headers1
        //  title='View Request'
        title={translation[78][selectedLanguages].trim()}
        scren={"false"}
      />
      <Loading visible={loading} />

      {loading == false && (
        <SafeAreaView>
          {showAlert && (
            <AlertModal
              heading={msg}
              button1={translation[185][selectedLanguages]}
              // button1="OK"
              button2={translation[99][selectedLanguages]}
              // button2="Cancel"
              onOkPress={() => {
                handlecardd();
              }}
              form='abc'
            />
          )}

          {showAlert1 && (
            <AlertModal
              heading={msg}
              button1={translation[185][selectedLanguages]}
              // button1="OK"
              button2={translation[99][selectedLanguages]}
              // button2="Cancel"
              onOkPress={() => {
                setShowAlert1(false);
              }}
              form='abc'
            />
          )}
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{
              width: "100%",
              height: 360,
            }}
            initialRegion={{
              latitude: parseFloat(currentLatitude),
              longitude: parseFloat(currentLongitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            // onRegionChangeComplete={(region) => setRegion(region)}
          >
            {(Data[0].ride_status == "unresponded" ||
              Data[0].ride_status == "Accepted") && (
              <Marker
                coordinate={{
                  latitude: parseFloat(Data[0].trip_from_lat),
                  longitude: parseFloat(Data[0].trip_from_long),
                }}
                pinColor={"red"} // any color
                title={"title"}
                description={"description"}
              />
            )}

            {Data[0].ride_status == "Started" && (
              <Marker
                coordinate={{
                  latitude: parseFloat(Data[0].trip_to_lat),
                  longitude: parseFloat(Data[0].trip_to_long),
                }}
                pinColor={"red"} // any color
                title={"title"}
                description={"description"}
              />
            )}
            {(Data[0].ride_status == "unresponded" ||
              Data[0].ride_status == "Accepted") && (
              <PolylineDirection
                origin={origin}
                destination={destination}
                strokeWidth={4}
                apiKey={API_KEY} // insert your API Key here
                strokeColor={colors.yellow}
                optimizeWaypoints={true}
              />
            )}
            {/* <Marker coordinate={origin} /> */}
            {(Data[0].ride_status == "unresponded" ||
              Data[0].ride_status == "Accepted") && (
              <Marker coordinate={origin}>
                {/* <Image
                  source={require("../../../assets/images/caricon.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode='contain'
                /> */}
              </Marker>
            )}
            {Data[0].ride_status == "Started" && (
              <PolylineDirection
                origin={destination}
                destination={destination1}
                strokeWidth={4}
                apiKey={API_KEY} // insert your API Key here
                strokeColor={colors.yellow}
                optimizeWaypoints={true}
              />
            )}
            {/* <Marker coordinate={origin} /> */}
            {Data[0].ride_status == "Started" && (
              <Marker coordinate={destination}>
                {/* <Image
                  source={require("../../../assets/images/caricon.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode='contain'
                /> */}
              </Marker>
            )}
          </MapView>

          <Modal isVisible={isModalVisible}>
            <View
              style={{
                backgroundColor: "#FBFBFB",
                borderRadius: 7,
                borderWidth: 1,
                height: "50%",
                width: "90%",
                margin: 20,
                flex: Platform.OS == "android" ? 0.5 : 0.5,
              }}>
              {/* <Entypo
            name='cross'
            color={colors.yellow}
            size={22}
            onPress={cancelmodel}
            style={{
              alignItems: "flex-end",
              alignSelf: "flex-end",
              padding: 10,
            }}
          /> */}
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: fonts.PoppinsBold,
                    color: colors.black,
                    textAlign: "center",
                    justifyContent: "center",
                    textAlignVertical: "center",
                    marginTop: "40%",
                  }}>
                  {translation[255][selectedLanguages]}
                  {/* How would you like to take the payment? */}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.PoppinsBold,
                    fontSize: 20,
                    textAlign: "center",
                  }}>
                  $ {Data[0].ride_actual_payment}
                </Text>
              </View>
              {user != null && (
                <View
                  style={{
                    borderWidth: 0,
                    flexDirection: "row",
                    marginTop: "10%",
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}>
                  {(user.payment_method_accept == "Cash" ||
                    user.payment_method_accept == "Both") && (
                    <View
                      style={{
                        flex: 1,
                        padding: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => cashHandle()}
                        style={{
                          backgroundColor: colors.yellow,
                          borderRadius: 7,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.black,
                            textAlign: "center",
                            justifyContent: "center",
                            textAlignVertical: "center",
                            paddingVertical: 12,
                          }}>
                          {translation[96][selectedLanguages]}
                          {/* Cash */}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {(user.payment_method_accept == "Card" ||
                    user.payment_method_accept == "Both") && (
                    <View
                      style={{
                        flex: 1,
                        padding: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => cardhHandle()}
                        style={{
                          backgroundColor: colors.yellow,
                          borderRadius: 7,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.black,
                            textAlign: "center",
                            justifyContent: "center",
                            textAlignVertical: "center",
                            paddingVertical: 12,
                          }}>
                          {translation[233][selectedLanguages]}
                          {/* Card */}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <View
                    style={{
                      flex: 1,
                      padding: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => userbalance()}
                      style={{
                        backgroundColor: colors.yellow,
                        borderRadius: 7,
                      }}>
                      {user.payment_method_accept == "Both" ? (
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.black,
                            textAlign: "center",
                            justifyContent: "center",
                            textAlignVertical: "center",

                            paddingVertical: 4,
                          }}>
                          {translation[234][selectedLanguages]}
                          {/* User Balance */}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 15,
                            color: colors.black,
                            textAlign: "center",
                            justifyContent: "center",
                            textAlignVertical: "center",

                            paddingVertical: 12,
                          }}>
                          {translation[234][selectedLanguages]}
                          {/* User Balance */}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </Modal>
          <View
            Style={{
              position: "absoulute",
              width: "100%",
              height: "60%",
            }}>
            <View
              style={{
                flexDirection: "row",
              }}>
              {Data != "" && (
                <View
                  style={{
                    height: 82,
                    width: 82,
                    marginLeft: 20,
                    marginTop: 30,
                    marginBottom: 10,
                    borderRadius: 100,
                  }}>
                  <Image
                    source={{
                      uri: Data[0].dp,
                    }}
                    resizeMode='cover'
                    style={{
                      height: 82,
                      width: 82,
                      borderRadius: 100,
                    }}
                  />
                </View>
              )}

              <View
                style={{
                  marginLeft: 15,
                  borderWidth: 0,
                  marginTop: 37,
                  marginRight: 15,
                  marginRight: 20,
                  flex: 1,
                }}>
                {Data != "" && (
                  <View
                    style={{
                      flexDirection: "row",
                    }}>
                    <Text
                      style={{
                        fontSize: 21,
                        flex: 1,
                        marginRight: 20,
                        fontWeight: "bold",
                        color: "black",
                        marginTop: 20,
                      }}>
                      {Data[0].name}
                    </Text>

                    {Data[0].ride_status == "Started" && (
                      <Text
                        style={{
                          fontSize: 21,
                          marginRight: 10,
                          fontWeight: "bold",
                          color: "black",
                          marginTop: 20,
                        }}>
                        ${Data[0].ride_expected_amount}
                      </Text>
                    )}
                    {Data[0].ride_status == "Accepted" && (
                      <View
                        style={{
                          borderWidth: 0,
                          borderRadius: 100 / 2,
                          height: 55,
                          width: 55,
                          backgroundColor: colors.yellow,
                          marginRight: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <TouchableOpacity onPress={() => checkkey()}>
                          <Image
                            source={message}
                            resizeMode='contain'
                            style={{
                              height: 28,
                              width: 28,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                  }}>
                  {Data[0].rating >= 1 ? (
                    <AntDesign name='star' color={colors.yellow} size={18} />
                  ) : (
                    <AntDesign name='staro' color={colors.yellow} size={18} />
                  )}
                  {Data[0].rating >= 2 ? (
                    <AntDesign name='star' color={colors.yellow} size={18} />
                  ) : (
                    <AntDesign name='staro' color={colors.yellow} size={18} />
                  )}
                  {Data[0].rating >= 3 ? (
                    <AntDesign name='star' color={colors.yellow} size={18} />
                  ) : (
                    <AntDesign name='staro' color={colors.yellow} size={18} />
                  )}
                  {Data[0].rating >= 4 ? (
                    <AntDesign name='star' color={colors.yellow} size={18} />
                  ) : (
                    <AntDesign name='staro' color={colors.yellow} size={18} />
                  )}
                  {Data[0].rating >= 5 ? (
                    <AntDesign name='star' color={colors.yellow} size={18} />
                  ) : (
                    <AntDesign name='staro' color={colors.yellow} size={18} />
                  )}
                  {Data != "" && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "black",
                        marginTop: 18,
                        marginLeft: -88,
                        fontFamily: fonts.PoppinsRegular,
                      }}>
                      {Data[0].distance}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingBottom: 20,
                shadowOpacity: 1,
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}>
                <Image
                  source={currentlocation}
                  resizeMode='contain'
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 20,
                    marginLeft: 20,
                    borderRadius: 100 / 2,
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "black",
                    marginLeft: 5,
                    marginTop: 17,
                    flex: 1,
                  }}>
                  {translation[80][selectedLanguages]}
                  {/* Pick up */}
                </Text>
                {Data != "" && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: "black",
                      marginTop: 45,
                      marginLeft: -90,
                      marginRight: -15,
                      flex: 1,
                      fontFamily: fonts.PoppinsRegular,
                    }}>
                    {Data[0].trip_from_address}
                  </Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}>
                <Image
                  source={carmove}
                  resizeMode='contain'
                  style={{
                    height: 50,
                    width: 120,
                    marginTop: 13,
                    marginLeft: 7,
                    borderRadius: 100 / 2,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}>
                <Image
                  source={location}
                  resizeMode='contain'
                  style={{
                    height: 26,
                    width: 28,
                    marginTop: 21,
                    borderRadius: 100 / 2,
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "black",
                    marginLeft: 2,
                    marginTop: 17,
                  }}>
                  {translation[81][selectedLanguages]}
                  {/* Drop off */}
                </Text>
                {Data != "" && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: "black",
                      marginTop: 45,
                      marginLeft: -80,
                      marginRight: 15,
                      flex: 1,
                      fontFamily: fonts.PoppinsRegular,
                    }}>
                    {Data[0].trip_to_address}
                  </Text>
                )}
              </View>
            </View>

            {/* {Data[0].ride_status == "Accepted" && ( */}
            <View
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.gray,
                  marginTop: 0,
                  fontFamily: fonts.PoppinsRegular,
                }}>
                {translation[235][selectedLanguages]}
                {/* Estimated fare */}
              </Text>

              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "black",
                }}>
                ${Data[0].ride_expected_amount}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.gray,
                  marginTop: 0,
                  fontFamily: fonts.PoppinsRegular,
                }}>
                {translation[329][selectedLanguages]}
                {/* Total Distance */}
              </Text>

              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "black",
                }}>
                {Data[0].total_distance}
              </Text>
            </View>
            {/* )} */}

            <View
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}>
              {Data[0].ride_status == "unresponded" && buttonshow != "start" && (
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 100 / 2,
                    borderColor: colors.yellow,
                    height: 80,
                    width: 80,
                    marginTop: 10,
                  }}>
                  {buttonshow != "start" && (
                    <CountDown
                      size={30}
                      until={Data[0].time}
                      digitStyle={{
                        borderWidth: 0,
                      }}
                      digitTxtStyle={{
                        color: colors.black,
                      }}
                      onFinish={() => stopcounter()}
                      // separatorStyle={{color: colors.yellow}}
                      timeToShow={["S"]}
                      timeLabels={{
                        s: null,
                      }}
                    />
                  )}
                </View>
              )}
            </View>

            <View
              style={{
                flex: 0,
                marginLeft: 20,
                marginRight: 20,
              }}>
              {Data[0].ride_status == "Accepted" && (
                <TouchableOpacity
                  onPress={() => acceptridehandle("Started")}
                  style={{
                    backgroundColor: colors.yellow,
                    borderRadius: 7,
                    marginTop: 20,
                    height: 40,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.black,
                      textAlign: "center",
                      justifyContent: "center",
                      textAlignVertical: "center",
                      marginTop: 10,
                    }}>
                    {translation[236][selectedLanguages]}
                    {/* Start ride */}
                  </Text>
                </TouchableOpacity>
              )}

              {Data[0].ride_status == "Accepted" && (
                <Button
                  onPress={() => cancelridenow(Data[0].trip_id)}
                  title={translation[327][selectedLanguages]}
                  color='red'
                  style={{ backgroundColor: "red" }}
                />
              )}

              {Data[0].ride_status == "Expired" && (
                <View
                  style={{
                    backgroundColor: colors.black,
                    borderRadius: 7,
                    marginTop: -20,
                    height: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.white,
                      textAlign: "center",
                      justifyContent: "center",
                      textAlignVertical: "center",
                      marginTop: 10,
                    }}>
                    {translation[237][selectedLanguages]}
                    {/* Trip Expired */}
                  </Text>
                </View>
              )}
              {Data[0].ride_status == "Started" && (
                <TouchableOpacity
                  onPress={() => acceptridehandle("complete")}
                  style={{
                    backgroundColor: colors.black,
                    borderRadius: 7,
                    marginTop: 20,
                    height: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.white,
                      textAlign: "center",
                      justifyContent: "center",
                      textAlignVertical: "center",
                      marginTop: 10,
                    }}>
                    {translation[238][selectedLanguages]}
                    {/* End ride */}
                  </Text>
                </TouchableOpacity>
              )}
              {Data[0].ride_status == "Accepted" && (
                <TouchableOpacity
                  onPress={() => openmap()}
                  style={{
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: "#ffc93c",
                    backgroundColor: "white",
                    borderRadius: 7,
                    marginBottom: 10,
                    height: 45,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.black,
                      textAlign: "center",
                      justifyContent: "center",
                      textAlignVertical: "center",
                      marginTop: 8,
                    }}>
                    {translation[239][selectedLanguages]}
                    {/* Track ride */}
                  </Text>
                </TouchableOpacity>
              )}
              {Data[0].ride_status == "Started" && (
                <TouchableOpacity
                  onPress={() => openmap()}
                  style={{
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: "#ffc93c",
                    backgroundColor: "white",
                    borderRadius: 7,
                    marginBottom: 10,
                    height: 45,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.black,
                      textAlign: "center",
                      justifyContent: "center",
                      textAlignVertical: "center",
                      marginTop: 8,
                    }}>
                    {translation[239][selectedLanguages]}
                    {/* Track ride */}
                  </Text>
                </TouchableOpacity>
              )}
              {Data[0].ride_status == "unresponded" && buttonshow != "start" && (
                <TouchableOpacity
                  onPress={() => acceptridehandle("Accepted")}
                  style={{
                    backgroundColor: colors.yellow,
                    borderRadius: 7,
                    marginTop: 20,
                    height: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.black,
                      textAlign: "center",
                      justifyContent: "center",
                      textAlignVertical: "center",
                      marginTop: 10,
                    }}>
                    {translation[82][selectedLanguages]}
                    {/* ACCEPT */}
                  </Text>
                </TouchableOpacity>
              )}
              {Data[0].ride_status == "unresponded" && buttonshow != "start" && (
                <TouchableOpacity
                  onPress={() => acceptridehandle("declined")}
                  style={{
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: "#ffc93c",
                    backgroundColor: "white",
                    borderRadius: 7,
                    marginBottom: 10,
                    height: 45,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.black,
                      textAlign: "center",
                      justifyContent: "center",
                      textAlignVertical: "center",
                      marginTop: 8,
                    }}>
                    {translation[83][selectedLanguages]}
                    {/* REJECT */}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {showAlertuser && (
            <AlertModal
              heading={msg}
              button1={translation[185][selectedLanguages]}
              // button1="OK"
              button2={translation[99][selectedLanguages]}
              // button2="Cancel"

              onYesPress={yespress}
              onNoPress={cancelpress}
            />
          )}
        </SafeAreaView>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation, trip_id } = state.auth;
  return {
    user,
    selectedLanguages,
    translation,
    trip_id,
  };
};
export default connect(mapStateToProps, {
  startmyRide,
  viewmyride,
  acceptride,
  cancelride,
  paymentfromuserbalance,
  updatetoken,
  apppushnotification,
})(DriverViewRequest);
