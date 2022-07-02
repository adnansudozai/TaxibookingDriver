/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import {
  GradientButton,
  GradientsigninButton,
} from "../../../components/GradientButton";
import colors from "../../../theme/colors";
import {
  logo_blue,
  envalop,
  logocolored,
  Logo1,
  applogo,
  Logo2,
  logoeng,
} from "../../../assets";
import AlertModal from "../../../components/AlertModal";
import CountDown from "react-native-countdown-component";

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get("window");
import OTPInputView from "@twotalltotems/react-native-otp-input";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  confirmOTP,
  authState,
  signInWithPhone,
  signup,
  deleteacct,
  checkPhoneNo,
  updateProfileIno1,
  signin,
} from "../../../redux/actions/auth";
import { Loading } from "../../../components/Loading";
import fonts from "../../../theme/fonts";
import { CommonActions } from "@react-navigation/routers";
import RNOtpVerify from "react-native-otp-verify";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const OtpSignUp = ({
  navigation,
  route,
  signin,
  confirmOTP,
  translation,
  selectedLanguages,
}) => {
  const [otp, setotp] = useState("");
  const [otp1, setotp1] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [random, setrandom] = useState("");

  const { phoneNumber } = route.params;
  const { confirmation } = route.params;
  console.log("firstdata", phoneNumber, confirmation);
  useEffect(() => {
    RNOtpVerify.getHash()
      .then((res) => console.log("hash is", res))
      .catch(console.log);
    RNOtpVerify.getOtp()
      .then((p) => RNOtpVerify.addListener(otpHandler))
      .catch((p) => console.log(p));
    return () => RNOtpVerify.removeListener();
  }, [random]);

  const otpHandler = (message) => {
    console.log("message", message);
    // const otp1 = /(\d{6})/g.exec(message)[0];
    // console.log('otp1', otp1)
    const otp1 = message.split(" ")[0];
    setotp(otp1);
    setotp1(otp1);

    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };

  const subbmitotp = () => {
    if (otp == "" || otp1 == "") {
      alert("Something went wrong");
      return false;
    } else if (otp == otp1) {
    } else {
      alert("Otp Mismatched");
      return false;
    }

    (async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("phone_no", phoneNumber);
      formData.append("status", "driver");
      console.log("response from data", formData);
      const res = await signin(formData);
      if (res.data.status == true) {
        setLoading(false);
        if (res.data.data.user_privilidge == 1) {
          setShowAlert(true);
          // setMsg("Your account is blocked,please contact support");
          setMsg(translation[126][selectedLanguages]);
        } else {
          if (res.data.data.is_first_registered == 0) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "DriverProfile" }],
              })
            );
          } else if (res.data.data.is_first_registered == 1) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Map" }],
              })
            );
          }
        }
      } else {
        alert(res.data.message);
        setLoading(false);
        navigation.navigate("Signup");
      }
    })();
  };

  async function signInWithPhoneNumber(phoneNumber) {
    setotp("");
    setotp1("");

    setLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("myconfirmation", confirmation);
    // setConfirm(confirmation);
    if (confirmation) {
      navigation.navigate("OtpSignUp", {
        phoneNumber: phoneNumber,
        confirmation: confirmation,
      });
      setLoading(false);
      setdisabled(true);
      setrandom(Math.random());
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={selectedLanguages == "Bulgarian" ? Logo2 : logoeng}
          style={styles.logo_blue}
        />
        <Loading visible={loading} />
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            {translation[3][selectedLanguages]}
            {/* An Sms has been sent to you at */}
          </Text>
          <Text
            style={[
              styles.text,
              {
                paddingTop: 10,
                color: colors.black,
              },
            ]}
          >
            {phoneNumber}
          </Text>

          {disabled == true && (
            <View style={{ flexDirection: "row", marginVertical: 20 }}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color="gray"
                style={{ alignSelf: "center" }}
              />

              <View style={{ flexDirection: "row" }}>
                <CountDown
                  until={60}
                  size={15}
                  onFinish={() => setdisabled(false)}
                  digitStyle={{
                    backgroundColor: "transparent",
                    marginLeft: -3,
                  }}
                  digitTxtStyle={{ color: "gray" }}
                  timeToShow={["S"]}
                  timeLabels={{ m: "", s: "" }}
                />
                <Text style={{ alignSelf: "center", marginLeft: -8 }}>
                  {/* s */}
                  {translation[186][selectedLanguages]}
                </Text>
              </View>
            </View>
          )}

          {disabled == false && (
            <TouchableOpacity
              onPress={() => signInWithPhoneNumber(phoneNumber)}
            >
              <Text
                style={[
                  styles.text,
                  {
                    paddingTop: 30,
                    color: colors.yellow,
                    fontSize: 16,
                  },
                ]}
              >
                {translation[127][selectedLanguages]}
                {/* Resend Code */}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.phoneNumberContainer}>
            <OTPInputView
              style={{
                width: "60%",
                height: 30,
              }}
              pinCount={6}
              code={otp}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(otp) => {
                otpHandler(otp);
              }}
              onCodeChanged={(text) => setotp1(text)}
            />
          </View>
          <Text
            style={[
              styles.text,
              {
                paddingTop: 20,
                fontFamily: fonts.PoppinsRegular,
                color: "black",
              },
            ]}
          >
            {translation[4][selectedLanguages]}
            {/* Please enter the verification code above */}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => subbmitotp()}
          style={{
            width: "75%",
            height: 50,
            backgroundColor: colors.yellow,
            borderRadius: 13,
            justifyContent: "center",
            marginVertical: 50,
            marginHorizontal: 80,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 22,
            }}
          >
            {translation[115][selectedLanguages]}
            {/* Submit */}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{ marginTop: 70, marginHorizontal: 10, elevation: 1 }}>
          <GradientButton
            title="Sign in"
            onButtonPress={() => subbmitotp()}
          />
        </View> */}
      {/* {this.state.show && (
      <AlertModal
        heading={this.state.msg}
        button1="OK"
        form={true}
        onOkPress={() => {
          // this.setState({ show: false });
        }}
      />
    )} */}
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  signin,
  confirmOTP,
})(OtpSignUp);
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  wrapper: {
    alignItems: "center",
    width: "90%",
  },
  logo_blue: {
    height: 150,
    width: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: "20%",
  },
  text: {
    fontSize: 16,
    // color: colors.camera,
    paddingTop: 30,
    // fontFamily: fonts.PoppinsMedium,
    textAlign: "center",
    // fontWeight: "bold",
    fontFamily: fonts.PoppinsRegular,
    color: "black",
  },
  phoneNumberContainer: {
    // marginTop: 50,
    marginBottom: 20,
  },
  timerContainer: {
    width: "80%",
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: colors.white,
    width: 100,
    height: 50,
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily: fonts.PoppinsRegular,

    textAlign: "center",
  },
  btnContainer: {
    width: DEVICE_WIDTH > 700 ? "80%" : "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  primaryBtn: {
    width: DEVICE_WIDTH > 700 ? "80%" : "90%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: fonts.PoppinsRegular,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    // borderColor: color.primary,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,

    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
  },

  underlineStyleHighLighted: {
    borderColor: colors.gray,
  },
});
