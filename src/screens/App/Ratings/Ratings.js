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
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
// import auth from "@react-native-firebase/auth";
//logo
import { Persons, addphoto } from "../../../assets";

import { GradientButton } from "../../../components/GradientButton";

//redux
import { signin, signupwithfb, postRatting } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import  Headers1  from "../../../components/Headers1";

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
const Ratings = ({
  signin,
  route,
  signupwithfb,
  postRatting,
  selectedLanguages,
  translation,
  user
}) => {
  const [feedback, setfeedback] = useState("");
  const [count, setcount] = useState(1);
  const {data}=route.params;
   
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation();
console.log('data from previous screen',data)
const okpress = async (id) => {
  setShowAlert(false);
  navigation.navigate('Map')
  setcount(1)
}
  const ratings = async (id) => {
    // if(feedback==""){
    //   setMsg("Please enter your feedback")
    //   setShowAlert(true)
    // }
    setLoading(true)
      const formData = new FormData();
      formData.append("trip_id", data.trip_id);
      formData.append("rating", count);
      formData.append("feedback", feedback);
      formData.append("who_rated", 'driver');
   

      const res = await postRatting(formData);
      console.log('post rating is ',res,formData)
      if (res.data.status == true) {
      
        // setMsg(res.data.message);
        // Rated Successfully
        setMsg(translation[160][selectedLanguages])
        setShowAlert(true);
        setLoading(false)
      
      } else {
        setLoading(false)
      }
    
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1 title=
      {translation[159][selectedLanguages]}
      // "Rating"
       />
      <Loading visible={loading} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margintop: 60,
          top: 20,
        }}
      >
          {showAlert && (
              <AlertModal
                heading={msg}
                button1={translation[185][selectedLanguages]}
                // button1="OK"
                button2={translation[99][selectedLanguages]}
                // button2="Cancel"
                onOkPress={() => {
                  okpress();
                }}
                form="abc"
             
              />
            )}
    
        <TouchableOpacity>
          <Image
            source={
              {uri:data.dp}
            }
            style={{
              height: 100,
              width: 100,
              borderRadius: 60,
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, paddingTop: 10, fontWeight: "bold" }}>
          {data.name}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            width: "40%",
            justifyContent: "space-between",
          }}
        >{count>=1?
          <AntDesign name="star" onPress={()=>setcount(1)} color={colors.yellow} size={25} />:
          <AntDesign name="staro" onPress={()=>setcount(1)} color={colors.yellow} size={25} />
          }
          {count>=2?
          <AntDesign name="star" onPress={()=>setcount(2)} color={colors.yellow} size={25} />:
          <AntDesign name="staro" onPress={()=>setcount(2)} color={colors.yellow} size={25} />
          }
          {count>=3?
          <AntDesign name="star" onPress={()=>setcount(3)} color={colors.yellow} size={25} />:
          <AntDesign name="staro" onPress={()=>setcount(3)} color={colors.yellow} size={25} />
          }
          {count>=4?
          <AntDesign name="star" onPress={()=>setcount(4)} color={colors.yellow} size={25} />:
          <AntDesign name="staro" onPress={()=>setcount(4)} color={colors.yellow} size={25} />
          }
          {count>=5?
          <AntDesign name="star" onPress={()=>setcount(5)} color={colors.yellow} size={25} />:
          <AntDesign name="staro" onPress={()=>setcount(5)} color={colors.yellow} size={25} />
          }
         
        
        </View>

        <Text style={{marginTop:22, fontSize:18}}>
          Leave your Feedback
        </Text>
        <View
        style={{
          justifyContent: "center",
          flex: 1,
          marginTop: "2%",
          alignSelf: 'center',
            width: '80%',
            borderWidth: 1,
            borderColor: "gray"
        }}
      >

        <TextInput multiline={true}
          style={{
            backgroundColor: "white",
            borderWidth: 0,
            width: '100%',
            borderRadius: 5,
            borderColor: "gray",
          }}
          selectionColor={colors.primary}
          onChangeText={(feedbk) => setfeedback(feedbk)}
           theme={{
             colors: { primary: colors.primary },
           }}
          placeholder={'Write some thing'}
          // onChangeText={text => onChange(text)}
          // value={value}
        />
      </View>
            </View>
         
      <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
        <GradientButton
          title={translation[115][selectedLanguages]}
          // "Submit"
          onButtonPress={() =>ratings()}
        />
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
export default connect(mapStateToProps, {postRatting})(Ratings);
