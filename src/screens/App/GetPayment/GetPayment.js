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
import Modal from "react-native-modal";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
// import auth from "@react-native-firebase/auth";
//logo
import { Persons, addphoto } from "../../../assets";

import { GradientButton } from "../../../components/GradientButton";
import { GradientsigninButton } from "../../../components/GradientButton";
import { GradientfbButton } from "../../../components/GradientButton";
import { GradientGoogleButton } from "../../../components/GradientButton";
import Headers1 from "../../../components/Headers1";

//redux
import {
  signin,
  signupwithfb,
  editProfile,
  addammount,
  tripCoast,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge } from "react-native-elements";
// import ChooseCode from '../../../components/ChooseCode';
// import countrypicker from '../../../components/countrypicker';
import fonts from "../../../theme/fonts";
import SelectDropdown from "react-native-select-dropdown";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
const GetPayment = ({
  signin,
  route,
  signupwithfb,
  editProfile,
  selectedLanguages,
  translation,
  user,
  tripCoast,
  addammount,
}) => {
  const navigation = useNavigation();

  const [amount, setamount] = useState();
  const [tammount, settammount] = useState();
  const { tripId } = route.params;
  const { uid } = route.params;

  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const formData = new FormData();
      formData.append("trip_id", tripId);

      const res = await tripCoast(formData);
      console.log("trip coast is", res, uid, tripId);
      if (res.data.status == true) {
        settammount(res.data.data);
      } else {
      }
    })();
  });

  const updatePro = async (id) => {
    if (!amount) {
      // setMsg('Kindly Enter Your ammount');
      setMsg(translation[240][selectedLanguages]);
      setShowAlert(true);
    } else if (parseInt(amount) < parseInt(tammount)) {
      // setMsg('You are not allowed to enter an amount less than the actual amount!');
      setMsg(translation[241][selectedLanguages]);
      setShowAlert(true);
    } else {
      setLoading(true);
      const formData = new FormData();

      formData.append("trip_id", tripId);
      formData.append("amount", amount);
      formData.append("amount_to_pay", tammount);
      formData.append("u_id", uid);
      formData.append("status", "Cash");

      const res = await addammount(formData);
      console.log("ammount to pay is", res, formData);
      if (res.data.status == true) {
        // setMsg(res.data.message);
        setamount("");
        // setShowAlert(true);
        setLoading(false);
        navigation.navigate("Ratings", {
          data: res.data.data,
        });
      } else {
        setLoading(false);
        setLoading(true);
      }
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1
        title={translation[242][selectedLanguages]}
        // title= "Add Payment"
      />
      <Loading visible={loading} />
      <View
        style={{
          justifyContent: "center",
          marginTop: "60%",
          borderWidth: 0,
          alignSelf: "center",
        }}
      >
        <Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 22 }}>
          {tammount}lv
        </Text>
      </View>
      <View>
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

        <View
          style={{
            justifyContent: "center",
            flex: 1,
            marginTop: "30%",
            paddingHorizontal: 30,
          }}
        >
          <TextInput
            style={{ height: 50, backgroundColor: "white" }}
            // placeholder={translation[69][selectedLanguages]}
            placeholder={translation[241][selectedLanguages]}
            // "Add Payment"
            selectionColor={colors.primary}
            onChangeText={(email) => setamount(email)}
            theme={{
              colors: { primary: colors.primary },
            }}
            // onChangeText={text => onChange(text)}
            value={amount}
          />
        </View>
        <View style={{ flex: 1, marginTop: 70, paddingHorizontal: 10 }}>
          <GradientButton
            title={translation[115][selectedLanguages]}
            // title= "Submit"
            onButtonPress={() => {
              updatePro();
              // navigation.navigate("ListDriver");
              // handleLogin();
            }}
          />
        </View>
      </View>
    </ScrollView>
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
export default connect(mapStateToProps, { tripCoast, addammount })(GetPayment);
