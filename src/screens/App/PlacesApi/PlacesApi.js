import React, { useState, useEffect, useRef } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Input } from "react-native-elements";
import { arrowleft } from "../../../assets";
import colors from "../../../theme/colors";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
var screenWidth = Dimensions.get("window").width;
//
//   const navigation = useNavigation();
//   const mapRef = useRef(null);
//   const [region, setRegion] = useState({
//     latitude: 33.684422,
//     longitude: 73.047882,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         initialRegion={{
//           latitude: 33.684422,
//           longitude: 73.047882,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         onRegionChangeComplete={(region) => setRegion(region)}
//       >
//         <Marker
//           coordinate={{ latitude: 33.684422, longitude: 73.047882 }}
//           pinColor={"red"} // any color
//           title={"title"}
//           description={"description"}
//         />
//       </MapView>
//       <View style={{ position: "absolute", width: "100%" }}>
//         <GooglePlacesAutocomplete
//           GooglePlacesDetailsQuery={{ fields: "formatted_address" }}
//           placeholder="Enter Location"
//           fetchDetails={true}
//           renderLeftButton={() => (
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.goBack();
//               }}
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 marginRight: 10,
//               }}
//             >
//               <Image
//                 source={arrowleft}
//                 resizeMode="contain"
//                 style={{
//                   height: 20,
//                   width: 20,
//                   tintColor: "black",
//                 }}
//               />
//             </TouchableOpacity>
//           )}
//           styles={{
//             textInputContainer: {
//               marginVertical: "10%",
//               borderTopWidth: 0,
//               marginHorizontal: 10,
//             },
//           }}
//           onPress={(data, details = null) => {
//             // 'details' is provided when fetchDetails = true
//             console.log("console data", data, details);
//             console.log(JSON.stringify(details?.geometry?.location));
//           }}
//           query={{
//             key: "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0",
//             language: "en",
//           }}
//         />
//       </View>
//       <View
//         style={{
//           position: "absolute",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "100%",
//           bottom: 40,
//         }}
//       >
//         <TouchableOpacity
//           activeOpacity={0.7}
//           style={{
//             width: "80%",
//             height: 40,
//             backgroundColor: colors.yellow,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//             Select and go back
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// export default PlacesApi;
// const styles = StyleSheet.create({
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   text: {
//     fontSize: 20,
//     backgroundColor: "lightblue",
//   },
// });

///////////////////marker pointing////////////
const PlacesApi = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 });
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 });
  const [address, setaddress] = useState("");
  const onPress = (data, details) => {
    console.log("first", data);
    console.log("first1", details);
    console.log("first2", details.geometry.location);
    console.log("first3", data.description);
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
  };
  const goBackData = () => {};

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={{
          latitude: regionCoords.lat,
          longitude: regionCoords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          coordinate={{ latitude: marker.lat, longitude: marker.lng }}
          onDragEnd={(e) => {
            console.log("dragEnd", e.nativeEvent.coordinate);
          }}
        />
      </MapView>
      <View style={{ position: "absolute", width: "100%" }}>
        <GooglePlacesAutocomplete
          placeholder=
          // "Search"
          {translation[247][selectedLanguages]}
          query={{
            key: "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0",
            language: "en", // language of the results
          }}
          GooglePlacesDetailsQuery={{
            fields: "geometry",
          }}
          fetchDetails={true}
          onPress={onPress}
          onFail={(error) => console.error(error)}
          // requestUrl={{
          //   url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          //   useOnPlatform: "web",
          // }}
          renderLeftButton={() => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <Image
                source={arrowleft}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor: "black",
                }}
              />
            </TouchableOpacity>
          )}
          styles={{
            textInputContainer: {
              marginVertical: "10%",
              borderTopWidth: 0,
              marginHorizontal: 10,
            },
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          bottom: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => goBackData()}
          activeOpacity={0.7}
          style={{
            width: "80%",
            height: 40,
            backgroundColor: colors.yellow,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {/* Select and go back */}
            {translation[154][selectedLanguages].trim()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PlacesApi;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
  },
  searchbar: {
    // description: {
    //   fontWeight: "bold",
    // },
    // predefinedPlacesDescription: {
    //   color: "#1faadb",
    // },
  },
});
