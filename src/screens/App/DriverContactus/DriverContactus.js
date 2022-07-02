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
  Button,
} from "react-native";
import axios from "axios";
import Button1 from "../../../components/GradientButton";
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
import { Persons, addphoto, contactus } from "../../../assets";

import { GradientButton } from "../../../components/GradientButton";
import { GradientsigninButton } from "../../../components/GradientButton";
import { GradientfbButton } from "../../../components/GradientButton";
import { GradientGoogleButton } from "../../../components/GradientButton";
import Headers1 from "../../../components/Headers1";

//redux
import {
  signin,
  signupwithfb,
  drivercontactus,
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
import { useNavigation } from "@react-navigation/native";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");

const DriverContactus = ({
  signin,
  route,
  signupwithfb,
  drivercontactus,
  user,
  translation,
  selectedLanguages,
}) => {
  const navigation = useNavigation();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [feedback, setfeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const contactUS = async (item) => {
    if (!name) {
      // alert("please enter your name");
      alert(translation[136][selectedLanguages])
    } else if (!email) {
      // alert("please enter your email");
      alert(translation[223][selectedLanguages])
    } else if (!feedback) {
      alert(translation[148][selectedLanguages])
      // alert("please enter your feedback");
    } else {
      setLoading(true);
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("name", name);
      fomData.append("email", email);
      fomData.append("feedback", feedback);
      console.log('formdata is',fomData)
      const res = await drivercontactus(fomData);
      console.log(res);
      if (res.data.status == true) {
        setLoading(false);
        // //setunblock(res.data.data)
        alert(res.data.message);
        setname("");
        setemail("");
        setfeedback("");
      } else {
        setLoading(false);
      }
}
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}>
      <Headers1
        // title='Contact us'
        title={translation[67][selectedLanguages].trim()}
      />
      <Loading visible={loading} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}>
        <Image
          source={contactus}
          style={{
            height: 170,
            width: 280,
            borderRadius: 10,
          }}
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          flex: 1,
          marginTop: "20%",
          paddingHorizontal: 30,
        }}>
        <TextInput
          style={{ height: 40, backgroundColor: "white", marginTop: 10 }}
          // placeholder='Your name'
          placeholder={translation[68][selectedLanguages]}
          onChangeText={(name) => setname(name)}
          size={20}
          value={name}
          selectionColor={colors.gray}
          theme={{
            colors: { primary: colors.gray },
          }}
          // onChangeText={text => onChange(text)}
          // value={value}
        />
        <TextInput
          style={{ height: 40, backgroundColor: "white", marginTop: 20 }}
          // placeholder='Email'
          placeholder={translation[69][selectedLanguages]}
          value={email}
          onChangeText={(name) => setemail(name)}
          selectionColor={colors.gray}
          size={20}
          theme={{
            colors: { primary: colors.gray },
          }}
          // onChangeText={text => onChange(text)}
          // value={value}
        />
        <TextInput
          style={{ height: 40, backgroundColor: "white", marginTop: 20 }}
          // placeholder='Feedback'
          placeholder={translation[70][selectedLanguages]}
          onChangeText={(name) => setfeedback(name)}
          selectionColor={colors.gray}
          value={feedback}
          size={20}
          theme={{
            colors: { primary: colors.gray },
          }}
          // onChangeText={text => onChange(text)}
          // value={value}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginTop: 60,
          marginBottom: 40,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => contactUS()}
          style={{
            backgroundColor: colors.yellow,
            borderRadius: 7,
            height: 55,
            width: "96%",
            marginLeft: 9,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.black,
              fontWeight: "bold",
              textAlign: "center",
              justifyContent: "center",
              textAlignVertical: "center",
              marginTop: 15,
            }}>
            {translation[71][selectedLanguages]}
            {/* Send */}
          </Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps, {
  drivercontactus,
})(DriverContactus);
