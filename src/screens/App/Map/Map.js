/** @format */

import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import {
  apppushnotification,
  sendsos,
  updatedriverloc,
  updatetoken,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { beep } from "../../../assets";
import AlertModal from "../../../components/AlertModal";
import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Header, Badge } from "react-native-elements";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import messaging from "@react-native-firebase/messaging";
import BackgroundTimer from "react-native-background-timer";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { CommonActions } from "@react-navigation/native";
import {
  notificationListener,
  requestUserPermission,
} from "../../../components/Notificationservice";
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";
import TrackPlayer from "react-native-track-player";

const Map = ({
  selectedLanguages,
  translation,
  user,
  sendsos,
  updatetoken,
  trip_id,
  updatedriverloc,
  route,
  apppushnotification,
}) => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 33.684422,
    longitude: 73.047882,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [currentLongitud, setCurrentLongitude] = useState(""); //33.684422
  const [currentLatitud, setCurrentLatitude] = useState(""); //73.047882
  const [address, setaddress] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [btn, setbtn] = useState("Yes");

  const [showAlert1, setShowAlert1] = useState(false);

  const [userintre, setuserintre] = useState(false);

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

  // useEffect(() => {
  //   notificationListener,
  //   requestUserPermission },[])
  try {
    Geolocation.getCurrentPosition(
      //Will give you the current location

      (position) => {
        console.log("positionmap1", position);
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        setCurrentLongitude(currentLongitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        if (error.code == 2) {
          alert(translation[349][selectedLanguages]);
        }

        console.log("positionmap", error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  } catch (e) {}

  const cancelpress = async (id) => {
    setShowAlert(false);
  };

  const soshandle = async (id) => {
    setbtn(id);
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        currentLatitud +
        "," +
        currentLongitud +
        "&key=" +
        API_KEY
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0].formatted_address));
        setaddress(JSON.stringify(responseJson.results[0].formatted_address));
      });
    setShowAlert(true);
    if (id == "Yes") {
      // setMsg("Are you sure you want to send sos");
      setMsg(translation[244][selectedLanguages]);
    } else {
      // setMsg("Are you sure you want to cancel sos");
      setMsg(translation[245][selectedLanguages]);
    }
  };

  const yespress = async (id) => {
    if (btn == "Yes") {
      setbtn("No");
    } else {
      setbtn("Yes");
    }
    setShowAlert(false);

    const formData = new FormData();

    formData.append("u_id", user.u_id);
    formData.append("lat", currentLatitud);
    formData.append("name", user.name);
    formData.append("phone_no", user.phone_no);
    formData.append("long", currentLongitud);
    formData.append("address", address);
    formData.append("status", btn);

    console.log("sos yes press", formData);

    const res = await sendsos(formData);
    console.log("formdata", formData);
    if (res.data.status == true) {
      setShowAlert1(true);
      setMsg(res.data.message);
    } else {
    }
  };

  const start2 = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    //   // Add a track to the queue
    await TrackPlayer.add({
      id: "trackId",
      url: require("../../../assets/images/Definite.mp3"),
      title: "Track Title",
      artist: "Track Artist",
      artwork: "https://picsum.photos/300",
    });

    // Start playing it
    await TrackPlayer.play();
  };

  //////////////////////notification code
  useEffect(() => {
    messaging().onMessage(async (remoteMessage) => {
      console.log(`push notification 1`, remoteMessage.data);
      if (remoteMessage.data?.payment_method == "user_balance") {
        alert(remoteMessage.data?.message);
      } else if (remoteMessage.data?.scree_name == "chatting") {
        start2();
      }
    });
  }, [notificationListener]);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("push notification 2", remoteMessage.data);

      if (remoteMessage.data.scree_name == "SoS") {
        navigation.navigate("DriverSoS", {
          data: remoteMessage.data,
        });
      } else if (remoteMessage.data.scree_name == "support") {
        const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
        const receiverid = remoteMessage.data.receiverid; // 12;
        const roomkey = remoteMessage.data.roomkey; //`rooms/-N1lmWrR9sKquJ-3nYnx`;
        const screen = remoteMessage.data.screen; //`support`;
        const dname = remoteMessage.data.dname; //"Support";

        navigation.navigate("Support", {
          dname: dname,
          messagekey: messagekey,
          receiverid: receiverid,
          roomkey: roomkey,
          screen: screen,
        });
      } else if (remoteMessage.data.scree_name == "chatting") {
        const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
        const receiverid = remoteMessage.data.receiverid; // 12;
        const screen = remoteMessage.data.screen; //`support`;
        const dname = remoteMessage.data.dname; //"Support";
        const devicetoken = remoteMessage.data.devicetokennew;

        navigation.navigate("chatting", {
          dname: dname,
          messagekey: messagekey,
          receiverid: receiverid,
          screen: screen,
          devicetoken: devicetoken,
        });
      }
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("push notification 3", remoteMessage);
      // start();

      if (remoteMessage.data.scree_name == "SoS") {
        navigation.navigate("DriverSoS", {
          data: remoteMessage.data,
        });
      } else if (remoteMessage.data.scree_name == "support") {
        const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
        const receiverid = remoteMessage.data.receiverid; // 12;
        const roomkey = remoteMessage.data.roomkey; //`rooms/-N1lmWrR9sKquJ-3nYnx`;
        const screen = remoteMessage.data.screen; //`support`;
        const dname = remoteMessage.data.dname; //"Support";

        navigation.navigate("Support", {
          dname: dname,
          messagekey: messagekey,
          receiverid: receiverid,
          roomkey: roomkey,
          screen: screen,
        });
      } else if (remoteMessage.data.scree_name == "chatting") {
        const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
        const receiverid = remoteMessage.data.receiverid; // 12;
        const screen = remoteMessage.data.screen; //`support`;
        const dname = remoteMessage.data.dname; //"Support";
        const devicetoken = remoteMessage.data.devicetokennew;

        navigation.navigate("chatting", {
          dname: dname,
          messagekey: messagekey,
          receiverid: receiverid,
          screen: screen,
          devicetoken: devicetoken,
        });
      }
    });

    PushNotification.configure({
      onNotification: (notification) => {
        if (notification.userInteraction == true) {
          if (notification.data.scree_name == "SoS") {
            navigation.navigate("DriverSoS", {
              data: notification.data,
            });
          } else if (notification.data.scree_name == "trip_request") {
            navigation.navigate("DriverViewRequest", {
              data: notification.data,
            });
          } else if (notification.data.scree_name == "support") {
            const messagekey = notification.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
            const receiverid = notification.data.receiverid; // 12;
            const roomkey = notification.data.roomkey; //`rooms/-N1lmWrR9sKquJ-3nYnx`;
            const screen = notification.data.screen; //`support`;
            const dname = notification.data.dname; //"Support";

            navigation.navigate("Support", {
              dname: dname,
              messagekey: messagekey,
              receiverid: receiverid,
              roomkey: roomkey,
              screen: screen,
            });
          } else if (notification.data.scree_name == "chatting") {
            const messagekey = notification.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
            const receiverid = notification.data.receiverid; // 12;
            const screen = notification.data.screen; //`support`;
            const dname = notification.data.dname; //"Support";
            const devicetoken = notification.data.devicetokennew;

            navigation.navigate("chatting", {
              dname: dname,
              messagekey: messagekey,
              receiverid: receiverid,
              screen: screen,
              devicetoken: devicetoken,
            });
          }
        }
      },
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("push notification 5", remoteMessage);

          if (remoteMessage.data.scree_name == "SoS") {
            navigation.navigate("DriverSoS", {
              data: remoteMessage.data,
            });
          } else if (remoteMessage.data.scree_name == "support") {
            const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
            const receiverid = remoteMessage.data.receiverid; // 12;
            const roomkey = remoteMessage.data.roomkey; //`rooms/-N1lmWrR9sKquJ-3nYnx`;
            const screen = remoteMessage.data.screen; //`support`;
            const dname = remoteMessage.data.dname; //"Support";

            navigation.navigate("Support", {
              dname: dname,
              messagekey: messagekey,
              receiverid: receiverid,
              roomkey: roomkey,
              screen: screen,
            });
          } else if (remoteMessage.data.scree_name == "chatting") {
            const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
            const receiverid = remoteMessage.data.receiverid; // 12;
            const screen = remoteMessage.data.screen; //`support`;
            const dname = remoteMessage.data.dname; //"Support";
            const devicetoken = remoteMessage.data.devicetokennew;

            navigation.navigate("chatting", {
              dname: dname,
              messagekey: messagekey,
              receiverid: receiverid,
              screen: screen,
              devicetoken: devicetoken,
            });
          }
        }
      });
  }, [notificationListener]);

  ///////Background timer////////////

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.user_privilidge == 2) {
        navigation.navigate("DriverProfile");
      } else if (user.user_privilidge == 0) {
        hello();
      }
    }, [])
  );

  if (route.params?.ridestatus == "complete") {
    alert(translation[337][selectedLanguages]);
  }
  console.log("translationroute", translation[342][selectedLanguages]);

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.user_privilidge == "0" && user.is_working == "Yes") {
        BackgroundTimer.runBackgroundTimer(() => {
          hello();
        }, 7000);
      }
    }, [])
  );

  const hello = () => {
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

          console.log("api response from driver view request123", res.data);

          if (res.data.status == true) {
            if (
              res.data.trip_status == "Started" ||
              res.data.trip_status == "Accepted"
            ) {
              start();
              navigation.navigate("DriverViewRequest");
              BackgroundTimer.stopBackgroundTimer();
            } else if (res.data.trip_status == "trip") {
              BackgroundTimer.stopBackgroundTimer();
              navigation.navigate("Ratings", {
                data: res.data.data,
              });
            }
          } else if (res.data.status == 2) {
            alert(res.data.message);
          }
        })();
      }
    );
  };

  ////////////////////

  return (
    <View style={styles.container}>
      {/* <Loading visible={loading} /> */}
      <Header
        containerStyle={{
          justifyContent: "space-between",
          marginVertical: 5,
          marginHorizontal: 1,
        }}
        backgroundColor={"transparent"}
        leftComponent={
          <View style={{}}>
            <Octicons
              name={"three-bars"}
              size={30}
              color={colors.yellow}
              onPress={() => {
                navigation.openDrawer();
              }}
              style={{}}
            />
          </View>
        }
        rightComponent={
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {btn == "Yes" && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  backgroundColor: "#ffc93c",
                  borderRadius: 8,
                  marginBottom: 10,
                  height: 30,
                  width: 80,
                }}
              >
                <TouchableOpacity
                  onPress={() => soshandle("Yes")}
                  style={{
                    fontSize: 10,
                    color: "black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.black,
                      // textAlign:
                      //   "center",
                      // justifyContent:
                      //   "flex-end",
                      // alignContent:
                      //   "flex-end",

                      // textAlignVertical:
                      //   "center",
                    }}
                  >
                    SOS
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {btn == "No" && (
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "#ffc93c",
                  borderRadius: 8,
                  padding: 2,
                  marginBottom: 10,
                  height: 35,
                  width: 100,
                  marginLeft: 240,
                  position: "absolute",
                }}
              >
                <TouchableOpacity
                  onPress={() => soshandle("No")}
                  style={{
                    fontSize: 10,
                    justifyContent: "flex-end",
                    color: "black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.black,
                      textAlign: "center",
                      justifyContent: "flex-end",
                      alignContent: "flex-end",

                      textAlignVertical: "center",
                      marginTop: 5,
                      paddingBottom: 10,
                    }}
                  >
                    Cancel SOS
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {showAlert && (
              <AlertModal
                heading={msg}
                button1={translation[185][selectedLanguages]}
                // button1="OK"
                button2={translation[99][selectedLanguages]}
                // button2="Cancel"
                onYesPress={yespress}
                onNoPress={cancelpress}
                onOkPress={() => {
                  setShowAlert(false);
                }}
              />
            )}

            {showAlert1 && (
              <AlertModal
                heading={msg}
                button1="OK"
                button2="Cancel"
                onYesPress={cancelpress}
                form="abc"
                onOkPress={() => {
                  setShowAlert1(false);
                }}
              />
            )}
          </View>
        }
      />
      {showAlert && (
        <AlertModal
          heading={msg}
          button1={translation[185][selectedLanguages]}
          // button1="OK"
          button2={translation[99][selectedLanguages]}
          // button2="Cancel"
          onYesPress={yespress}
          onNoPress={cancelpress}
          onOkPress={() => {
            setShowAlert(false);
          }}
        />
      )}

      {showAlert1 && (
        <AlertModal
          heading={msg}
          button1="OK"
          button2="Cancel"
          onYesPress={cancelpress}
          form="abc"
          onOkPress={() => {
            setShowAlert1(false);
          }}
        />
      )}
      {currentLatitud != "" && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(currentLatitud),
            longitude: parseFloat(currentLongitud),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onRegionChangeComplete={(region) => setRegion(region)}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(currentLatitud),
              longitude: parseFloat(currentLongitud),
            }}
            pinColor={"red"} // any color
            title={"title"}
            description={"description"}
          />
        </MapView>
      )}

      {/* <Button onPress={() => goToTokyo()} title="Go to Tokyo" /> */}
      {/* <Text style={styles.text}>Current latitude{region.latitude}</Text> */}
      {/* <Text style={styles.text}>Current longitude{region.longitude}</Text> */}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation, trip_id } = state.auth;
  console.log("redux data is ", trip_id);
  return {
    user,
    selectedLanguages,
    translation,
    trip_id,
  };
};
export default connect(mapStateToProps, {
  sendsos,
  updatetoken,
  updatedriverloc,
  apppushnotification,
})(Map);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "88%",
  },
  text: {
    fontSize: 20,
    backgroundColor: "lightblue",
  },
});
