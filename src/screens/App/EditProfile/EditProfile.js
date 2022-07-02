/** @format */

// import React, { useEffect, useState, useRef } from "react";
// import {
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
//   Platform,
//   Image,
//   StyleSheet,
//   Pressable,
//   ScrollView,
//   Dimensions,
//   FlatList,
//   ImageBackground,
// } from "react-native";
// import axios from "axios";
// import Modal from "react-native-modal";
// import CustomText from "../../../components/Text";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Input, InputPhone } from "../../../components/Input/Input";
// import { CommonActions } from "@react-navigation/routers";

// import colors from "../../../theme/colors";
// import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Entypo from "react-native-vector-icons/Entypo";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import auth from "@react-native-firebase/auth";
// //logo
// import { Persons, addphoto } from "../../../assets";

// import { GradientButton } from "../../../components/GradientButton";
// import { GradientsigninButton } from "../../../components/GradientButton";
// import { GradientfbButton } from "../../../components/GradientButton";
// import { GradientGoogleButton } from "../../../components/GradientButton";
// import { Headers1 } from "../../../components/Headers1";

// //redux
// import { signin, signupwithfb, updateProfile } from "../../../redux/actions/auth";
// import { connect } from "react-redux";
// import AlertModal from "../../../components/AlertModal";
// import { Loading } from "../../../components/Loading";
// import AsyncStorage from "@react-native-community/async-storage";

// import { Header, Badge } from "react-native-elements";
// // import ChooseCode from '../../../components/ChooseCode';
// // import countrypicker from '../../../components/countrypicker';
// import fonts from "../../../theme/fonts";
// import SelectDropdown from "react-native-select-dropdown";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
// import { useNavigation } from "@react-navigation/native";
// import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
// const { height: DEVICE_HEIGHT } = Dimensions.get("window");
// const ImagePicker = require("react-native-image-picker");
// const EditProfile = ({
//   signin,
//   route,
//   signupwithfb,
//   updateProfile,
//   selectedLanguages,
//   translation,
//   user
// }) => {
//   const navigation = useNavigation();

//   return (
//     <ScrollView
//       style={{
//         flex: 1,
//         backgroundColor: "white",
//       }}
//     >
//       <Headers1
//         // title={translation[109][selectedLanguages].trim()}
//         title= "Edit Profile"
//       />

//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           margintop: 18,
//         }}
//       >
//         <TouchableOpacity onPress={chooseFile}>
//           <Image
//             source={profilePath}
//             style={{
//               height: 90,
//               width: 90,
//               borderRadius: 90 / 2,
//             }}
//           />
//         </TouchableOpacity>
//         <View style={{ position: "absolute", bottom: -8, left: 220 }}>
//           <FontAwesome name="camera" color={colors.yellow} size={30} />
//         </View>
//       </View>

//       <View
//         style={{
//           justifyContent: "center",
//           flex: 1,
//           marginTop: "10%",
//           paddingHorizontal: 30,
//         }}
//       >
//         <TextInput
//           style={{ height: 50, backgroundColor: "white" }}
//           placeholder="Name"
//           selectionColor={colors.primary}
//           onChangeText={(name) => setName(name)}
//           value={namee}
//           theme={{
//             colors: { primary: colors.primary },
//           }}
//           // onChangeText={text => onChange(text)}
//           // value={value}
//         />
//         <TextInput
//           style={{ height: 50, backgroundColor: "white" }}
//           // placeholder={translation[69][selectedLanguages]}
//           placeholder= "Email"
//           selectionColor={colors.primary}
//           value={email}
//           onChangeText={(email) => setemail(email)}
//           theme={{
//             colors: { primary: colors.primary },
//           }}
//           // onChangeText={text => onChange(text)}
//           // value={value}
//         />
//       </View>
//       <View style={{ flex: 1, marginTop: 70, paddingHorizontal: 15 }}>
//         <GradientButton
//           // title={translation[108][selectedLanguages]}
//           title= "Update"
//           onButtonPress={() => {
//             updatePro();
//             // navigation.navigate("ListDriver");
//             // handleLogin();
//           }}
//         />
//       </View>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//   },
//   modalView: {
//     backgroundColor: "white",
//     borderRadius: 20,
//     height: "110%",
//     width: "110%",

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },

