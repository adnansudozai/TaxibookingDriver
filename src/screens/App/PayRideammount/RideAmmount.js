/** @format */

import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
//logo
import {
  location,
  currentlocation,
  carmove,
  Persons,
  message,
  caricon,
} from "../../../assets";
import { GradientButton } from "../../../components/GradientButton";
//redux
import {
  getpaymentdetail,
  paymentfromuserbalance,
  ongoingtrip,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge } from "react-native-elements";
import Headers1 from "../../../components/Headers1";

import fonts from "../../../theme/fonts";

import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import PolylineDirection from "react-native-maps/polyline-direction";
import PolylineDirection from "@react-native-maps/polyline-direction";
import MapViewDirections from "@react-native-maps/polyline-direction";
import { getDistance } from "geolib";
import Geolocation from "@react-native-community/geolocation";
import database from "@react-native-firebase/database";
import SelectDropdown from "react-native-select-dropdown";
import { cross } from "../../../assets";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { showLocation } from "react-native-map-link";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
// import openMap from "react-native-open-maps";
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";
const roomRef = database().ref("rooms");

const RideAmmount = ({
  signin,
  route,
  signupwithfb,
  selectedLanguages,
  translation,
  ongoingtrip,
  user,
  paymentfromuserbalance,
  getpaymentdetail,
}) => {
  const navigation = useNavigation();

  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const tripamount = route.params.amount;
  // console.log("myroutee", route.params.amount);

  const mapRef = useRef();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}>
      <Headers1
        // title={translation[312][selectedLanguages].trim()}
        title={translation[344][selectedLanguages]}
        screen={"false"}
        show={"No"}
      />

      <Loading visible={loading} />

      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 30,
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 18 }}>
            {translation[345][selectedLanguages]}
          </Text>
          {/* <Text style={{fontSize:18}}>Payable Ammount</Text> */}

          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {tripamount} lv
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Map")}
            style={{
              backgroundColor: colors.yellow,
              borderRadius: 7,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: colors.black,
                textAlign: "center",
                justifyContent: "center",
                textAlignVertical: "center",
                paddingVertical: 12,
              }}>
              {translation[185][selectedLanguages]}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return {
    user,
    selectedLanguages,
    translation,
  };
};
export default connect(mapStateToProps, {
  ongoingtrip,
  paymentfromuserbalance,
  getpaymentdetail,
})(RideAmmount);
