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
  TextInput,
} from "react-native";
import axios from "axios";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
// import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
// import auth from "@react-native-firebase/auth";
//logo
import { MaskGroup } from "../../../assets";
import { GradientButton } from "../../../components/GradientButton";

//redux
import {
  signin,
  signupwithfb,
  transactionHistory,
  withdrawammount,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
import { Header, Badge } from "react-native-elements";
import fonts from "../../../theme/fonts";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import Headers1 from "../../../components/Headers1";
import { languages } from "unique-names-generator";

const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
var data = [1, 2, 3, 4, 5, 6];
const Wallet = ({
  signin,
  route,
  signupwithfb,
  transactionHistory,
  translation,
  selectedLanguages,
  withdrawammount,
  user,
}) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);

  const [msg, setmsg] = useState();
  const [withdraw, setwithdraw] = useState("");
  const [topup, settopup] = useState("");
  const [loading, setloading] = useState(false);
  const [withdrawdata, setwithdrawdata] = useState([]);
  const [Dataa, setDataa] = useState([]);
  const [rand, setrand] = useState(Math.random());

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const fomData = new FormData();
        fomData.append("u_id", user.u_id);

        const res = await transactionHistory(fomData);

        console.log("formdata", fomData);

        if (res.data.status == true) {
          setDataa(res.data.data);
        } else {
        }
      })();
    }, [rand])
  );

  const wiithdrawhandle = async (item) => {
    if (!withdraw) {
      // setmsg("Enter Your Ammount");
      setmsg(translation[251][selectedLanguages]);
      setShowAlert(true);
    } else if (parseInt(user.myblnc) < parseInt(withdraw)) {
      // setmsg("Insufficient balance");
      setmsg(translation[252][selectedLanguages]);
      setShowAlert(true);
    } else {
      setloading(true);
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("amount", withdraw);
      console.log(fomData);
      const res = await withdrawammount(fomData);

      console.log("withdraw ammount", res, fomData);
      console.log(res);
      if (res.data.status == true) {
        setwithdraw("");
        // setmsg(res.data.message);
        // Withdrawl request initiated
        setmsg(translation[256][selectedLanguages]);
        setShowAlert(true);
        setloading(false);
      } else {
        setloading(false);
      }
    }
  };
  const topUphandle = async (item) => {
    if (!topup) {
      // setmsg("Enter Your Ammount");
      setmsg(translation[251][selectedLanguages]);
      setShowAlert(true);
    } else {
      navigation.navigate("BillingPayment", {
        payment: topup,
        screen: "wallet",
      });
      settopup("");
    }
  };
  const renderItem = ({ item, index }) => {
    // console.log("item is", item.damount);
    return (
      // <View style={{ marginBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "5%",
          // paddingBottom: 15,
        }}>
        <View style={{ width: "18%" }}>
          <Image source={MaskGroup} style={{ height: 60, width: 60 }} />
        </View>
        <View style={{ width: "60%" }}>
          <Text
            style={{
              paddingVertical: 6,
            }}>
            {/* Taximat */}
            {translation[32][selectedLanguages]}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: colors.darkgray,
              fontWeight: "bold",
            }}>
            {item.trans_time}
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: colors.darkgray,
              fontWeight: "bold",
            }}>
            {/* Negative Balance Settled */}
            {/* {translation[33][selectedLanguages]} */}
            {item.tagline}
          </Text>
        </View>
        {item.camount != 0 && (
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                color: colors.darkgray,
                marginTop: 25,
                marginRight: 10,
              }}>
              {item.camount}lv
            </Text>
          </View>
        )}
        {item.damount != 0 && (
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                color: colors.darkgray,
                marginTop: 20,
                marginRight: 10,
              }}>
              -{item.damount}lv
            </Text>
          </View>
        )}
      </View>
      // </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Loading visible={loading} />
      <Headers1
        title={translation[16][selectedLanguages]}
        // "Wallet"
      />
      {showAlert && (
        <AlertModal
          heading={msg}
          button1={translation[185][selectedLanguages]}
          // button1="OK"
          button2={translation[99][selectedLanguages]}
          // button2="Cancel"
          onOkPress={() => {
            setShowAlert(false);
          }}
          form="abc"
        />
      )}
      <ScrollView>
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
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginBottom: 5,
            borderRadius: 5,
            paddingVertical: 10,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginHorizontal: 4,
                }}
              >
                {/* Topup */}
                {translation[27][selectedLanguages]}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 10,
                  fontFamily: fonts.PoppinsRegular,
                  color: "black",
                  marginHorizontal: 4,
                }}
              >
                {/* Write amount to add balance to your wallet to enjoy seemless
              journeys */}
                {translation[28][selectedLanguages]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                marginTop: "5%",
              }}
            >
              <TextInput
                style={{
                  height: 50,
                  backgroundColor: "white",
                  marginTop: 10,
                  borderBottomWidth: 1,
                  padding: 10,
                  marginHorizontal: 10,
                }}
                placeholderTextColor="black"
                color="black"
                onChangeText={(text) => settopup(text)}
                keyboardType={"number-pad"}
                placeholder="0.00lv"
                value={topup}
                selectionColor={colors.primary}
                theme={{
                  colors: { primary: colors.primary },
                }}
                // onChangeText={text => onChange(text)}
                // value={value}
              />
            </View>
            <TouchableOpacity
              onPress={() => topUphandle()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                height: 35,
                backgroundColor: colors.yellow,
                borderRadius: 20,
                marginTop: 20,
                marginBottom: 15,
                marginHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {/* Topup */}
                {translation[27][selectedLanguages]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginBottom: 5,
            borderRadius: 5,
            paddingVertical: 10,
            marginTop: 20,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginHorizontal: 4,
                }}
              >
                {/* Withdraw */}
                {translation[29][selectedLanguages]}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 10,
                  fontFamily: fonts.PoppinsRegular,
                  color: "black",
                  marginHorizontal: 4,
                }}
              >
                {/* Enter the amount you wish to withdraw from your balance */}
                {translation[30][selectedLanguages]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                marginTop: "5%",
              }}
            >
              <TextInput
                style={{
                  height: 50,
                  backgroundColor: "white",
                  marginTop: 10,
                  borderBottomWidth: 1,
                  padding: 10,
                  marginHorizontal: 10,
                }}
                placeholderTextColor="black"
                color="black"
                keyboardType={"number-pad"}
                onChangeText={(text) => setwithdraw(text)}
                placeholder="0.00lv"
                value={withdraw}
                selectionColor={colors.primary}
                theme={{
                  colors: { primary: colors.primary },
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => wiithdrawhandle()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                height: 35,
                backgroundColor: colors.yellow,
                borderRadius: 20,
                marginTop: 20,
                marginBottom: 15,
                marginHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {/* Withdraw */}
                {translation[29][selectedLanguages]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginBottom: 15,
            borderRadius: 5,
            paddingVertical: 10,
            marginTop: 20,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{}}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {/* Transactions */}
                {translation[31][selectedLanguages]}
              </Text>
            </View>
          </View>
          <FlatList
            data={Dataa}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  withdrawammount,
  transactionHistory,
})(Wallet);
