import React, { useReducer, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import CustomText from "../../../components/Text";
import styles from "./styles";
import { SocialButton } from "../../../components/SocialButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//google
import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import { set } from "react-native-reanimated";
import { Input } from "../../../components/Input/Input";
import {
  GradientButton,
  GradientsigninButton,
} from "../../../components/GradientButton";
import { connect } from "react-redux";
import { resetPassword, updatePassword } from "../../../redux/actions/auth";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import {
  logo_blue,
  google,
  fb,
  logout,
  eye,
  key,
  user,
  call,
  mail,
  arrowright,
  Iconkey,
  Visible_multicolored,
} from "../../../assets";
import { CommonActions } from "@react-navigation/native";
import fonts from "../../../theme/fonts";
const Reset = ({
  navigation,
  resetPassword,
  route,
  updatePassword,
  userData,
}) => {
  // const {from} = route?.params;
  const [isSecure1, setisSecure1] = useState(true);
  const [isSecure, setisSecure] = useState(true);
  const [cnf, setCnf] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlePress = () => {
    if (!pass) {
      setMsg("Kindly Enter New Password");
      setShowAlert(true);
    } else if (!cnf) {
      setMsg("Kindly Confirm Password");
      setShowAlert(true);
    } else if (cnf != pass) {
      setMsg("Password did not match");
      setShowAlert(true);
    } else {
      setLoading(true);
      const phoneNumber = route?.params?.phoneNumber;
      const formData = new FormData();
      from == "otp" && formData.append("phone_no", phoneNumber);
      formData.append("password", pass);
      new Promise((rsl, rej) => {
        from == "otp"
          ? resetPassword(formData, rsl, rej)
          : updatePassword(
              formData,
              userData?.auth,
              userData.phone_no,
              rsl,
              rej
            );
      })
        .then((res) => {
          setLoading(false);
          setMsg(res);
          setShowAlert(!showAlert);

          setTimeout(() => {
            from == "otp"
              ? navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  })
                )
              : navigation.goBack();
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
          setMsg(err);
          setShowAlert(!showAlert);
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          }, 2000);
        });
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={{ justifyContent: "center", flex: 0.7 }}>
          <CustomText
            title={"Reset Password"}
            type={"large"}
            color={colors.yellow}
            style={{
              fontSize: 28,
              marginLeft: 20,
              marginTop: 22,
              fontWeight: "bold",
            }}
          />
          <Text
            style={{
              fontSize: 14,
              marginLeft: 20,
              marginTop: 12,
              marginBottom: 20,
              fontFamily: fonts.PoppinsRegular,
            }}
          >
            Enter Your new password below
          </Text>

          {/* <Input
            keyboardType={'phone-pad'}
            placeholder={'Phone'}
            onChangeText={e => {
              console.log(e);
            }}
            left={call}
          /> */}
          <Input
            keyboardType={"default"}
            isSecure={isSecure1}
            value={pass}
            placeholder={"New Password"}
            onChangeText={(e) => {
              setPass(e);
              console.log(e);
            }}
            right={Visible_multicolored}
            left={Iconkey}
            onRightIconPress={() => {
              setisSecure1(!isSecure1);
            }}
          />
          <Input
            keyboardType={"default"}
            isSecure={isSecure}
            value={cnf}
            placeholder={"Confirm New Password"}
            onChangeText={(e) => {
              console.log(e);
              setCnf(e);
            }}
            right={Visible_multicolored}
            left={Iconkey}
            onRightIconPress={() => {
              setisSecure(!isSecure);
            }}
          />
          <View style={{ marginTop: 50 }}>
            <GradientButton
              title="Reset Password"
              iconRight={arrowright}
              onButtonPress={() => {
                // handlePress();
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {showAlert && (
        <AlertModal
          heading={msg}
          button1="OK"
          form={true}
          onOkPress={() => {
            setShowAlert(false);
          }}
        />
      )}
      <Loading visible={loading} />
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { userData: user };
};
export default connect(mapStateToProps, { resetPassword, updatePassword })(
  Reset
);
