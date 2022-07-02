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
} from "react-native";
import axios from "axios";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
// import auth from "@react-native-firebase/auth";
//logo
import { Persons, addphoto, cross } from "../../../assets";

import { GradientButton } from "../../../components/GradientButton";

//redux
import {
  signin,
  signupwithfb,
  getTriphistory,
  blockdriver,
  addfavlocation,
  adddriverfaviriot,
  selectedlanguage,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
import { Header, Badge } from "react-native-elements";
import fonts from "../../../theme/fonts";
import Headers1 from "../../../components/Headers1";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
const TripHistory = ({
  signin,
  route,
  signupwithfb,
  getTriphistory,
  selectedLanguages,
  translation,
  user,
  blockdriver,
  addfavlocation,
  adddriverfaviriot,
}) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [myfaveriot, setmyfaveriot] = useState([]);
  const [selected, setselected] = useState();
  const [faveriotdriver, setfaveriotdriver] = useState([]);
  console.log(faveriotdriver);
  const [triphistory, settriphistory] = useState([]);
  const [showAlert1, setShowAlert1] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const fomData = new FormData();
        fomData.append("u_id", user.u_id);

        const res = await getTriphistory(fomData);
        console.log("formdata", res.data.data);
        if (res.data.status == true) {
          settriphistory(res.data.data);
        } else {
        }
      })();
    }, [])
  );

  const addfavhandle = () => {
    let longi = "";
    let lati = "";
    let address = "";
    if (selected === true) {
      lati = myfaveriot.trip_from_lat;
      longi = myfaveriot.trip_from_long;
      address = myfaveriot.trip_from_address;
    } else {
      lati = myfaveriot.trip_to_lat;
      longi = myfaveriot.trip_to_long;
      address = myfaveriot.trip_to_address;
    }
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("location_lat", lati);
      fomData.append("location_long", longi);
      fomData.append("location_address", address);
      console.log("formdata", fomData);
      const res = await addfavlocation(fomData);
      console.log("formdata", fomData);
      if (res.data.status == true) {
        setShowAlert1(true);
        setMsg(res.data.message);
        setModalVisible1(false);
      } else {
        setModalVisible1(false);
      }
    })();

    setModalVisible1(false);
  };

  const addtofaveretdriver = () => {
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("otheruser_id", faveriotdriver.u_id);

      const res = await adddriverfaviriot(fomData);
      console.log("result", res, fomData);
      if (res.data.status == true) {
        setShowAlert1(true);
        setMsg(res.data.message);
      } else {
      }
    })();
    setModalVisible(!isModalVisible);
  };

  const addtoblockdriver = () => {
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("otheruser_id", faveriotdriver.u_id);

      const res = await blockdriver(fomData);
      console.log("result", res);
      if (res.data.status == true) {
        setShowAlert1(true);
        setMsg(res.data.message);
      } else {
      }
    })();

    setModalVisible(!isModalVisible);
  };

  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setfaveriotdriver(item);
  };

  const toggleModalfrom = (item) => {
    setmyfaveriot(item);
    setselected(true);
    setModalVisible1(!isModalVisible1);
  };

  const toggleModalto = (item) => {
    setmyfaveriot(item);
    setselected(false);
    setModalVisible1(!isModalVisible1);
  };

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const closemodal = () => {
    setModalVisible(!isModalVisible);
  };
  const closemodal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);

      const res = await getTriphistory(fomData);
      console.log("formdata", res);
      if (res.data.status == true) {
        setLoading(false);
        settriphistory(res.data.data);
      } else {
        setLoading(false);
      }
    })();
  }, []);

  const Item = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 4,
          elevation: 5,
          borderRadius: 10,
          paddingBottom: 10,
          marginTop: 5,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 14, fontFamily: fonts.PoppinsRegular }}>
              {item.time}
            </Text>
            <Text style={{ fontSize: 14, fontFamily: fonts.PoppinsRegular }}>
              {item.date}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => toggleModal(item)}
            style={{ width: "28%", top: 20 }}
          >
            <Image
              source={{
                uri: `${item.dp}`,
              }}
              style={{ height: 80, width: 80, borderRadius: 100 / 2 }}
            />
          </TouchableOpacity>
          <View style={{ width: "40%", marginLeft: 15, top: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>

            {(item.ride_status == "complete" ||
              item.ride_status == "incomplete") && (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    paddingVertical: 5,
                    fontFamily: fonts.PoppinsBold,
                  }}
                >
                  ${item.ride_paid_amount}
                </Text>

                <Text
                  style={{
                    paddingVertical: 5,
                    marginLeft: 6,
                    fontFamily: fonts.PoppinsRegular,
                  }}
                >
                  {translation[250][selectedLanguages]}{" "}
                  {item.ride_payment_method}
                </Text>
              </View>
            )}

            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 5,

                  width: 200,
                }}
              >
                <Foundation
                  name="marker"
                  color={"red"}
                  size={22}
                  style={{ paddingTop: 2 }}
                />
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color={colors.menu}
                  size={22}
                  style={{ marginLeft: -16, marginTop: 30 }}
                />
                {/* <Foundation name="marker" color={"red"} size={22} /> */}

                <View>
                  <Text
                    numberOfLines={2}
                    style={{
                      paddingLeft: 5,
                      fontFamily: fonts.PoppinsRegular,
                    }}
                  >
                    {item.trip_from_address}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 5,
                  width: 200,
                }}
              >
                <Foundation
                  name="marker"
                  color={"red"}
                  size={22}
                  style={{ paddingTop: 1 }}
                />

                <View>
                  <Text
                    numberOfLines={2}
                    style={{
                      paddingLeft: 10,
                      fontFamily: fonts.PoppinsRegular,
                    }}
                  >
                    {item.trip_to_address}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {item.ride_status == "rejected" && (
            <View
              style={{
                backgroundColor: "#EB0101",
                width: "35%",
                marginLeft: "70%",
                height: 27,
                position: "absolute",
                marginTop: -35,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: fonts.PoppinsRegular,
                }}
              >
                {translation[53][selectedLanguages]}
                {/* {item.ride_status} */}
              </Text>
            </View>
          )}
          {item.ride_status == "incomplete" && (
            <View
              style={{
                backgroundColor: colors.yellow,
                width: "35%",
                marginLeft: "70%",
                height: 27,
                position: "absolute",
                marginTop: -35,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: fonts.PoppinsRegular,
                }}
              >
                {translation[54][selectedLanguages]}
                {/* {item.ride_status} */}
              </Text>
            </View>
          )}
          {item.ride_status == "complete" && (
            <View
              onPress={toggleModal1}
              style={{
                backgroundColor: "#2E8E22",
                right: 10,
                position: "absolute",
                marginTop: -35,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                padding: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: fonts.PoppinsRegular,
                }}
              >
                {translation[51][selectedLanguages]}
                {/* {item.ride_status} */}
              </Text>
            </View>
          )}

          {item.ride_status == "declined" && (
            <View
              onPress={toggleModal1}
              style={{
                backgroundColor: "#EE517A",
                right: 10,
                position: "absolute",
                marginTop: -35,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                padding: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: fonts.PoppinsRegular,
                }}
              >
                {translation[52][selectedLanguages]}
                {/* {item.ride_status} */}
              </Text>
            </View>
          )}

          {item.ride_status == "unresponded" && (
            <View
              style={{
                backgroundColor: "#E4DE1C",
                right: 10,
                position: "absolute",
                marginTop: -35,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                padding: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: fonts.PoppinsRegular,
                }}
              >
                {/* {translation[52][selectedLanguages]} */}
                {item.ride_status}
              </Text>
            </View>
          )}

          {item.ride_status == "cancel" && (
            <View
              style={{
                backgroundColor: "#E4DE1C",
                right: 10,
                position: "absolute",
                marginTop: -35,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                padding: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: fonts.PoppinsRegular,
                }}
              >
                {/* {translation[52][selectedLanguages]} */}
                {item.ride_status}
              </Text>
            </View>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isModalVisible}
        >
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: 10,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              paddingBottom: 30,
            }}
          >
            <View
              style={{
                alignItems: "flex-end",
                paddingRight: 10,
                paddingTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  closemodal();
                }}
              >
                <Image
                  source={cross}
                  resizemode="contain"
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>
                {/* Mark as */}
                {translation[110][selectedLanguages].trim()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={addtofaveretdriver}
                style={{
                  backgroundColor: colors.yellow,
                  width: "40%",
                  borderRadius: 15,
                  height: 30,
                  justifyContent: "center",
                  paddingLeft: 15,
                }}
              >
                <Text style={{ fontSize: 16, color: "black" }}>
                  {/* Favorite */}
                  {translation[111][selectedLanguages]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addtoblockdriver}
                style={{
                  backgroundColor: "red",
                  width: "40%",
                  borderRadius: 15,
                  height: 30,
                  justifyContent: "center",
                  paddingLeft: 15,
                }}
              >
                <Text style={{ fontSize: 16, color: "white" }}>
                  {/* Block */}
                  {translation[112][selectedLanguages]}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={closemodal}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ color: colors.yellow, fontSize: 16 }}>
                  {/* Cancel */}
                  {translation[99][selectedLanguages]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isModalVisible1}
        >
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: 10,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              paddingBottom: 30,
            }}
          ></View>
        </Modal>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Loading visible={loading} />
      <Headers1
        title={translation[13][selectedLanguages].trim()}
        // "Trip History"
      />
      {/* <View style={{ marginTop: 20, marginBottom: 10,  }}> */}
      <FlatList
        data={triphistory}
        renderItem={Item}
        keyExtractor={(item) => item}
      />
      {showAlert1 && (
        <AlertModal
          heading={msg}
          button1={translation[185][selectedLanguages]}
          // button1="OK"
          button2={translation[99][selectedLanguages]}
          // button2="Cancel"
          form="abc"
          onOkPress={() => {
            setShowAlert1(false);
          }}
        />
      )}
      {/* </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "110%",
    width: "110%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  inputContainer: {
    justifyContent: "center",
  },
  input: {
    height: 50,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: colors.primary,
    marginTop: 50,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 40 : 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
  },
});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  getTriphistory,
  blockdriver,
  addfavlocation,
  adddriverfaviriot,
})(TripHistory);
