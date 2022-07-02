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
import { signin, signupwithfb ,ongoingtrip,driverlocation} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge } from "react-native-elements";

import fonts from "../../../theme/fonts";

import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "@react-native-maps/polyline-direction";
import { getDistance } from "geolib";
import Geolocation from "@react-native-community/geolocation";

import SelectDropdown from "react-native-select-dropdown";
import  Headers1  from "../../../components/Headers1";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import { useNavigation } from "@react-navigation/native";
import database from '@react-native-firebase/database';
const roomRef = database().ref("rooms");

const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";

const ArrivalStatus = ({
  signin,
  route,
  signupwithfb,
  selectedLanguages,
  translation,
  user,
  ongoingtrip,
  driverlocation
}) => {
  const navigation = useNavigation();
  const [Data, setData] = useState([]);
  const [loading, setloading] =
    useState(true);
  useEffect(() => {
    setloading(true);
  
  
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);

      const res = await ongoingtrip(
        fomData
      );
      console.log("formdata", res);
      if (res.data.status == true) {
        setData(res.data.data);
       
        setreceiverid(res.data.data[0].driver_id)
        //  setdriverlati(res.data.data[0].driver_lat)
        //  setdriverlongi(res.data.data[0].driver_long)

        
        setloading(false);

      } else {
        setloading(false);
      }
    })();


  }, []);


  

  const [coordinates] = useState([
    {
      latitude: 33.5495,
      longitude: 73.1239,
    },
    {
      latitude: 33.6554,
      longitude: 73.0892,
    },
    // {
    //     latitude: 33.6844,
    //     longitude: 73.0479,
    //   },
    //   {
    //     latitude: 31.5204,
    //     longitude: 74.3587,
    //   },
  ]);
  const mapRef = useRef();

  var dis = getDistance(
    // {
    //   latitude: 33.6844,
    //   longitude: 73.0479,
    // },
    // {
    //   latitude: 31.5204,
    //   longitude: 74.3587,
    // },
    { latitude: 33.5495, longitude: 73.1239 },
    { latitude: 33.6554, longitude: 73.0892 }
  );
  const [distance, setdistance] = useState([]);
  const [time, settime] = useState([]);
  const [senderid, setsenderid] = useState(user.u_id);
  const [receiverid, setreceiverid] = useState('');
  const [indexid, setindexid] = useState();
/////current location

const [currentLongitude, setCurrentLongitude] = useState("");
const [currentLatitude, setCurrentLatitude] = useState("");
const [address, setaddress] = useState("");
Geolocation.getCurrentPosition(
  //Will give you the current location
  (position) => {
  

    //getting the Longitude from the location json
    const currentLongitude = 
      JSON.stringify(position.coords.longitude);

    //getting the Latitude from the location json
    const currentLatitude = 
      JSON.stringify(position.coords.latitude);

    //Setting Longitude state
 
    setCurrentLongitude(currentLongitude);
    
    //Setting Longitude state
    setCurrentLatitude(currentLatitude);
    
  },
  // (error) => {
  
  // },
  // {
  //   enableHighAccuracy: false,
  //   timeout: 30000,
  //   maximumAge: 1000
  // },
);
console.log(currentLatitude,currentLongitude)


useEffect(() => {
  const interval = setInterval(() => {
     
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("lat", currentLatitude);
      fomData.append("long", currentLongitude);
      fomData.append("trip_id", 12);


      const res = await driverlocation(fomData);
      console.log("formdata intervell call",res);
      
    })();

    }, 15000);
    return () => clearInterval(interval);

  
  }, []);

  ///messaging code 


  const checkkey = async item => {
   
    console.log('dname is',Data[0].name)
     
 
    try {
      roomRef.on('value', snapshot => {
        let roomsFB = [];
        snapshot.forEach(element => {
          roomsFB.push({
            key: element.key,
            send_uid: element.val().send_uid,
            recv_uid: element.val().recv_uid,
            created_at: element.val().created_at,
          });
        });
       
        const res = roomsFB?.some(element => {
  
          return (
            (element.recv_uid == senderid && element.send_uid == receiverid) ||
            (element.recv_uid == receiverid && element.send_uid == senderid)
          );
        });
        console.log(res)
  
        if (res) {
         
  
         
          const index = roomsFB.find(element => {
            return (
              (element.recv_uid == senderid && element.send_uid == receiverid) ||
            (element.recv_uid == receiverid && element.send_uid == senderid)
            );
          });
          setindexid(`messages/${index.key}`)
       
//   navigation.navigate('Support',{
//       messagekey:`messages/${index.key}`,
//     receiverid:receiverid,
//     dname:
//     Data[0].name,
    
// })
alert(Data[0].name)

  
        } else {
          addRoom(item);
        }
      });
    } catch (err) {
      console.log(err);
  
  
  };
  
  
  
  const addRoom = async item => {
  
  
  
    try {
      await roomRef.push({
        send_uid: senderid,
        recv_uid: receiverid,
        created_at: new Date().getTime(),
      });
    
    } catch (err) {
      alert(err);
    
  }
  
  };
  


}

  ////////////////

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >

<Headers1 title=
      // {translation[2][selectedLanguages]}
       "Pick up call received"
       />
    

      <View>
        {/* later use it */}
        {/* <MapView
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          showUserLocation={true}
          // onRegionChangeComplete={(region) => setRegion(region)}
          style={{ width: "100%", height: 330 }}
          initialRegion={{
            latitude: lati,
            longitude: longi,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        > */}
        {/* <Marker coordinate={coordinates[0]}>
            <Image
              source={require("../../../assets/images/caricon.png")}
              style={{ width: 30, height: 30 }}
              resizeMode='contain'
            />
          </Marker>  */}
        {/* <Marker coordinate={coordinates} /> */}

        {/* <Marker coordinate={region} /> */}

        {/* later use it */}
        {/* <PolylineDirection
            //coordinates={region}
            origin={region}
            //destination={region}
            apiKey={API_KEY}
            strokeWidth={4}
            strokeColor="blue"
          />
        </MapView> */}

        <MapView
          style={{ width: "100%", height: 330 }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          showUserLocation={true}
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            // waypoints={ (coordinates.length > 2) ? coordinates.slice(1, -1): null}
            // destination={coordinates[coordinates.length-1]}

            apiKey={API_KEY} // insert your API Key here
            strokeWidth={4}
            strokeColor="blue"
            optimizeWaypoints={true}
            onReady={(result) => {
              setdistance(result.distance);
              settime(result.duration);
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 20,
                  left: 20,
                  top: 20,
                  bottom: 20,
                },
              });
            }}
          />
          <Marker coordinate={coordinates[0]} />
          <Marker coordinate={coordinates[1]} />
        </MapView>
      </View>
      <View>
        <Text> Recommended distance is: {distance} KM</Text>
        <Text> Recommended time is: {time} Mins</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          paddingBottom: 20,
          shadowOpacity: 1,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Image
            source={currentlocation}
            resizeMode="contain"
            style={{
              height: 30,
              width: 30,
              marginTop: 20,
              marginLeft: 15,
              borderRadius: 100 / 2,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginLeft: 5,
              marginTop: 17,
              flex: 1,
            }}
          >
            {/* Pick up */}
            {translation[80][selectedLanguages]}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              marginTop: 45,
              marginLeft: -95,
              marginRight: -15,
              flex: 1,
            }}
          >
            Zavet stadium
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Image
            source={carmove}
            resizeMode="contain"
            style={{
              height: 50,
              width: 120,
              marginTop: 13,
              marginLeft: 7,
              borderRadius: 100 / 2,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Image
            source={location}
            resizeMode="contain"
            style={{
              height: 26,
              width: 28,
              marginTop: 21,
              borderRadius: 100 / 2,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginLeft: 2,
              marginTop: 17,
            }}
          >
            {/* Drop off */}
            {translation[81][selectedLanguages]}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              marginTop: 45,
              marginLeft: -72,
              marginRight: 15,
              flex: 1,
            }}
          >
            Avis
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            color: "black",
            marginTop: 17,
          }}
        >
          {/* The driver is on its way */}
          {translation[85][selectedLanguages]}
        </Text>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 15,
              color: "black",
              marginTop: 7,
            }}
          >
            {/* Estimated pick up time: */}
            {translation[91][selectedLanguages]}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "black",
              marginTop: 7,
              marginLeft: 5,
            }}
          >
            2 min
          </Text>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            marginLeft: 15,
            marginRight: 15,
            marginTop: "6%",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginBottom: 10,
            paddingBottom: 5,
          }}
        >
          <Image
            source={Persons}
            resizeMode="contain"
            style={{
              height: 80,
              width: 80,
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 100 / 2,
            }}
          />

          <View
            style={{
              marginLeft: 15,
              borderWidth: 0,
              marginTop: 20,
              flex: 1,
              marginRight: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Ilie Florin
              </Text>

              <FontAwesome
                style={{
                  marginLeft: 8,
                  marginTop: 8,
                }}
                name={"heart"}
                size={15}
                color="red"
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                color: "black",
                marginTop: 8,
              }}
            >
              SWF00284 Ford Mustang
            </Text>
          </View>

          <View
            style={{
              borderWidth: 0,
              borderRadius: 100 / 2,
              height: 56,
              width: 56,
              backgroundColor: colors.yellow,
              marginTop: "6%",
              marginLeft: 10,
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>checkkey()}
             >
              {/* <Image
                source={message}
                resizeMode="contain"
                style={{ height: 30, width: 30, borderRadius: 100 / 2 }}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {ongoingtrip,driverlocation})(ArrivalStatus);
