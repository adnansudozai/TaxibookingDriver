/** @format */

import React, { useEffect, useState } from "react";
import { Text, View, Image, ImageBackground, StyleSheet } from "react-native";
import { logo, bg, logo_blue, SplashImage, Logo } from "../../../assets";
import styles from "./styles";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/routers";
import { applogo, flag, logoeng } from "../../../assets";
import colors from "../../../theme/colors";
import { signin, alltranslation } from "../../../redux/actions/auth";
const Splash = ({
  navigation,
  isLoggedIn,
  from,
  alltranslation,
  user,
  signin,
  selectedLanguages,
}) => {
  const [userprivilidge, setuserprivilidge] = useState("");

  console.log("selected languages", selectedLanguages);
  const [loading, setLoading] = useState(true);

  (async () => {
    if (
      selectedLanguages == undefined ||
      selectedLanguages == null ||
      selectedLanguages == ""
    ) {
      console.log("selectedLanguages1234", selectedLanguages);
      const res = await alltranslation("English");
    } else {
      console.log("selectedLanguages123", selectedLanguages);
      const res = await alltranslation(selectedLanguages);
    }
  })();
  // console.log('languages api',user.phone_no,alltranslation)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        (async () => {
          const formData = new FormData();
          formData.append("phone_no", user.phone_no);
          formData.append("status", "driver");

          const res = await signin(formData);
          if (res.data.status == true) {
            if (res.data.data.user_privilidge == 2) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: "DriverProfile",
                    },
                  ],
                })
              );
            } else if (res.data.data.is_working == "No") {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "DriverPreferences" }],
                })
              );
            } else if (res.data.data.user_privilidge == 0) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Map" }],
                })
              );
            }
          }
        })();
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Signup" }],
          })
        );
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: colors.yellow,
      }}
    >
      {/* <View
        style={{
          height: 80,
          width: 300,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          paddingBottom: 4,
        }}
      > */}
      <Image
        source={applogo}
        resizeMode="contain"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* </View> */}
    </View>
  );
  // <ImageBackground style={styles.main} source={SplashImage} />;
};
const mapStateToProps = (state) => {
  const { isLoggedIn, alltranslation, user, selectedLanguages } = state.auth;
  return {
    isLoggedIn,
    alltranslation,
    selectedLanguages,
    user,
  };
};
export default connect(mapStateToProps, { signin, alltranslation })(Splash);
