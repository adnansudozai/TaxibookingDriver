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
import AntDesign from "react-native-vector-icons/AntDesign";
import { set } from "react-native-reanimated";
import { connect } from "react-redux";
import { bells, arrowright, Success1, P, Bye1 } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import {
  GradientButton,
  GradientsigninButton,
} from "../../../components/GradientButton";
import { LongPressGestureHandler, ScrollView } from "react-native-gesture-handler";
import { logoutSuccess } from "../../../redux/actions/auth";

const Success = ({
  route,
  userData,
  logoutSuccess,
  selectedLanguages,
  translation,
}) => {
  const [secure, setisSecure] = useState(true);
  const [secure1, setisSecure1] = useState(true);
  const navigation = useNavigation();
  const {screen}=route.params;
  let main=""
  let sub=""
  let btn=""
if(screen=='payment'){
  main=
  // "Congratulations"
  translation[128][selectedLanguages]
   sub=
  //  "your payment has been successfull"
   translation[129][selectedLanguages]
  btn=
  // "Back to Dashboard"
  translation[169][selectedLanguages]
}
else if(screen=='driverprofile'){
  main=
  // "Thankyou"
  translation[170][selectedLanguages]
   sub=
  //  "Please wait for admin to approve your account."
   translation[171][selectedLanguages]

}

else{

  main=
  // "Sign up Successful"
  translation[5][selectedLanguages]
  sub=
  // "Your account is now registered"
  translation[6][selectedLanguages]
 btn=
//  "Proceed"
 translation[103][selectedLanguages]

}
const handlepress=()=>{
  if(screen=='payment'){
  navigation.navigate('Map')
  }
  else{

    navigation.navigate('DriverProfile')

  }
}
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 2,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            // backgroundColor: "green",
          }}
        >
          <Image source={Success1} style={{...styles.logo_blue,marginTop:'70%',height:230,width:200}} />
        </View>
        <View style={{ flex: 5,marginTop:'20%' }}>
          <CustomText
            title={main}
            type={"large"}
            color={"black"}
            style={{
              fontSize: 20,
              alignSelf: "center",
              marginTop: 20,
              fontWeight: "bold",
            }}
          />
          <CustomText
            // title={translation[6][selectedLanguages]}
            // {"Your account is now registered"}
            title={sub}
            type={"normal"}
            color={"black"}
            style={{
              fontSize: 18,
              alignSelf: "center",
              marginTop: 8,
              marginBottom: 10,
            }}
          />
          {screen!='driverprofile' && (
          <View style={{ paddingTop: 10 }}>
            <GradientButton
              // title={translation[103][selectedLanguages]}
              title={btn}
              // "Proceed"
              iconRight={arrowright}
              onButtonPress={() => handlepress()}
              //   navigation.navigate("Profile", {
              //     params: { from: "Additional Information" },
              //   });
              // }}
            />
          </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {})(Success);