//   inputContainer: {
//     justifyContent: "center",
//   },
//   input: {
//     height: 50,
//   },
//   icon: {
//     position: "absolute",
//     right: 10,
//   },
//   primaryBtn: {
//     width: "100%",
//     backgroundColor: colors.primary,
//     marginTop: 50,
//     borderRadius: 10,
//     height: DEVICE_HEIGHT > 600 ? 40 : 40,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   primaryText: {
//     color: colors.white,
//     fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
//   },
// });

// const mapStateToProps = (state) => {
//   const { user, selectedLanguages, translation } = state.auth;
//   return { user, selectedLanguages, translation };
// };
// export default connect(mapStateToProps, {

//   updateProfile

//  })(EditProfile);

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
  updateProfile,
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
const EditProfile = ({
  signin,
  route,
  signupwithfb,
  editProfile,
  selectedLanguages,
  translation,
  user,
  updateProfile,
}) => {
  const [profilePath, setFilePath] = useState("");
  const [namee, setName] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const chooseFile = () => {
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
        setFilePath(source);
      }
    });
  };

  const updatePro = async (id) => {
    setLoading(true);
    if (!namee) {
      setMsg("Kindly Enter Your Name");
      setShowAlert(true);
    } else {
      const formData = new FormData();

      if (profilePath.uri != "") {
        formData.append("name", namee);
        formData.append("email", email);
        formData.append("u_id", user.u_id);
        formData.append("file", {
          uri: profilePath.uri,
          name: profilePath.fileName,
          type: profilePath.type,
        });
      } else {
        formData.append("name", namee);
        formData.append("email", email);
        formData.append("u_id", user.u_id);
      }
      console.log(" contain nothing", formData);

      const res = await updateProfile(formData);
      console.log("profilepath", res);
      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
        setLoading(false);
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
        // title={translation[109][selectedLanguages]}
        title='Edit Profile'
      />
      <Loading visible={loading} />
      {loading == false && (
        <View>
          {showAlert && (
            <AlertModal
              heading={msg}
              button1='OK'
              button2='Cancel'
              onOkPress={() => {
                setShowAlert(false);
              }}
              form='abc'
            />
          )}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margintop: 18,
            }}>
            <TouchableOpacity onPress={chooseFile}>
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
                    uri: user.dp,
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                  }}
                />
              )}
            </TouchableOpacity>
            <View style={{ position: "absolute", bottom: -8, left: 220 }}>
              <FontAwesome name='camera' color={colors.yellow} size={30} />
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              flex: 1,
              marginTop: "10%",
              paddingHorizontal: 30,
            }}>
            <TextInput
              style={{ height: 50, backgroundColor: "white" }}
              placeholder='Name'
              selectionColor={colors.primary}
              onChangeText={(name) => setName(name)}
              theme={{
                colors: { primary: colors.primary },
              }}
              // onChangeText={text => onChange(text)}
              value={namee}
            />
            <TextInput
              style={{ height: 50, backgroundColor: "white" }}
              // placeholder={translation[69][selectedLanguages]}
              placeholder='Email'
              selectionColor={colors.primary}
              onChangeText={(email) => setemail(email)}
              theme={{
                colors: { primary: colors.primary },
              }}
              // onChangeText={text => onChange(text)}
              value={email}
            />
          </View>
          <View style={{ flex: 1, marginTop: 70, paddingHorizontal: 15 }}>
            <GradientButton
              // title={translation[108][selectedLanguages]}
              title='Update'
              onButtonPress={() => {
                updatePro();
                // navigation.navigate("ListDriver");
                // handleLogin();
              }}
            />
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
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, { updateProfile })(EditProfile);
