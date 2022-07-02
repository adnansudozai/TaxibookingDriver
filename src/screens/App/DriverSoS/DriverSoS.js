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
  PermissionsAndroid,
  Button,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";
import  Headers1  from "../../../components/Headers1";

import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
// import auth from "@react-native-firebase/auth";
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
import { signin, signupwithfb } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge } from "react-native-elements";

import fonts from "../../../theme/fonts";

import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import PolylineDirection from "react-native-maps/polyline-direction";
import PolylineDirection from "@react-native-maps/polyline-direction";
import Geolocation from "@react-native-community/geolocation";

import SelectDropdown from "react-native-select-dropdown";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import { useNavigation } from "@react-navigation/native";

const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";

const DriverSoS = ({ signin, route, signupwithfb, translation, selectedLanguages }) => {
  const navigation = useNavigation();
 const {data}=route.params;
 const mapRef = useRef(null);
//  const [array, setarray] = useState(route.params.data);
 console.log('sos data is ddd ',data)
 let arr2=JSON.parse(data.user_data)
 console.log('data is',arr2.long)
  // const [coordinates] = useState([
  //   {
  //     latitude: 33.655408333333690,
  //     longitude: 73.08922333333600,
  //     latitudeDelta: 0.01,
  //     longitudeDelta: 0.01,
  //   },
  //   // {
  //   //   latitude: 33.6554,
  //   //   longitude: 73.0892,
  //   // },
  // ]);
  const [rregion, setRegion] = useState({
    latitude: 33.684422,
    longitude: 73.047882,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
 

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission assigned");
        } else {
          console.log("Permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch();
    // };
  }, []);

  const [currentLongitude, setCurrentLongitude] = useState(arr2.long);
  const [currentLatitude, setCurrentLatitude] = useState(arr2.lat);


  const [region] = [
    {
      latitude:  currentLatitude,
      longitude: parseFloat(currentLongitude),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1
      title={translation[58][selectedLanguages].trim()}
      // title="SOS Alert"
      value={5} />

      <View style={{ marginTop: 0, marginLeft: 25, marginRight: 15 }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.gray,
            fontFamily: fonts.PoppinsMedium,
          }}
        >
          {translation[59][selectedLanguages].trim()}
          {/* SOS details */}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            color: "black",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          {translation[60][selectedLanguages].trim()}
          {/* Aggressive passenger */}
        </Text>
      </View>

      <View>
        {/* <MapView
          provider={PROVIDER_GOOGLE}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
         
       onRegionChangeComplete={(region) => setRegion(region)}
          style={{ width: "100%", height: 280 }}
          initialRegion={{
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
      
          <Marker coordinate={region} />

        </MapView> */}

<MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
    
              style={{ width: "100%", height: 280 }}
       
       
        initialRegion={{
          latitude: parseFloat(currentLatitude),
          longitude:  parseFloat(currentLongitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
  
      >
        <Marker
          coordinate={{ latitude: parseFloat(currentLatitude), longitude: parseFloat(currentLongitude) }}
          pinColor={"red"} // any color
          title={"title"}
          description={"description"}
        />
      </MapView>
      </View>

      <View style={{ marginTop: 10, paddingHorizontal: 30 }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.gray,
            marginTop: 17,
            fontFamily: fonts.PoppinsMedium,
          }}
        >
          {translation[61][selectedLanguages]}
          {/* Location */}
        </Text>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 17,
              color: "black",
              marginTop: 7,
              fontFamily: fonts.PoppinsRegular,
            }}
          >
          {arr2.address}
           {/* {arr2.country} */}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "black",
              marginTop: 10,
            }}
          >
          {currentLatitude}° N, {currentLongitude}° E
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 10, paddingHorizontal: 30 }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.gray,
            marginTop: 10,
            fontFamily: fonts.PoppinsMedium,
          }}
        >
          {translation[62][selectedLanguages].trim()}
          {/* Driver details */}
        </Text>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 17,
              color: "black",
              marginTop: 7,
            }}
          >
           {arr2.name}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "black",
              marginTop: 2,
            }}
          >
    {arr2.phone_no}
          </Text>
          {/* <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "black",
              marginTop: 2,
              marginBottom: 20,
            }}
          >
          {arr2[0].car_make}
          </Text> */}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

//export default connect(null, { signupwithfb, signin })(DriverSoS);
const mapStateToProps = (state) => {
  const { user, translation, selectedLanguages } = state.auth;

  return {
    userData: user,
    translation,
    selectedLanguages,
  };
};
export default connect(mapStateToProps, { signupwithfb, signin })(DriverSoS);