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
} from "react-native";
import axios from "axios";
import Button1 from "../../../components/GradientButton";
import Modal from "react-native-modal";
import CustomText from "../../../components/Text";
import Headers1 from "../../../components/Headers1";

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
import { signin, signupwithfb, startmyRide } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge } from "react-native-elements";

import fonts from "../../../theme/fonts";
import SelectDropdown from "react-native-select-dropdown";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const StartRide = ({ signin, route, signupwithfb }) => {
  const navigation = useNavigation();
  const [address, setaddress] = useState("");
  const [msg, setMsg] = useState("");

  const StartRidehandle = async (id) => {
    alert("press");
    // setShowAlert(false);
    //    const formData = new FormData();
    // formData.append("u_id", user.u_id);
    // formData.append("lat",currentLatitude);
    // formData.append("long", currentLongitude);
    // formData.append("name", user.name);
    // formData.append("phone_no",user.phone_no);
    // formData.append("address", address);
    // console.log("sos yes press", formData);

    // const res = await sendsos(formData);
    // console.log("formdata", formData);
    // if (res.data.status == true) {
    //   setShowAlert1(true);
    //   setMsg(res.data.message);
    // } else {
    // }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1 title="Ride" />
      <View
        style={{
          marginTop: 10,
          width: "91%",
          height: "52%",
          marginLeft: 20,
          elevation: 3,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              borderWidth: 0,
              borderRadius: 100 / 2,
              height: 55,
              width: 55,
              backgroundColor: colors.yellow,
              marginTop: "4%",
              marginLeft: "78%",
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <Image
                source={message}
                resizeMode="contain"
                style={{ height: 28, width: 28 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={Persons}
              resizeMode="contain"
              style={{
                height: 90,
                width: 90,
                marginLeft: 20,
                marginTop: -10,
                marginBottom: 10,
                borderRadius: 100 / 2,
              }}
            />
            <Text
              style={{
                fontSize: 21,
                fontWeight: "bold",
                color: "black",
              }}
            >
              Akeksander Mirasolav
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: colors.gray,
                marginTop: 5,
                fontFamily: fonts.PoppinsRegular,
              }}
            >
              5 mins away
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingBottom: 20,
              shadowOpacity: 1,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Image
                source={currentlocation}
                resizeMode="contain"
                style={{
                  height: 25,
                  width: 25,
                  marginTop: 20,
                  marginLeft: 20,
                  borderRadius: 100 / 2,
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "black",
                  marginLeft: 5,
                  marginTop: 18,
                  flex: 1,
                }}
              >
                Pick up
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "black",
                  marginTop: 45,
                  marginLeft: -87,
                  marginRight: -17,
                  flex: 1,
                  fontFamily: fonts.PoppinsRegular,
                }}
              >
                Zavet stadium
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Image
                source={carmove}
                resizeMode="contain"
                style={{
                  height: 35,
                  width: 115,
                  marginTop: 24,
                  marginLeft: 7,
                  borderRadius: 100 / 2,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Image
                source={location}
                resizeMode="contain"
                style={{
                  height: 23,
                  width: 23,
                  marginLeft: 5,
                  marginTop: 21,
                  borderRadius: 100 / 2,
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "black",
                  marginLeft: 2,
                  marginTop: 18,
                }}
              >
                Drop off
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  marginTop: 45,
                  marginLeft: -62,
                  marginRight: 15,
                  flex: 1,
                  fontFamily: fonts.PoppinsRegular,
                }}
              >
                Avis
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.gray,
                marginTop: 5,
                fontFamily: fonts.PoppinsRegular,
              }}
            >
              Estimated fare
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                520lv
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="minus" color={"gray"} size={90} />
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 1, marginTop: 70, marginLeft: 20, marginRight: 20 }}>
        <TouchableOpacity
          onPress={() => StartRidehandle()}
          style={{
            backgroundColor: colors.yellow,
            borderRadius: 7,
            marginTop: 20,
            height: 40,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: colors.black,
              textAlign: "center",
              justifyContent: "center",
              textAlignVertical: "center",
              marginTop: 10,
            }}
          >
            Start ride
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 15,
            borderWidth: 2,
            borderColor: colors.yellow,
            backgroundColor: "white",
            borderRadius: 7,
            marginBottom: 10,
            height: 45,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: colors.black,
              textAlign: "center",
              justifyContent: "center",
              textAlignVertical: "center",
              marginTop: 10,
            }}
          >
            End ride
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  startmyRide,
})(StartRide);
