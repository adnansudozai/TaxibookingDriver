/** @format */

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
import { ScrollView } from "react-native-gesture-handler";
import { logoutSuccess } from "../../../redux/actions/auth";
import fonts from "../../../theme/fonts";

const TransactionDeclined = ({
  route,
  userData,
  logoutSuccess,
  selectedLanguages,
  translation,
}) => {
  const [secure, setisSecure] = useState(true);
  const [secure1, setisSecure1] = useState(true);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            // backgroundColor: "green",
          }}>
          <Image source={P} style={styles.logo_blue} />
        </View>
        <View style={{}}>
          <CustomText
            // title={"Transaction declined"}
            title={translation[161][selectedLanguages]}
            type={"large"}
            color={"black"}
            style={{
              fontSize: 24,
              alignSelf: "center",
              marginTop: 20,
              fontWeight: "bold",
            }}
          />
          <CustomText
            // title={"please try again later"}
            title={translation[249][selectedLanguages]}
            type={"normal"}
            color={"black"}
            style={{
              fontSize: 18,
              alignSelf: "center",
              marginTop: 5,
              marginBottom: 10,
            }}
          />
          <View style={{ paddingTop: "5%" }}>
            <GradientButton
              // title="Retry"
              title={translation[163][selectedLanguages]}
              // iconRight={arrowright}
              onButtonPress={() => navigation.navigate("Wallet")}
              //   navigation.navigate("Profile", {
              //     params: { from: "Additional Information" },
              //   });
              // }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {})(TransactionDeclined);
