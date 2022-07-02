import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { connect } from "react-redux";
import {
  sendsos,
  getBlockpasanger,
  unblockpasanger,
  updatedriverloc,
  updatetoken,
} from "../redux/actions/auth";
import { Header } from "react-native-elements";
import AlertModal from "../components/AlertModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./Text";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { notificationListener } from "./Notificationservice";
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";
const Headers1 = ({
  title,
  route,
  sendsos,
  user,
  value,
  trip_id,
  updatetoken,
  scren,
  translation,
  selectedLanguages,
}) => {
  console.log("route===>", route);
  const navigation = useNavigation();
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [address, setaddress] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [btn, setbtn] = useState("Yes");

  console.log("route12345", route);

  const [loading, setLoading] = useState(false);
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
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
    // (error) => {

    // },
    // {
    //   enableHighAccuracy: false,
    //   timeout: 30000,
    //   maximumAge: 1000
    // },
  );

  const soshandle = async (id) => {
    setbtn(id);

    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        currentLatitude +
        "," +
        currentLongitude +
        "&key=" +
        API_KEY
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          "ADDRESS GEOCODE is BACK!! => " +
            JSON.stringify(responseJson.results[0].formatted_address)
        );
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
    formData.append("lat", currentLatitude);
    formData.append("long", currentLongitude);
    formData.append("name", user.name);
    formData.append("phone_no", user.phone_no);
    formData.append("address", address.replace(/['"]+/g, ""));
    formData.append("status", btn);

    const res = await sendsos(formData);
    console.log("formdatasos", formData);
    if (res.data.status == true) {
      setShowAlert1(true);
      setMsg(res.data.message);
    } else {
    }
  };

  const cancelpress = async (id) => {
    setShowAlert(false);
  };

  

  useEffect(() => {
    messaging().onMessage(async (remoteMessage) => {
      // if (remoteMessage.data?.payment_method == "user_balance") {
      //   alert(remoteMessage.data?.message);
      // }
    });
  }, [notificationListener]);



  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log(
      //   "Notification caused app to open from background state:",
      //   remoteMessage.notification
      // );

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
      } else {
        remoteMessage.data.scree_name == "Map";
        navigation.navigate("Map");
      }
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
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
      } else {
        remoteMessage.data.scree_name == "Map";
        navigation.navigate("Map");
      }
    });

    PushNotification.configure({
      onNotification: (notification) => {
        if (notification.userInteraction == true) {
          console.log(
            "Notification caused app to open from background state:",
            notification
          );
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
          } else {
            notification.data.scree_name == "Map";
            navigation.navigate("Map");
          }
        }
      },
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   "Notification caused app to open from quit state:",
          //   remoteMessage
          // );

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
          } else {
            remoteMessage.data.scree_name == "Map";
            navigation.navigate("Map");
          }
        }
      });
  }, [notificationListener]);

  return (
    <Header
      containerStyle={{
        marginVertical: 20,
      }}
      backgroundColor={"transparent"}
      leftComponent={
        <View
          style={{
            flexDirection: "row",
            width: 500,
            alignItems: "center",
          }}
        >
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
              button1={translation[185][selectedLanguages]}
              // button1="OK"
              button2={translation[99][selectedLanguages]}
              // button2="Cancel"
              onYesPress={cancelpress}
              form="abc"
              onOkPress={() => {
                setShowAlert1(false);
              }}
            />
          )}

          <Ionicons
            name={"chevron-back"}
            size={24}
            color={colors.secondary}
            onPress={() => {
              // if (route == undefined) {
              //   navigation.navigate("Map");
              // } else {
              navigation.goBack();
              // }
            }}
            style={{}}
          />

          <View>
            <CustomText
              title={title}
              type={"large"}
              color={"black"}
              style={{
                fontSize: 20,
                marginLeft: 6,

                fontWeight: "bold",
              }}
            />
          </View>
        </View>
      }
      rightComponent={
        <View>
          {value != 5 && (
            <View>
              {btn == "Yes" && (
                <View
                  style={{
                    backgroundColor: "#ffc93c",
                    borderRadius: 8,
                    height: 30,
                    width: 80,
                  }}
                >
                  <TouchableOpacity onPress={() => soshandle("Yes")}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.black,
                        textAlign: "center",
                        justifyContent: "flex-end",

                        marginTop: 5,
                      }}
                    >
                      {translation[75][selectedLanguages]}
                      {/* SOS */}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {btn == "No" && (
                <View
                  style={{
                    backgroundColor: "#ffc93c",
                    borderRadius: 8,
                    height: 30,
                    width: 100,
                  }}
                >
                  <TouchableOpacity onPress={() => soshandle("No")}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.black,
                        textAlign: "center",
                        justifyContent: "flex-end",

                        marginTop: 5,
                      }}
                    >
                      {translation[246][selectedLanguages]}
                      {/* Cancel SOS */}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      }
    />
  );
};
const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation, trip_id } = state.auth;
  return { user, selectedLanguages, translation, trip_id };
};
export default connect(mapStateToProps, {
  sendsos,
  updatetoken,
})(Headers1);
