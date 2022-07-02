/** @format */

import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Pressable,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Animated,
} from "react-native";

import CustomText from "../../../components/Text";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import fonts from "../../../theme/fonts";
import CountryPicker from "react-native-country-picker-modal";
import Fontisto from "react-native-vector-icons/Fontisto";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import Entypo from "react-native-vector-icons/Entypo";
import auth from "@react-native-firebase/auth";
import { GradientButton } from "../../../components/GradientButton";
import { connect } from "react-redux";
import { signin, pushnotification } from "../../../redux/actions/auth";
import { Logo2, logoeng, flag } from "../../../assets";
import axios from "axios";
//redux

import {
  notificationListener,
  requestUserPermission,
} from "../../../components/Notificationservice";
import { CommonActions } from "@react-navigation/routers";

import Foreground from "../../../components/Foreground";
import Geolocation from "@react-native-community/geolocation";
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
const Signup = ({
  navigation,
  signin,
  signInWithPhone,
  selectedLanguages,
  translation,
  pushnotification,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const refRBSheet = useRef();
  const [text, settext] = useState("");
  const [mnumber, setmnumber] = useState("");
  const [checkmark, setcheckmark] = useState(1);
  const [confirm, setConfirm] = useState(null);
  const [val, setval] = useState([]);
  const [userpriv, setuserpriv] = useState("");
  const [countryCode, setCountryCode] = useState("PK");
  const [country, setCountry] = useState("");
  const [callingCode, setcallingCode] = useState("92");
  const [songindex, setsongindex] = useState(0);
  const playbackState = usePlaybackState();
  const scrollX = useRef(new Animated.Value(0)).current;

  console.log("signup screen languages", selectedLanguages);

  // try {
  //   const res = axios({
  //     method: "post",
  //     url: "https://fcm.googleapis.com/fcm/send",
  //     headers: headers,
  //     data: bodyToSend,
  //   });

  //   console.log("sent push notification", res);
  // } catch (err) {
  //   console.log("firsterr", err);
  //   return { err };
  // }
  // pushnotification();

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition((data) => console.log(data));
    console.log("GeoLocation");
  }, []);

  // useEffect(() => {
  // const requestLocationPermission = async () => {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     console.log("Permission assigned");
  //   } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
  //     requestLocationPermission();
  //     console.log("Permission denied");
  //   } else if (granted === PermissionsAndroid.RESULTS.BLOCKED) {
  //     requestLocationPermission();
  //     console.log("Permission denied permanently");
  //   } else {
  //     console.log("Permissions");
  //   }
  // };
  // requestLocationPermission();
  // return () => {
  //   Geolocation.clearWatch();
  // };

  // }, []);
  const onSelect = (country) => {
    console.log("country", country);
    setCountryCode(country.cca2);
    console.log("country1", country.callingCode);
    setCountry(country);
    setcallingCode(country.callingCode);
  };
  // const subbmitotp = () => {
  //   (async () => {
  //     const formData = new FormData();
  //     formData.append("phone_no", mnumber);
  //     formData.append("status", "driver");

  //     console.log("response from data", formData);
  //     const res = await signin(formData);

  //     if (res.data.status == true) {
  //       if (
  //         res.data.data.is_first_registered == 0 &&
  //         res.data.data.user_privilidge == 2
  //       ) {
  //         navigation.navigate("Success", {
  //           screen: "Signup",
  //         });
  //       }
  //       if (res.data.data.user_privilidge == 1) {
  //         setShowAlert(true);
  //         // setMsg("your account is blocked please contact support");
  //         setMsg(translation[168][selectedLanguages]);
  //       } else if (res.data.data.user_privilidge == 0) {
  //         navigation.dispatch(
  //           CommonActions.reset({
  //             index: 0,
  //             routes: [{ name: "Map" }],
  //           })
  //         );
  //       }
  //     }
  //   })();
  // };
  const subbmitotp = () => {
    (async () => {
      const formData = new FormData();
      formData.append("phone_no", "+923368757013");
      formData.append("status", "driver");

      console.log("response from data", formData);
      const res = await signin(formData);

      if (res.data.status == true) {
        navigation.navigate("Map", {
          screen: "Signup",
        });

        // if (
        //   res.data.data.is_first_registered == 0 &&
        //   res.data.data.user_privilidge == 2
        // ) {

        // }
        // if (res.data.data.user_privilidge == 1) {
        //   setShowAlert(true);
        //   // setMsg("your account is blocked please contact support");
        //   setMsg(translation[168][selectedLanguages]);
        // } else if (res.data.data.user_privilidge == 0) {
        //   navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [{ name: "Map" }],
        //     })
        //   );
        // }
      }
    })();
  };
  // console.log("myselectedlanguage", translation[888]?.selectedLanguages);

  async function signInWithPhoneNumber(phoneNumber) {
    // alert(phoneNumber);
    // return false;

    setLoading(true);

    // setConfirm(confirmation);
    if (checkmark == 1) {
      setLoading(false);
      alert(translation[348][selectedLanguages]);
    } else if (checkmark == 2) {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      navigation.navigate("OtpSignUp", {
        phoneNumber: phoneNumber,
        confirmation: confirmation,
      });
      setLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        ...styles.mainContainer,
      }}>
      <KeyboardAwareScrollView
        contentContainerStyle={
          {
            // flexGrow: 1,
          }
        }>
        <Foreground />

        <Loading visible={loading} />
        {translation && (
          <View>
            <View
              style={{
                borderWidth: 0,
                alignItems: "center",
                paddingTop: 25,
                marginTop: 20,
              }}>
              <Image
                source={selectedLanguages == "Bulgarian" ? Logo2 : logoeng}
                resizeMode='contain'
                style={{
                  height: 80,
                  width: "50%",
                }}
              />
              {/* <Image
                 source={logoeng}
              resizeMode='contain'
              style={{
                height: 80,
                width: "50%",
              }}
            /> */}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginTop: 10,
                borderWidth: 0,
              }}>
              <View
                style={{
                  marginBottom: 20,
                }}>
                <CustomText
                  title={translation[8][selectedLanguages]}
                  // title={"Sign Up"}
                  type={"large"}
                  color={"black"}
                  style={{
                    fontSize: 22,
                    marginLeft: 20,
                    marginTop: 20,
                    fontWeight: "bold",
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    paddingLeft: 20,
                    paddingTop: 20,
                    color: "gray",
                    fontFamily: fonts.PoppinsRegular,
                  }}>
                  {translation[1][selectedLanguages]}
                  {/* Please enter your mobile to start using app */}
                </Text>
              </View>
            </View>
            {/* <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 40,
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: "12%",
                height: 35,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F9F9F9",
                marginTop: 25,
                borderRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Image
                source={flag}
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: 60,
                }}
              />
            </TouchableOpacity>

            <View style={{ width: "80%" }}>
              <TextInput
                selectionColor={colors.red}
                keyboardType={"number-pad"}
                onChangeText={(pno) => setmnumber(pno)}
                theme={{
                  colors: {
                    primary: colors.red,
                    underlineColor: "transparent",
                  },
                }}
                style={{
                  height: 40,
                  backgroundColor: "white",
                  borderColor: "gray",
                  borderRadius: 5,
                  marginTop: 20,
                  paddingTop: 10,
                  // borderBottomColor: colors.yellow,
                }}
              />
            </View>
          </View> */}
            <View
              style={{
                flex: 1,
                marginTop: "5%",
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.gray,
                  marginLeft: 20,
                  marginBottom: 10,
                }}>
                Country
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  borderWidth: 0,
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 20,
                  borderBottomWidth: 2,
                  color: "gray",
                }}>
                {/* <CountryPicker
                onSelect={(v) =>
                  setval({
                    country: v,
                    cname: v.name,
                    ccode: v.callingCode,
                    cflag: v.flag,
                  })
                }
                withCountryNameButton={"true"}
                withFilter
                translation="eng"
                // cca2={val.cname}
              /> */}
                <CountryPicker
                  containerButtonStyle={{
                    height: 40,
                    marginTop: 5,
                    justifyContent: "center",
                  }}
                  countryCode={countryCode}
                  withCountryNameButton={true}
                  visible={false}
                  withFlag={true}
                  withCloseButton={true}
                  withAlphaFilter={true}
                  withCallingCode={true}
                  //   withCurrency={true}
                  withEmoji={true}
                  //   withCurrencyButton={true}
                  // withCallingCodeButton={true}
                  withFilter={true}
                  withModal={true}
                  onSelect={onSelect}
                  // country={country}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.gray,
                    marginLeft: 20,
                  }}>
                  Your Mobile Number*
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                  width: "90%",
                }}>
                <View style={{ borderBottomWidth: 1, flexDirection: "row" }}>
                  {/* <AntDesign
                style={{
                  marginTop: 13,
                }}
                name="plus"
                size={16}
                color="black"
              /> */}
                  <Text
                    style={{
                      backgroundColor: "white",
                      borderBottomWidth: 0,
                      fontSize: 19,
                      marginTop: 8,
                      marginLeft: 1,
                    }}>
                    {callingCode}
                  </Text>
                </View>

                <TextInput
                  style={{
                    width: "84%",
                    backgroundColor: "white",
                    height: 40,
                    fontSize: 20,
                    marginRight: 10,
                    marginLeft: 10,
                    borderBottomWidth: 1,
                  }}
                  selectionColor={colors.red}
                  keyboardType={"number-pad"}
                  onChangeText={(pno) => setmnumber(pno)}
                  theme={{
                    colors: {
                      primary: colors.red,
                      underlineColor: "transparent",
                    },
                  }}
                  maxLength={10}
                  // value={num}
                  // keyboardType="numeric"
                />
              </View>
            </View>
            <View style={{ flex: 1, marginHorizontal: 20 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                }}>
                {checkmark == 1 && (
                  <Fontisto
                    name={"checkbox-passive"}
                    color={"#ffc93c"}
                    size={20}
                    style={{ fontSize: 15, marginTop: 30 }}
                    onPress={() => setcheckmark(2)}
                  />
                )}
                {checkmark == 2 && (
                  <Fontisto
                    name={"checkbox-active"}
                    color={"#ffc93c"}
                    size={20}
                    style={{ fontSize: 15, marginTop: 30 }}
                    onPress={() => setcheckmark(1)}
                  />
                )}

                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 28,
                    fontFamily: fonts.PoppinsRegular,
                    marginLeft: 8,
                    textAlign: "center",
                  }}>
                  {translation[347][selectedLanguages]}
                  {/* you agree to your terms if getting user location. */}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 70,
                marginHorizontal: 10,
              }}>
              <GradientButton
                title={translation[2][selectedLanguages]}
                // 'Sign in'
                onButtonPress={
                  () => signInWithPhoneNumber("+" + callingCode + mnumber)
                  //subbmitotp()
                }
              />
            </View>

            {showAlert && (
              <AlertModal
                heading={msg}
                button1='OK'
                form={true}
                onOkPress={() => {
                  setShowAlert(false);
                }}
              />
            )}
            {/* <FlatList
              data={notification}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            /> */}
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return {
    user,
    selectedLanguages,
    translation,
  };
};
export default connect(mapStateToProps, {
  signin,
  pushnotification,
})(Signup);
