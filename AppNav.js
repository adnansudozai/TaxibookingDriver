/** @format */

import React, { useEffect, useState } from "react";
import { View, PermissionsAndroid } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
//screens
import DrawerContent from "./src/navigation/DrawerContent";
import { connect } from "react-redux";
import Splash from "./src/screens/Auth/Splash";
import Changepassword from "./src/screens/Auth/Changepassword";
import SentRequest from "./src/screens/Auth/SentRequest/SentRequest";
import TransactionDeclined from "./src/screens/App/TransactionDeclined";
import Signup from "./src/screens/Auth/Signup";
import OTP from "./src/screens/Auth/Registration/OTP";
import Forget from "./src/screens/Auth/ForgetPassword";
import Reset from "./src/screens/Auth/Reset";
import Success from "./src/screens/Auth/Success";
import EditProfile from "./src/screens/App/EditProfile";
import TermsCondition from "./src/screens/App/TermsCondition";
import Ratings from "./src/screens/App/Ratings/Ratings";
import TripHistory from "./src/screens/App/TripHistory/TripHistory";
import Wallet from "./src/screens/App/Wallet";
import MyLocation from "./src/screens/App/MyLocation/MyLocation";
import Support from "./src/screens/App/Support";
import ListDriver from "./src/screens/App/ListDriver/ListDriver";
import Map from "./src/screens/App/Map";
import PlacesApi from "./src/screens/App/PlacesApi";
import ArrivalStatus from "./src/screens/App/ArrivalStatus";
import BillingPayment from "./src/screens/App/BillingPayment";
import BlockedDrivers from "./src/screens/App/BlockedDrivers/BlockedDrivers";
// import DriverPreferences
import GetPayment from "./src/screens/App/GetPayment";

import chatting from "./src/screens/App/chatting";
import DriverPreferences from "./src/screens/App/Driverpreferences/DriverPreferences";
import Listofrides from "./src/screens/App/Listofrides/Listofrides";
import OtpSignUp from "./src/screens/Auth/OtpSignUp";
import { LogBox } from "react-native";
import DriverContactus from "./src/screens/App/DriverContactus/DriverContactus";
import DriverProfile from "./src/screens/App/DriverProfile/DriverProfile";
import DriverSoS from "./src/screens/App/DriverSoS/DriverSoS";
import DriverViewRequest from "./src/screens/App/DriverViewRequest/DriverViewRequest";
import StartRide from "./src/screens/App/StartRide/StartRide";
import RideAmmount from "./src/screens/App/PayRideammount/";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
export function DrawerNav({ isLoggedIn }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName={!isLoggedIn ? "Splash" : "Splash"}
      >
        {/* {isLoggedIn && (
        )} */}
        <Drawer.Screen name="Splash" component={Splash} />
        <Drawer.Screen name="Reset" component={Reset} />
        <Drawer.Screen name="BlockedDrivers" component={BlockedDrivers} />
        <Drawer.Screen
          name="TransactionDeclined"
          component={TransactionDeclined}
        />
        <Drawer.Screen name="RideAmmount" component={RideAmmount} />
        <Drawer.Screen name="GetPayment" component={GetPayment} />
        <Drawer.Screen name="EditProfile" component={EditProfile} />
        <Drawer.Screen name="Changepassword" component={Changepassword} />
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="OTP" component={OTP} />
        <Drawer.Screen name="Success" component={Success} />
        <Drawer.Screen name="chatting" component={chatting} />
        <Drawer.Screen name="Forget" component={Forget} />
        <Drawer.Screen name="SentRequest" component={SentRequest} />
        <Drawer.Screen name="Ratings" component={Ratings} />
        <Drawer.Screen name="TripHistory" component={TripHistory} />
        <Drawer.Screen name="MyLocation" component={MyLocation} />
        <Drawer.Screen name="Wallet" component={Wallet} />
        <Drawer.Screen name="Support" component={Support} />
        <Drawer.Screen name="ListDriver" component={ListDriver} />
        <Drawer.Screen name="TermsCondition" component={TermsCondition} />
        <Drawer.Screen name="Map" component={Map} />
        <Drawer.Screen name="PlacesApi" component={PlacesApi} />
        <Drawer.Screen name="ArrivalStatus" component={ArrivalStatus} />
        <Drawer.Screen name="BillingPayment" component={BillingPayment} />
        <Drawer.Screen
          name="DriverPreferences"
          component={DriverPreferences}
          options={{ swipeEnabled: false }}
        />
        <Drawer.Screen name="Listofrides" component={Listofrides} />
        <Drawer.Screen name="OtpSignUp" component={OtpSignUp} />
        {/* <Drawer.Screen name="AppNav" component={AppNav} /> */}
        <Drawer.Screen name="DriverContactus" component={DriverContactus} />
        <Drawer.Screen
          name="DriverProfile"
          component={DriverProfile}
          options={{ swipeEnabled: false }}
        />
        <Drawer.Screen name="DriverSoS" component={DriverSoS} />
        <Drawer.Screen name="DriverViewRequest" component={DriverViewRequest} />
        <Drawer.Screen name="StartRide" component={StartRide} />

        {/* {isLoggedIn && <Drawer.Screen name="Cart" component={Cart} />} */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

LogBox.ignoreAllLogs();
function AppNav({ route }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Splash"}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="GetPayment"
          component={GetPayment}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="DrawerNav"
          component={DrawerNav}
          options={{ headerShown: false, animationEnabled: true }}
        />
        <Stack.Screen
          name="RideAmmount"
          component={RideAmmount}
          options={{ headerShown: false, animationEnabled: true }}
        />
        {/* <Stack.Screen
          name="PaymentInformation"
          component={PaymentInformation}
          options={{ headerShown: false, animationEnabled: true }}
        /> */}

        <Stack.Screen
          name="chatting"
          component={chatting}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="DriverPreferences"
          component={DriverPreferences}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="Listofrides"
          component={Listofrides}
          options={{ headerShown: false, animationEnabled: true }}
        />
        <Stack.Screen
          name="OtpSignUp"
          component={OtpSignUp}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="Changepassword"
          component={Changepassword}
          options={{ headerShown: false, animationEnabled: true }}
        />
        {/* <Stack.Screen
          name=" DriverPreferences"
          component={DriverPreferences}
          options={{ headerShown: false, animationEnabled: true }}
        /> */}

        <Stack.Screen
          name="PlacesApi"
          component={PlacesApi}
          options={{ headerShown: false, animationEnabled: true }}
        />
        <Stack.Screen
          name="SentRequest"
          component={SentRequest}
          options={{ headerShown: false, animationEnabled: true }}
        />
      
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false, animationEnabled: true }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false, animationEnabled: true }}
        />
        <Stack.Screen
          name="Forget"
          component={Forget}
          options={{ headerShown: false, animationEnabled: true }}
        />
        {/* <Stack.Screen
          name="Stripe"
          component={Stripe}
          options={{ headerShown: false, animationEnabled: true }}
        /> */}
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{ headerShown: false, animationEnabled: true }}
        />
        {/* <Stack.Screen
          name="Paypal"
          component={Paypal}
          options={{ headerShown: false, animationEnabled: true }}
        /> */}
        <Stack.Screen
          name="Success"
          component={Success}
          options={{ headerShown: false, animationEnabled: true }}
        />

        {/* <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="DriverContactus"
          component={DriverContactus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverProfile"
          component={DriverProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverSoS"
          component={DriverSoS}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverViewRequest"
          component={DriverViewRequest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StartRide"
          component={StartRide}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => {
  console.log("mystate", state);
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn,
  };
};
export default connect(mapStateToProps)(AppNav);
