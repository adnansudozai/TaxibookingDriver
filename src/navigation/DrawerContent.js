/** @format */

import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Image, Switch } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { CommonActions } from "@react-navigation/native";

import {
  signin,
  signupwithfb,
  getlanguage,
  workingstatus,
  logoutSuccess,
  selectedlanguage,
  updatelang,
} from "../redux/actions/auth";
import {
  profile,
  order,
  measure,
  FAQS,
  Feedback,
  Privacy,
  logot,
  Persons,
  Home,
  Profile1,
  Address,
  Trip,
  Wallet,
  Block,
  Support,
  Terms,
  Logout1,
} from "../assets";
import database from "@react-native-firebase/database";

import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import AlertModal from "../components/AlertModal";
const roomRef = database().ref("rooms");
import SelectDropdown from "react-native-select-dropdown";
const DrawerContent = ({
  props,
  navigation,
  trip_id,
  user,
  logoutUser,
  isLoggedIn,
  updateCart,
  translation,
  logoutSuccess,
  selectedLanguages,
  getlanguage,
  selectedlanguage,
  updatelang,
}) => {
  // const [isEnabled, setIsEnabled] = useState(user!=null &&(
  //   user.is_working=='Yes' ? true : false
  // )
  //   );
  // const [status, setstatus] = useState('No');
  const [senderid, setsenderid] = useState(user != null ? user.u_id : 0);
  const [receiverid, setreceiverid] = useState(0);
  const [indexid, setindexid] = useState("");

  ////// Toggle button
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const [language, setlanguage] = useState();

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
          });
        });

        const res = roomsFB?.some((element) => {
          return (
            (element.recv_uid == senderid && element.send_uid == receiverid) ||
            (element.recv_uid == receiverid && element.send_uid == senderid)
          );
        });
        console.log(res);

        if (res) {
          const index = roomsFB.find((element) => {
            return (
              (element.recv_uid == senderid &&
                element.send_uid == receiverid) ||
              (element.recv_uid == receiverid && element.send_uid == senderid)
            );
          });
          setindexid(`messages/${index.key}`);

          navigation.navigate("Support", {
            dname: "Support",
            messagekey: `messages/${index.key}`,
            receiverid: receiverid,
            roomkey: `rooms/${index.key}`,
            screen: "support",
          });
        } else {
          addRoom();
        }
      });
    } catch (err) {
      console.log(err);
    }

    const addRoom = async (item) => {
      try {
        await roomRef.push({
          send_uid: user.u_id,
          recv_uid: receiverid,
          created_at: new Date().getTime(),
          who_send: user.u_id,
          content: "",
          device_token: user.device_token,
          sender_dp: user.dp,
          name: user.name,
          is_read: "no",
        });
      } catch (err) {
        alert(err);
      }
    };
  };

  /////language api
  const [SelectLang, setSelectLang] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getlanguage(user.u_id);
      console.log("dataaaaa", res.data.data);
      if (res.data.status == true) {
        var array1 = [];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log("dataaaaa", res.data.data[i].name, "i is", i);
          array1.push(res.data.data[i].name);
        }

        setSelectLang(array1);
      } else {
      }
    })();
  }, [selectedLanguages]);

  const selectlanghandle = async (item) => {
    const fomData = new FormData();

    fomData.append("u_id", user.u_id);
    fomData.append("language", item);

    const res = await selectedlanguage(fomData, item, translation);

    console.log("selected language is", res, fomData);
  };

  const [wstatus, setwstatus] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const logouthandle = () => {
    setShowAlert(true);
    setMsg(translation[167][selectedLanguages]);
    // setMsg("Are you sure you want to logout");
  };

  const yespress = async (id) => {
    setShowAlert(false);
    new Promise((rsl, rej) => {
      logoutSuccess(rsl, rej);
    })
      .then((res) => {
        console.log("first", res);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Signup" }],
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    navigation.navigate("Signup");
  };
  const cancelpress = async (id) => {
    setShowAlert(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <DrawerContentScrollView {...props}>
        {translation && (
          <View>
            <View
              style={{
                flexDirection: "row",
                // backgroundColor: "red",
                marginHorizontal: 10,
                marginTop: 10,
                flex: 1,
              }}
            >
              {user != null && (
                <View
                  style={{
                    borderWidth: 0,
                    height: 70,
                    width: 70,
                    borderRadius: 100 / 2,
                  }}
                >
                  <Image
                    source={{
                      uri: user.dp,
                    }}
                    resizeMode="cover"
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 100 / 2,
                    }}
                  />
                </View>
              )}
              <View style={{ paddingLeft: 10, paddingTop: 10, width: "70%" }}>
                {user != null && (
                  <Text style={{ fontSize: 16 }}>
                    {/* Welcome  */}
                    {translation[8][selectedLanguages]}{" "}
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {user.name}
                    </Text>
                  </Text>
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
                <TouchableOpacity
                  style={{
                    width: "50%",
                    height: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.yellow,
                    marginTop: 5,
                    borderRadius: 5,
                  }}
                >
                  {user != null && (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {user.myblnc} lv
                    </Text>
                  )}
                </TouchableOpacity>
                {/* <View style={{flexDirection:'row',marginTop:15}}>
           <Text style={{marginTop:3,marginRight:1}}>Rest</Text>
            <Switch
             style={{transform: [{ scaleX: 1 }, { scaleY: 1 }] ,marginLeft:10 }} 
            trackColor={{ false: "#767577", true: "#f4f3f4" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            />
      <Text style={{marginLeft:10,marginTop:3}}>Work</Text>
           </View> */}
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[11][selectedLanguages]}
                //  label= "Home"

                labelStyle={styles.labelStyle}
                onPress={() => {
                  navigation.navigate("Map");
                  // navigation.navigate("StartRide");
                  // navigation.navigate("DriverViewRequest");
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Home}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[13][selectedLanguages]}
                // label=   "Trip History"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  navigation.navigate("TripHistory");
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Trip}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[253][selectedLanguages]}
                // label=  "Block Passenger"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  navigation.navigate("BlockedDrivers");
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Block}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[67][selectedLanguages]}
                //  label= "Contact Us"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  navigation.navigate("DriverContactus");
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Support}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[15][selectedLanguages]}
                // label=  "Profile"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  navigation.navigate("DriverProfile");
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Profile1}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />
              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[16][selectedLanguages]}
                // label=  "Wallet"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  navigation.navigate("Wallet");
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Wallet}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />
              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[17][selectedLanguages]}
                // label= "Preferences"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  navigation.navigate("DriverPreferences");
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Wallet}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />
              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[18][selectedLanguages]}
                // label=  "Support"
                labelStyle={styles.labelStyle}
                onPress={() => checkkey()}
                icon={({ color, size }) => (
                  <Image
                    source={Support}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />
              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[19][selectedLanguages]}
                //  label="Terms & Conditions"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  navigation.navigate("TermsCondition");
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Terms}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              {/* </Drawer.Section> */}

              <DrawerItem
                label={translation[20][selectedLanguages]}
                //  label={isLoggedIn ? "Logout" : "Logout"}
                labelStyle={styles.labelStyle}
                onPress={() => logouthandle()}
                icon={({ color, size }) => (
                  <Image
                    source={Logout1}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />
            </View>

            {SelectLang != "" && (
              <View style={{ marginLeft: 15, marginTop: 20 }}>
                <SelectDropdown
                  data={SelectLang}
                  onSelect={(selectedItem, index) => {
                    selectlanghandle(selectedItem);
                    // setSpaceType(selectedItem);
                    // console.log("indexxxxx",index);
                    // console.log("itememmmmm",selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  defaultButtonText={selectedLanguages}
                  buttonStyle={{
                    borderRadius: 12,
                    height: 35,
                    width: 120,
                    marginTop: 10,
                  }}
                />
              </View>
            )}
          </View>
        )}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    color: "black",
    fontFamily: fonts.PoppinsMedium,
    right: 10,
  },
});
const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation, trip_id } = state.auth;
  return { user, selectedLanguages, translation, trip_id };
};

export default connect(mapStateToProps, {
  workingstatus,
  logoutSuccess,
  getlanguage,
  selectedlanguage,
  updatelang,
})(DrawerContent);
