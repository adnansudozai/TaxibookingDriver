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
import { Persons, addphoto, camera } from "../../../assets";

import { GradientButton } from "../../../components/GradientButton";
import { GradientsigninButton } from "../../../components/GradientButton";
import { GradientfbButton } from "../../../components/GradientButton";
import { GradientGoogleButton } from "../../../components/GradientButton";
import Headers1 from "../../../components/Headers1";
import messaging from "@react-native-firebase/messaging";

//redux
import {
  signin,
  signupwithfb,
  updatedriverProfile,
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
import { dummy } from "../../../assets/index";
import {
  notificationListener,
  requestUserPermission,
} from "../../../components/Notificationservice";
import { useNavigation } from "@react-navigation/native";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
import { storeurl, baseurl } from "./../../../redux/actions/storeurl";
const ImagePicker = require("react-native-image-picker");

const DriverProfile = ({
  signin,
  route,
  signupwithfb,
  updatedriverProfile,
  userData,
  tokenupdate,
  translation,
  selectedLanguages,
}) => {
  console.log("baseurl", baseurl);
  const navigation = useNavigation();

  const [profilePath, setproilePath] = useState("");

  const [Taxiimg, setTaxiimg] = useState("");
  const [Texiserveselicance, setTexiserveselicance] = useState("");
  const [license, setlicense] = useState("");

  const [loading, setLoading] = useState(false);
  const [name, setname] = useState(userData != null ? userData.name : "");

  const [email, setemail] = useState(userData != null ? userData.email : "");

  const [carmake, setcarmake] = useState(
    userData != null ? userData.car_make : ""
  );
  const [carmodel, setcarmodel] = useState(
    userData != null ? userData.car_model : ""
  );
  const [taxilincnum, settaxilincnum] = useState(
    userData != null ? userData.taxi_license_no : ""
  );
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [privilidge, setprivilidge] = useState("");

  console.log("userData", userData);

  // const [taxiplaner, settaxiplaner] = useState(userData!=null?userData.planer:'');

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  const updatePro = async (id) => {

    if (!carmake) {
      // setMsg("Enter Car Make");
      setMsg(translation[302][selectedLanguages]);
      setShowAlert(true);
      setShowAlert(true);
    } else if (!carmodel) {
      // setMsg("Enter Car Model");
      setMsg(translation[301][selectedLanguages]);
      setShowAlert(true);
      setShowAlert(true);
    } else if (!taxilincnum) {
      // setMsg("Enter Taxi license Number");
      setMsg(translation[300][selectedLanguages]);
      setShowAlert(true);
    } else if (!name) {
      // setMsg("Please enter your name");
      setMsg(translation[136][selectedLanguages]);
      setShowAlert(true);
    } else if (!email) {
      // setMsg("Please Enter your email");
      setMsg(translation[223][selectedLanguages]);
      setShowAlert(true);
    } else {
      const fcmToken = await messaging().getToken();

      const formData = new FormData();

      if (profilePath != "") {
        formData.append("dp", {
          uri: profilePath.uri,
          name: profilePath.fileName,
          type: profilePath.type,
        });
      } else {
        // setMsg(translation[330][selectedLanguages]);
        // // Please Upload Profile Picture
        // setShowAlert(true);
        // return false;
      }

      console.log("myconsoledata", translation);

      if (Taxiimg != "") {
        formData.append("mytaxi_pic", {
          uri: Taxiimg.uri,
          name: Taxiimg.fileName,
          type: Taxiimg.type,
        });
      } else {
        // setMsg(translation[332][selectedLanguages]);
        // // Please Upload Taxi picture
        // setShowAlert(true);
        // return false;
      }

      if (Texiserveselicance != "") {
        formData.append("my_taxi_service_license", {
          uri: Texiserveselicance.uri,
          name: Texiserveselicance.fileName,
          type: Texiserveselicance.type,
        });
      } else {
        // setMsg(translation[331][selectedLanguages]);
        // // Please Upload Taxi Service license
        // setShowAlert(true);
        // return false;
      }

      if (license != "") {
        formData.append("my_driver_license", {
          uri: license.uri,
          name: license.fileName,
          type: license.type,
        });
      } else {
        // setMsg(translation[333][selectedLanguages]);
        // // Please Upload Driving license
        // setShowAlert(true);
        // return false;
      }

      setLoading(true);

      formData.append("car_make", carmake);
      formData.append("car_model", carmodel);
      formData.append("taxi_license_no", taxilincnum);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("fcm_token", fcmToken);
      formData.append("u_id", userData.u_id);

      console.log("driverdata", formData);

      const res = await updatedriverProfile(formData);
      console.log("responsedata", formData);
      console.log("responsedata", res);
      if (res.data.status == true) {
        setLoading(false);
        if (res.data.data.user_privilidge == 2) {
          navigation.navigate("DriverPreferences");
        } else if (res.data.data.user_privilidge == 0) {
          setMsg(res.data.message);
          setShowAlert(true);
        } else if (res.data.data.user_privilidge == 1) {
          // setMsg("Your account is blocked, please contact support");
          setMsg(translation[126][selectedLanguages]);
          setShowAlert(true);
        }

        setLoading(false);
      } else {
        setLoading(false);
        alert(res.data.message);
      }
    }
  };

  const chooseProfile = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose Photo from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        let source = response;

        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setproilePath(source);
      }
    });
  };

  const chooseTaxiimg = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose Photo from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setTaxiimg(source);
      }
    });
  };

  const chooseTexiserveselicance = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose Photo from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setTexiserveselicance(source);
      }
    });
  };

  const chooselicense = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose Photo from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setlicense(source);
      }
    });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {userData && (
        <View>
          <Headers1
            title={translation[21][selectedLanguages].trim()}
            // title='Driver Profile'
            value={5}
          />
          <Loading visible={loading} />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margintop: 16,
            }}
          >
            <TouchableOpacity onPress={chooseProfile}>
              {profilePath != "" && (
                <Image
                  source={profilePath}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                  }}
                />
              )}

              {profilePath == "" && (
                <Image
                  source={{
                    uri: userData.dp,
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          {showAlert && (
            <AlertModal
              heading={msg}
              button1={translation[185][selectedLanguages]}
              // button1="OK"
              button2={translation[99][selectedLanguages]}
              // button2="Cancel"
              form="abc"
              onOkPress={() => {
                setShowAlert(false);
              }}
            />
          )}
          {userData.user_privilidge == 2 && (
            <TouchableOpacity
              onPress={chooseProfile}
              style={{
                borderWidth: 0,
                flex: 1,
                borderRadius: 100 / 2,
                height: 30,
                width: 30,
                backgroundColor: colors.yellow,
                marginTop: 135,
                marginLeft: 215,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              {/* <FontAwesome name='camera' color={colors.yellow} size={25} /> */}

              <Image
                source={camera}
                resizeMode={"contain"}
                style={{
                  height: 15,
                  width: 15,
                }}
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              marginTop: "5%",
              paddingHorizontal: 30,
            }}
          >
            <TextInput
              style={{ height: 40, backgroundColor: "white", marginTop: 10 }}
              placeholder="Osmanek Yilmaz"
              size={20}
              onChangeText={(name) => setname(name)}
              value={name}
              selectionColor={colors.gray}
              theme={{
                colors: { primary: colors.gray },
              }}
              // onChangeText={text => onChange(text)}
              // value={value}
            />
            <TextInput
              style={{ height: 40, backgroundColor: "white", marginTop: 10 }}
              placeholder="Osmanek2022@gmail.com"
              selectionColor={colors.gray}
              onChangeText={(mail) => setemail(mail)}
              value={email}
              size={20}
              theme={{
                colors: { primary: colors.gray },
              }}
            />
            <TextInput
              style={{ height: 40, backgroundColor: "white", marginTop: 10 }}
              placeholder="Car Make"
              selectionColor={colors.gray}
              onChangeText={(name) => setcarmake(name)}
              value={carmake}
              size={20}
              theme={{
                colors: { primary: colors.gray },
              }}
            />
            <TextInput
              style={{ height: 40, backgroundColor: "white", marginTop: 10 }}
              placeholder="Car Model"
              selectionColor={colors.gray}
              onChangeText={(name) => setcarmodel(name)}
              value={carmodel}
              size={20}
              theme={{
                colors: { primary: colors.gray },
              }}
            />
            <TextInput
              style={{ height: 40, backgroundColor: "white", marginTop: 10 }}
              placeholder="Taxi license Number"
              selectionColor={colors.gray}
              onChangeText={(name) => settaxilincnum(name)}
              value={taxilincnum}
              size={20}
              theme={{
                colors: { primary: colors.gray },
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 40,
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                // fontWeight: "bold",
                fontFamily: fonts.PoppinsBold,
              }}
            >
              {translation[22][selectedLanguages].trim()}
              {/* My taxi */}
            </Text>

            {Taxiimg != "" && (
              <View>
                <Image
                  source={Taxiimg}
                  style={{
                    height: 125,
                    width: 125,
                    borderRadius: 13,
                    marginTop: 20,
                  }}
                />
              </View>
            )}

            {Taxiimg == "" && (
              <View>
                <Image
                  source={{
                    uri: userData.picture_of_car,
                  }}
                  style={{
                    height: 125,
                    width: 125,
                    borderRadius: 13,
                    marginTop: 20,
                  }}
                />
              </View>
            )}
            {userData.user_privilidge == 2 && (
              <TouchableOpacity
                onPress={chooseTaxiimg}
                style={{
                  borderWidth: 0,
                  flex: 1,
                  borderRadius: 100 / 2,
                  height: 30,
                  width: 30,
                  backgroundColor: colors.yellow,
                  marginTop: 27,
                  marginLeft: 133,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                }}
              >
                {/* <FontAwesome name='camera' color={colors.yellow} size={25} /> */}

                <Image
                  source={camera}
                  resizeMode={"contain"}
                  style={{
                    height: 15,
                    width: 15,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 20,
              paddingHorizontal: 30,
            }}
          >
            <Text style={{ fontSize: 17, fontFamily: fonts.PoppinsBold }}>
              {translation[23][selectedLanguages].trim()}
              {/* My taxi service license */}
            </Text>

            {Texiserveselicance == "" && (
              <View>
                <Image
                  source={{
                    uri: userData.taxi_service_license,
                  }}
                  //  source={Texiserveselicance}
                  style={{
                    height: 125,
                    width: 125,
                    borderRadius: 13,
                    marginTop: 20,
                  }}
                />
              </View>
            )}
            {Texiserveselicance != "" && (
              <View>
                <Image
                  source={Texiserveselicance}
                  style={{
                    height: 125,
                    width: 125,
                    borderRadius: 13,
                    marginTop: 20,
                  }}
                />
              </View>
            )}
            {userData.user_privilidge == 2 && (
              <TouchableOpacity
                onPress={chooseTexiserveselicance}
                style={{
                  borderWidth: 0,
                  flex: 1,
                  borderRadius: 100 / 2,
                  height: 30,
                  width: 30,
                  backgroundColor: colors.yellow,
                  marginTop: 27,
                  marginLeft: 133,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                }}
              >
                {/* <FontAwesome name='camera' color={colors.yellow} size={25} /> */}
                <Image
                  source={camera}
                  resizeMode={"contain"}
                  style={{
                    height: 15,
                    width: 15,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 20,
              paddingHorizontal: 30,
            }}
          >
            <Text style={{ fontSize: 17, fontFamily: fonts.PoppinsBold }}>
              {translation[24][selectedLanguages].trim()}
              {/* My driving license */}
            </Text>
            {license == "" && (
              <View>
                <Image
                  source={{
                    uri: userData.driver_license,
                  }}
                  //  source={Texiserveselicance}
                  style={{
                    height: 125,
                    width: 125,
                    borderRadius: 13,
                    marginTop: 20,
                  }}
                />
              </View>
            )}
            {license != "" && (
              <View>
                <Image
                  // source={{
                  //   uri: license,
                  // }}
                  source={license}
                  style={{
                    height: 125,
                    width: 125,
                    borderRadius: 13,
                    marginTop: 20,
                  }}
                />
              </View>
            )}
            {/* <View style={{ position: "absolute", top: 25, left: 140 }}>
          <FontAwesome name='camera' color={colors.yellow} size={25} />
        </View> */}
            {userData.user_privilidge == 2 && (
              <TouchableOpacity
                style={{
                  borderWidth: 0,
                  flex: 1,
                  borderRadius: 100 / 2,
                  height: 30,
                  width: 30,
                  backgroundColor: colors.yellow,
                  marginTop: 27,
                  marginLeft: 133,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                }}
                onPress={chooselicense}
              >
                {/* <FontAwesome name='camera' color={colors.yellow} size={25} /> */}
                <Image
                  source={camera}
                  resizeMode={"contain"}
                  style={{
                    height: 15,
                    width: 15,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 15,
              marginRight: 15,
              marginTop: 60,
              marginBottom: 140,
              paddingHorizontal: 10,
            }}
          >
            {userData.user_privilidge == 2 && (
              <TouchableOpacity
                style={{
                  marginTop: 5,
                  backgroundColor: colors.yellow,
                  borderRadius: 7,
                  marginBottom: 10,
                  height: 55,
                }}
                onPress={() => updatePro()}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.black,
                    fontWeight: "bold",
                    textAlign: "center",
                    justifyContent: "center",
                    textAlignVertical: "center",
                    marginTop: 13,
                  }}
                >
                  {translation[25][selectedLanguages].trim()}
                  {/* Request to update */}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
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
  const { user, translation, selectedLanguages } = state.auth;

  return {
    userData: user,
    translation,
    selectedLanguages,
  };
};
export default connect(mapStateToProps, {
  updatedriverProfile,
})(DriverProfile);
