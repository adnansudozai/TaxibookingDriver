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
import { signin, signupwithfb, driverList } from "../../../redux/actions/auth";
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
const ListDriver = ({
  signin,
  route,
  signupwithfb,
  driverList,
  translation,
  selectedLanguages,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    // setLoading(true);
    (async () => {
      const res = await driverList("", user.id, "");
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
        onPress={toggleModal}
        style={{
          flex: 1,
          marginHorizontal: 20,
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
          borderRadius: 10,
          paddingVertical: 10,
          marginTop: 15,
        }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
            }}
          >
            <View style={{ width: "18%" }}>
              <Image
                source={Persons}
                style={{ height: 60, width: 60, borderRadius: 80 / 2 }}
              />
            </View>
            <View style={{ width: "60%" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    paddingVertical: 6,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  llie Florin
                </Text>
                <Entypo
                  name="heart"
                  color={"red"}
                  size={20}
                  style={{
                    marginLeft: 10,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                }}
              >
                5 {translation[79][selectedLanguages].trim()}
              </Text>
            </View>

            <View
              style={{
                width: "15%",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 18 }}
              >
                520lv
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1
        title=// "List of drivers"
        {translation[150][selectedLanguages].trim()}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />

      <Modal
        animationType="slide"
        transparent={true}
        isVisible={isModalVisible}
      >
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 10,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            paddingBottom: 60,
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              paddingRight: 10,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                closemodal();
              }}
            >
              <Image
                source={cross}
                resizemode="contain"
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100 / 2,
                borderWidth: 1,
                borderColor: colors.yellow,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>60</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "black", fontSize: 16 }}>
              {/* Ride request has been sent to driver. */}
              {translation[116][selectedLanguages].trim()}
            </Text>
            <Text style={{ color: "black", fontSize: 16 }}>
              {/* Please wait for driver's response */}
              {translation[117][selectedLanguages].trim()}
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={isModalVisible1}
      >
        <ScrollView
          style={{
            // justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 10,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              paddingRight: 10,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                closemodal1();
              }}
            >
              <Image
                source={cross}
                resizemode="contain"
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <Image
              source={house}
              resizeMode="cover"
              style={{ width: "100%", height: 200, borderRadius: 15 }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={Persons}
                resizeMode="cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100 / 2,
                  position: "absolute",
                }}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 60,
                width: "55%",
                justifyContent: "space-between",
              }}
            >
              <AntDesign name="star" color={colors.yellow} size={24} />
              <AntDesign name="star" color={colors.yellow} size={24} />
              <AntDesign name="star" color={colors.yellow} size={24} />
              <AntDesign name="star" color={colors.yellow} size={24} />
              <AntDesign name="star" color={colors.yellow} size={24} />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 18 }}>(</Text>
                <Entypo name="heart" color={"red"} size={18} />
                <Text style={{ fontSize: 18 }}>23</Text>
                <Text style={{ fontSize: 18 }}>)</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={{ paddingVertical: 15 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {/* Details */}
                {translation[86][selectedLanguages]}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: "10%" }}>
                <FontAwesome5 name="car" color={colors.darkgray} size={20} />
              </View>
              <View style={{ width: "80%" }}>
                <Text style={{ fontSize: 16, color: colors.darkgray }}>
                  Ford Mustang BUL-9876 2012
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={{ width: "10%" }}>
                <FontAwesome5
                  name="user-friends"
                  color={colors.darkgray}
                  size={20}
                />
              </View>
              <View style={{ width: "80%" }}>
                <Text style={{ fontSize: 16, color: colors.darkgray }}>
                  3 {translation[87][selectedLanguages]}
                  {/* seater */}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={{ width: "10%" }}>
                <FontAwesome5
                  name="luggage-cart"
                  color={colors.darkgray}
                  size={20}
                />
              </View>
              <View style={{ width: "80%" }}>
                <Text style={{ fontSize: 16, color: colors.darkgray }}>
                  2 {translation[88][selectedLanguages].trim()}
                  {/* bagged capacity */}
                </Text>
              </View>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {translation[89][selectedLanguages]}
                {/* Charges */}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: "10%" }}>
                <FontAwesome5
                  name="address-card"
                  color={colors.darkgray}
                  size={20}
                />
              </View>
              <View style={{ width: "80%" }}>
                <Text style={{ fontSize: 16, color: colors.darkgray }}>
                  {/* Initial fee */}
                  {translation[90][selectedLanguages].trim()}
                </Text>
              </View>
              <View style={{ width: "10%" }}>
                <Text style={{ fontSize: 16, color: colors.darkgray }}>
                  250lv
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={{ width: "10%" }}>
                <FontAwesome5
                  name="address-card"
                  color={colors.darkgray}
                  size={20}
                />
              </View>
              <View style={{ width: "80%" }}>
                <Text style={{ fontSize: 16, color: colors.darkgray }}>
                  {/* Charges per km */}
                  {translation[92][selectedLanguages].trim()}
                </Text>
              </View>
              <View style={{ width: "10%" }}>
                <Text style={{ fontSize: 16, color: colors.darkgray }}>
                  50lv
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={{ width: "10%" }}>
                <FontAwesome5
                  name="address-card"
                  color={colors.darkgray}
                  size={20}
                />
              </View>
              <View style={{ width: "80%" }}>
                <Text style={{ fontSize: 16, color: colors.darkgray }}>
                  {/* Charges per stay */}
                  {translation[93][selectedLanguages].trim()}
                </Text>
              </View>
              <View style={{ width: "10%" }}>
                <Text style={{ fontSize: 16, color: colors.darkgray }}>
                  50lv
                </Text>
              </View>
            </View>
            <View style={{ paddingVertical: 15 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {/* Acceptable payment method */}
                {translation[94][selectedLanguages]}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "45%",
                }}
              >
                <Image
                  resizeMode="contain"
                  source={cash}
                  style={{ height: 50, width: 50 }}
                />
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 5 }}
                >
                  {/* Credit Card */}
                  {translation[95][selectedLanguages].trim()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "45%",
                }}
              >
                <Image
                  resizeMode="contain"
                  source={debit}
                  style={{ height: 50, width: 50 }}
                />
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 5 }}
                >
                  {/* Cash */}
                  {translation[96][selectedLanguages]}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
                width: "40%",
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  resizeMode="contain"
                  source={Iconpaymen}
                  style={{ height: 30, width: 30 }}
                />
              </View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {/* Approx.Price: */}
                  {translation[97][selectedLanguages].trim()}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 5 }}>
              520lv
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{ fontSize: 16, marginTop: 10, color: colors.darkgray }}
            >
              {/* Terms & condition may apply */}
              {translation[243][selectedLanguages]}
            </Text>
          </View>
          <View style={{}}>
            <GradientButton
              title={translation[98][selectedLanguages]}
              // "Ride"
              iconRight={arrowright}
              onButtonPress={toggleModal}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: colors.yellow,
              marginBottom: 20,
              marginHorizontal: 20,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {/* Cancel */}
              {translation[99][selectedLanguages]}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {})(ListDriver);
