import React, { useEffect, useState } from "react";
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
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
// import auth from "@react-native-firebase/auth";
//logo
import {
  Persons,
  arrowright,
  cross,
  house,
  Circled_favorite_off,
  Iconpaymen,
  cash,
  debit,
} from "../../../assets";

import { GradientButton } from "../../../components/GradientButton";
import Headers1 from "../../../components/Headers1";
//redux
import { signin, signupwithfb, rideList } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
import { Header, Badge } from "react-native-elements";
import fonts from "../../../theme/fonts";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
var data = [1, 2, 3, 4];
const Listofrides = ({
  signin,
  route,
  signupwithfb,
  rideList,
  selectedLanguages,
  translation,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    // setLoading(true);
    (async () => {
      const res = await rideList("", user.id, "");
      if (res.data.status == true) {
        // setallarticles(res.data.data);
        // setSelected('top');
      } else {
      }
      // setLoading(false);
    })();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const closemodal = () => {
    setModalVisible(!isModalVisible);
  };
  const closemodal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const renderItem = ({ item, index }) => (
    <View style={{}}>
      <TouchableOpacity
        onPress={toggleModal1}
        style={{
          flex: 1,
          marginHorizontal: 20,
          height: 170,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          marginBottom: 5,
          borderRadius: 15,
          paddingVertical: 10,
          marginTop: 15,
        }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",

              marginTop: 3,
            }}
          >
            <View style={{ width: "26%" }}>
              <Image
                source={Persons}
                style={{ height: 80, width: 80, borderRadius: 80 / 2 }}
              />
            </View>

            <View style={{ width: "60%" }}>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Aleksander
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 6,
                  borderWidth: 0,
                  position: "absolute",
                  marginTop: 35,
                }}
              >
                <Entypo name="star" color={colors.yellow} size={20} />
                <Entypo name="star" color={colors.yellow} size={20} />
                <Entypo name="star" color={colors.yellow} size={20} />
                <Entypo name="star" color={colors.yellow} size={20} />
                <Entypo name="star" color={"#D9D356"} size={20} />
              </View>

              <View
                style={{
                  borderWidth: 0,
                  position: "absolute",
                  marginTop: 65,
                  marginLeft: 25,
                }}
              >
                <Text style={{ fontSize: 12 }}>SW18 6TB, Sofia, Bul </Text>
              </View>
              <View
                style={{
                  borderWidth: 0,
                  position: "absolute",
                  marginTop: 115,
                  marginLeft: 25,
                }}
              >
                <Text style={{ fontSize: 12 }}>SW18 6TB, Sofia, Bul </Text>
              </View>

              <FontAwesome
                name="map-marker"
                color={"black"}
                size={16}
                style={{ position: "absolute", marginTop: 66, marginLeft: 10 }}
              />
              <FontAwesome
                name="map-marker"
                color={colors.yellow}
                size={16}
                style={{ position: "absolute", marginTop: 116, marginLeft: 10 }}
              />
              <Entypo
                name="dots-three-vertical"
                color={colors.black}
                size={18}
                style={{ position: "absolute", marginTop: 88, marginLeft: 5 }}
              />
            </View>

            <View
              style={{
                width: "15%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  marginTop: 10,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                520lv
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 0,
            marginTop: 125,
            position: "absolute",
            marginLeft: 265,
          }}
        >
          <Text>23 mins ago</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1
        title={translation[76][selectedLanguages]}
        // "List of rides"
      />
      <ScrollView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {})(Listofrides);
