import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch,
} from "react-native";
import {
  GradientButton,
  GradientsigninButton,
} from "../../../components/GradientButton";
import { CommonActions } from "@react-navigation/routers";
import colors from "../../../theme/colors";
import { TextInput } from "react-native-paper";
import Fontisto from "react-native-vector-icons/Fontisto";
import Headers1 from "../../../components/Headers1";
import SelectDropdown from "react-native-select-dropdown";
//redux
import { prefrancesadd, workingstatus } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import fonts from "../../../theme/fonts";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
import Entypo from "react-native-vector-icons/Entypo";
const DriverPreferences = ({
  user,
  translation,
  prefrancesadd,
  selectedLanguages,
  workingstatus,
}) => {
  console.log("myuser", user);
  const navigation = useNavigation();
  const [isEnable, setIsEnable] = useState(
    user != null && user.is_working == "Yes" ? true : false
  );
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [radiusvalue, setradiusvalue] = useState(
    user != null &&
      (user.radius_in_km != "" ? `${user.radius_in_km} km` : "5 km")
  );
  const [dayinitialfee, setdayinitialfee] = useState(
    user != null && (user.initial_fee_day != "" ? user.initial_fee_day : "")
  );
  const [nightinitialfee, setnightinitialfee] = useState(
    user != null && (user.initial_fee_night != "" ? user.initial_fee_night : "")
  );
  const [dayperkmfee, setdayperkmfee] = useState(
    user != null && (user.rate_per_km_day != "" ? user.rate_per_km_day : "")
  );
  const [nightperkmfee, setnightperkmfee] = useState(
    user != null && (user.rate_per_km_night != "" ? user.rate_per_km_night : "")
  );
  const [daystayfee, setdaystayfee] = useState(
    user != null &&
      (user.price_per_minute_stay_day != ""
        ? user.price_per_minute_stay_day
        : "")
  );
  const [nightstayfee, setnightstayfee] = useState(
    user != null &&
      (user.price_per_minute_stay_night != ""
        ? user.price_per_minute_stay_night
        : "")
  );
  const [paymentmethod, setpaymentmethod] = useState(
    user != null &&
      (user.payment_method_accept != "" ? user.payment_method_accept : "")
  );
  const [cartype, setcartype] = useState(
    user != null && (user.car_type != "" ? user.car_type : "")
  );
  const [carregistration, setcarregistration] = useState(
    user != null &&
      (user.car_Registration_no != "" ? user.car_Registration_no : "")
  );
  const [noofpassenger, setnoofpassenger] = useState(
    user != null && (user.no_of_passenger != "" ? user.no_of_passenger : "")
  );
  const [bagagecapicity, setbagagecapicty] = useState(
    user != null &&
      (user.no_of_luggage_for_car != "" ? user.no_of_luggage_for_car : "")
  );

  const [debit, setdebit] = useState("");
  const [craditcard, setcraditcard] = useState("");

  const [alert, setalert] = useState(false);

  console.log("user is", isEnable);

  useEffect(() => {
    if (user.payment_method_accept == "Both") {
      setdebit("checkbox-active");
      setcraditcard("checkbox-active");
    } else if (user.payment_method_accept == "Cash") {
      setdebit("checkbox-active");
      setcraditcard("checkbox-passive");
    } else if (user.payment_method_accept == "Card") {
      setdebit("checkbox-passive");
      setcraditcard("checkbox-active");
    } else {
      setdebit("checkbox-passive");
      setcraditcard("checkbox-passive");
    }
  }, []);
  console.log(isEnable, "is in able");
  const okhandle = async (item) => {
    setalert(false);
    if (user.user_privilidge == "0") {
      navigation.navigate("Wallet");
    }
  };
  const [Data, setData] = useState("");

  const togleSwitch = async (item) => {
    setLoading(true);
    setIsEnable((previousState) => !previousState);
    const fomData = new FormData();
    fomData.append("u_id", user.u_id);

    if (isEnable == true) {
      fomData.append("status", "No");
    } else {
      fomData.append("status", "Yes");
    }

    const res = await workingstatus(fomData);
    console.log("fomData", res);
    if (res.data.status == true) {
      setLoading(false);
      // setIsEnable(!isEnable);
      // setIsEnable(previousState => !previousState);
      // navigation.navigate("Map");
      // alert(res.data.message);
    } else {
      // setIsEnable(previousState => !previousState);
      setData(res.data.message);
      // setIsEnable(false);

      setalert(true);
      setLoading(false);
    }
  };
  const preferenceshandle = async (id) => {
    console.log("radious value", radiusvalue);
    const myArray = radiusvalue.split(" ");
    if (!dayinitialfee) {
      // setMsg("Enter day initial fee");
      setMsg(translation[224][selectedLanguages]);
      setShowAlert(true);
    } else if (!nightinitialfee) {
      // setMsg("Enter night initial fee");
      setMsg(translation[225][selectedLanguages]);
      setShowAlert(true);
    } else if (!dayperkmfee) {
      // setMsg("Enter day per km fee");
      setMsg(translation[226][selectedLanguages]);
      setShowAlert(true);
    } else if (!nightperkmfee) {
      // setMsg("Enter night per km fee");
      setMsg(translation[227][selectedLanguages]);
      setShowAlert(true);
    } else if (!daystayfee) {
      // setMsg("Enter day stay per minute fee");
      setMsg(translation[228][selectedLanguages]);
      setShowAlert(true);
    } else if (!nightstayfee) {
      // setMsg("Enter night stay per minute fee");
      setMsg(translation[257][selectedLanguages]);
      setShowAlert(true);
    } else if (!paymentmethod) {
      // setMsg("Please select your payment method");
      setMsg(translation[258][selectedLanguages]);
      setShowAlert(true);
    } else if (!cartype) {
      setMsg(translation[334][selectedLanguages]);
      //  Please select your car type

      setShowAlert(true);
    } else if (!carregistration) {
      setMsg(translation[335][selectedLanguages]);
      // Please select your car registration no
      setShowAlert(true);
    } else if (!noofpassenger || !bagagecapicity) {
      setMsg(translation[336][selectedLanguages]);
      // Please fill all detail
      setShowAlert(true);
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("ride_request_radius", myArray[0]);
      formData.append("initial_fee_day", dayinitialfee);
      formData.append("initial_fee_night", nightinitialfee);
      formData.append("rate_per_km_day", dayperkmfee);
      formData.append("rate_per_km_night", nightperkmfee);
      formData.append("rate_per_minute_stay_day", daystayfee);
      formData.append("rate_per_minute_stay_night", nightstayfee);
      formData.append("payment_method_accept", paymentmethod);
      formData.append("car_type", cartype);
      formData.append("car_Registration_no", carregistration);
      formData.append("no_of_passenger", noofpassenger);
      formData.append("baggages", bagagecapicity);
      formData.append("u_id", user.u_id);

      console.log("myformdata", formData);
      const res = await prefrancesadd(formData);
      console.log("formDatares", formData);
      if (res.data.status == true) {
        setLoading(false);
        if (res.data.data.user_privilidge == 2) {
          navigation.navigate("Success", {
            screen: "driverprofile",
          });
        } else if (res.data.data.user_privilidge == 0) {
          setMsg(res.data.message);
          setShowAlert(true);
        } else if (res.data.data.user_privilidge == 1) {
          // setMsg("Your account is blocked,please contact support");
          setMsg(translation[126][selectedLanguages]);
          setShowAlert(true);
        }
      } else {
        setLoading(false);
      }
    }
  };
  const handlecash = () => {
    if (debit == "checkbox-passive") {
      setdebit("checkbox-active");
      if (craditcard == "checkbox-active") {
        setpaymentmethod("Both");
      } else {
        setpaymentmethod("Cash");
      }
    } else {
      setdebit("checkbox-passive");
      if (craditcard == "checkbox-active") {
        setpaymentmethod("Card");
      } else {
        setpaymentmethod("");
      }
    }

    //debit=='checkbox-passive'?setdebit('checkbox-active'):setdebit('checkbox-passive');
  };
  const handlecard = () => {
    if (craditcard == "checkbox-passive") {
      setcraditcard("checkbox-active");
      if (debit == "checkbox-active") {
        setpaymentmethod("Both");
      } else {
        setpaymentmethod("Card");
      }
    } else {
      setcraditcard("checkbox-passive");
      if (debit == "checkbox-active") {
        setpaymentmethod("Cash");
      } else {
        setpaymentmethod("");
      }
    }

    // craditcard=='checkbox-passive'?setcraditcard('checkbox-active'):setcraditcard('checkbox-passive');
  };
  console.log("vavav", radiusvalue);
  const values = ["1 km", "2 km", "3 km", "4 km", "5 km"];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}>
      <Modal
        isVisible={alert}
        coverScreen={true}
        hasBackdrop={true}
        backdropOpacity={0.5}>
        <View
          style={{
            backgroundColor: "#FBFBFB",
            borderRadius: 7,
            borderWidth: 1,
            flex: Platform.OS == "android" ? 0.4 : 0.3,
          }}>
          <Entypo
            name='cross'
            color={colors.yellow}
            size={22}
            onPress={() => setalert(false)}
            style={{
              alignItems: "flex-end",
              alignSelf: "flex-end",
              padding: 10,
            }}
          />
          <View
            style={{
              borderWidth: 0,
              paddingVertical: 20,
              paddingHorizontal: 20,
              marginHorizontal: 10,
            }}>
            <Text style={{ color: "black", fontSize: 18 }}>{Data}</Text>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              borderWidth: 0,
              marginTop: "5%",
            }}>
            <GradientButton
              // title='Ok'
              title={translation[185][selectedLanguages]}
              onButtonPress={() => okhandle()}
            />
          </View>
        </View>
      </Modal>
      <Headers1
        title={translation[17][selectedLanguages]}
        // title='Preferences'
      />
      <Loading visible={loading} />
      <ScrollView style={{ borderWidth: 0, paddingHorizontal: 25 }}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Text style={{ marginTop: 3, marginRight: 1 }}>
            {translation[254][selectedLanguages]}
            {/* Rest */}
          </Text>
          <Switch
            style={{
              transform: [{ scaleX: 1 }, { scaleY: 1 }],
              marginLeft: 10,
            }}
            trackColor={{ false: "#767577", true: "#f4f3f4" }}
            thumbColor={isEnable ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor='#3e3e3e'
            onValueChange={togleSwitch}
            value={isEnable}
          />
          <Text style={{ marginLeft: 10, marginTop: 3 }}>
            {/* Work */}
            {translation[9][selectedLanguages]}
          </Text>
        </View>
        <View
          style={{
            margintop: 40,
          }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsBold }}>
            {/* Set ride request Radious1 */}
            {translation[35][selectedLanguages].trim()}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 15,
              fontFamily: fonts.PoppinsMedium,
            }}>
            {/* Accept ride request within */}
            {translation[36][selectedLanguages].trim()}
          </Text>
          <View>
            {showAlert && (
              <AlertModal
                heading={msg}
                button1={translation[185][selectedLanguages]}
                // button1="OK"
                form={true}
                onOkPress={() => {
                  setShowAlert(false);
                }}
              />
            )}
            <SelectDropdown
              data={values}
              defaultButtonText={radiusvalue}
              buttonStyle={{
                borderRadius: 6,
                height: 33,
                width: 100,
                elevation: 3,
                marginTop: 15,
              }}
              onSelect={(selectedItem, index) => {
                setradiusvalue(selectedItem);
                console.log("selecteddd", selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </View>
        <View
          style={{
            borderWidth: 0,
            marginTop: 40,
          }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsBold }}>
            {/* Set initial fee */}
            {translation[37][selectedLanguages].trim()}
          </Text>

          <View style={{ borderWidth: 0, marginTop: 10 }}>
            <Text
              style={{
                fontSize: 12,
                paddingLeft: 5,
                color: "#4C4747",
                fontFamily: fonts.PoppinsRegular,
              }}>
              {translation[39][selectedLanguages]} 06:00-22:00
              {/* Day 06:00 - 22:00 */}
            </Text>
            <TextInput
              style={{
                height: 50,
                marginTop: 20,
                backgroundColor: "white",
                borderBottomWidth: 0.5,
                width: 180,
                paddingLeft: 5,
              }}
              value={dayinitialfee}
              keyboardType={"number-pad"}
              onChangeText={(fee) => setdayinitialfee(fee)}
              placeholder='100lv'
              selectionColor={colors.primary}
              theme={{
                colors: { primary: colors.primary },
              }}
              // onChangeText={text => onChange(text)}
              // value={value}
            />
          </View>
          <View style={{ borderWidth: 0, marginTop: 30 }}>
            <Text
              style={{
                fontSize: 12,
                paddingLeft: 5,
                color: "#4C4747",
                fontFamily: fonts.PoppinsRegular,
              }}>
              {/* Night 22:00 - 06:00 */}
              {translation[40][selectedLanguages]} 22:00-06:00
            </Text>
            <TextInput
              style={{
                height: 50,
                marginTop: 20,
                backgroundColor: "white",
                borderBottomWidth: 0.5,
                width: 180,
                paddingLeft: 5,
              }}
              value={nightinitialfee}
              keyboardType={"number-pad"}
              onChangeText={(fee) => setnightinitialfee(fee)}
              placeholder='150lv'
              selectionColor={colors.primary}
              theme={{
                colors: { primary: colors.primary },
              }}
              // onChangeText={text => onChange(text)}
              // value={value}
            />
          </View>
        </View>
        <View
          style={{
            borderWidth: 0,
            marginTop: 40,
          }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsBold }}>
            {/* Set rate per km */}
            {translation[41][selectedLanguages]}
          </Text>
          <View style={{ borderWidth: 0, marginTop: 10 }}>
            <Text
              style={{
                fontSize: 12,
                paddingLeft: 5,
                color: "#4C4747",
                fontFamily: fonts.PoppinsRegular,
              }}>
              {/* Day 06:00 - 17:00 */}
              {translation[39][selectedLanguages]} 06:00-22:00
            </Text>
            <TextInput
              style={{
                height: 50,
                marginTop: 20,
                backgroundColor: "white",
                borderBottomWidth: 0.5,
                width: 180,
                paddingLeft: 5,
              }}
              value={dayperkmfee}
              keyboardType={"number-pad"}
              onChangeText={(fee) => setdayperkmfee(fee)}
              placeholder='20lv'
              selectionColor={colors.primary}
              theme={{
                colors: { primary: colors.primary },
              }}
              // onChangeText={text => onChange(text)}
              // value={value}
            />
          </View>
          <View style={{ borderWidth: 0, marginTop: 30 }}>
            <Text
              style={{
                fontSize: 12,
                paddingLeft: 5,
                color: "#4C4747",
                fontFamily: fonts.PoppinsRegular,
              }}>
              {/* Night 22:00 - 06:00 */}
              {translation[40][selectedLanguages]} 22:00-06:00
            </Text>
            <TextInput
              style={{
                height: 50,
                marginTop: 20,
                backgroundColor: "white",
                borderBottomWidth: 0.5,
                width: 180,
                paddingLeft: 5,
              }}
              value={nightperkmfee}
              keyboardType={"number-pad"}
              onChangeText={(fee) => setnightperkmfee(fee)}
              placeholder='25lv'
              selectionColor={colors.primary}
              theme={{
                colors: { primary: colors.primary },
              }}
              // onChangeText={text => onChange(text)}
              // value={value}
            />
          </View>
        </View>
        <View
          style={{
            borderWidth: 0,
            marginTop: 40,
          }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsBold }}>
            {/* Set rate per minute stay */}
            {translation[42][selectedLanguages]}
          </Text>

          <View style={{ borderWidth: 0, marginTop: 10 }}>
            <Text
              style={{
                fontSize: 12,
                paddingLeft: 5,
                color: "#4C4747",
                fontFamily: fonts.PoppinsRegular,
              }}>
              {/* Day 06:00 - 17:00 */}
              {translation[39][selectedLanguages]} 06:00-22:00
            </Text>
            <TextInput
              style={{
                height: 50,
                marginTop: 20,
                backgroundColor: "white",
                borderBottomWidth: 0.5,
                width: 180,
                paddingLeft: 5,
              }}
              value={daystayfee}
              keyboardType={"number-pad"}
              onChangeText={(fee) => setdaystayfee(fee)}
              placeholder='5lv'
              selectionColor={colors.primary}
              theme={{
                colors: { primary: colors.primary },
              }}
              // onChangeText={text => onChange(text)}
              // value={value}
            />
          </View>
          <View style={{ borderWidth: 0, marginTop: 30 }}>
            <Text
              style={{
                fontSize: 12,
                paddingLeft: 5,
                color: "#4C4747",
                fontFamily: fonts.PoppinsRegular,
              }}>
              {/* Night 22:00 - 06:00 */}
              {translation[40][selectedLanguages]} 22:00-06:00
            </Text>
            <TextInput
              style={{
                height: 50,
                marginTop: 20,
                backgroundColor: "white",
                borderBottomWidth: 0.5,
                width: 180,
                paddingLeft: 5,
              }}
              value={nightstayfee}
              keyboardType={"number-pad"}
              onChangeText={(fee) => setnightstayfee(fee)}
              placeholder='8lv'
              selectionColor={colors.primary}
              theme={{
                colors: { primary: colors.primary },
              }}
              // onChangeText={text => onChange(text)}
              // value={value}
            />
          </View>
        </View>
        {/* ///////////////////////////////////////////////// */}
        <View style={{ borderWidth: 0, marginTop: 5 }}>
          <View
            style={{
              borderWidth: 0,
              marginTop: 40,
            }}>
            <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsBold }}>
              Car details
            </Text>

            <View style={{ borderWidth: 0, marginTop: 10 }}>
              <TextInput
                style={{
                  height: 50,
                  marginTop: 20,
                  backgroundColor: "white",
                  borderBottomWidth: 0.5,
                  width: 180,
                  paddingLeft: 5,
                }}
                value={cartype}
                onChangeText={(fee) => setcartype(fee)}
                placeholder='car type'
                selectionColor={colors.primary}
                theme={{
                  colors: { primary: colors.primary },
                }}
                // onChangeText={text => onChange(text)}
                // value={value}
              />
            </View>
            <View style={{ borderWidth: 0, marginTop: 10 }}>
              <TextInput
                style={{
                  height: 50,
                  marginTop: 20,
                  backgroundColor: "white",
                  borderBottomWidth: 0.5,
                  width: 180,
                  paddingLeft: 5,
                }}
                value={carregistration}
                onChangeText={(fee) => setcarregistration(fee)}
                placeholder='car registration no'
                selectionColor={colors.primary}
                theme={{
                  colors: { primary: colors.primary },
                }}
                // onChangeText={text => onChange(text)}
                // value={value}
              />
            </View>
            <View style={{ borderWidth: 0, marginTop: 30 }}>
              <TextInput
                style={{
                  height: 50,
                  marginTop: 20,
                  backgroundColor: "white",
                  borderBottomWidth: 0.5,
                  width: 180,
                  paddingLeft: 5,
                }}
                value={noofpassenger}
                keyboardType={"number-pad"}
                onChangeText={(fee) => setnoofpassenger(fee)}
                placeholder='No of Passengers'
                selectionColor={colors.primary}
                theme={{
                  colors: { primary: colors.primary },
                }}
                // onChangeText={text => onChange(text)}
                // value={value}
              />
            </View>
            <View style={{ borderWidth: 0, marginTop: 30 }}>
              <TextInput
                style={{
                  height: 50,
                  marginTop: 20,
                  backgroundColor: "white",
                  borderBottomWidth: 0.5,
                  width: 180,
                  paddingLeft: 5,
                }}
                value={bagagecapicity}
                keyboardType={"number-pad"}
                onChangeText={(fee) => setbagagecapicty(fee)}
                placeholder='Baggages'
                selectionColor={colors.primary}
                theme={{
                  colors: { primary: colors.primary },
                }}
                // onChangeText={text => onChange(text)}
                // value={value}
              />
            </View>
            {/*  */}
          </View>
        </View>
        <View style={{ marginTop: 40, paddingBottom: 80 }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.PoppinsBold }}>
            {/* Set payment method */}
            {translation[43][selectedLanguages].trim()}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => handlecash()}>
              <Fontisto
                name={debit}
                color={debit == "checkbox-passive" ? "black" : "#ffc93c"}
                size={20}
                style={{ fontSize: 16, marginTop: 30, marginLeft: 2 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 27,
                  marginLeft: 5,
                  fontFamily: fonts.PoppinsRegular,
                }}>
                {/* Cash on spot */}
                {translation[44][selectedLanguages].trim()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => handlecard()}>
              <Fontisto
                name={craditcard}
                color={craditcard == "checkbox-passive" ? "black" : "#ffc93c"}
                size={20}
                style={{ fontSize: 15, marginTop: 30, marginLeft: 30 }}
              />

              <Text
                style={{
                  fontSize: 15,
                  marginTop: 27,
                  marginLeft: 5,
                  fontFamily: fonts.PoppinsRegular,
                }}>
                {/* Debit /Credit card */}
                {translation[45][selectedLanguages]} /{" "}
                {translation[46][selectedLanguages].trim()}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              width: "97%",
              height: 50,
              marginTop: 40,
              backgroundColor: colors.yellow,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => preferenceshandle()}>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "bold",

                marginLeft: 10,
                // fontFamily: fonts.PoppinsBold,
              }}>
              {/* Save Preferences */}
              {translation[47][selectedLanguages].trim()}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  prefrancesadd,
  workingstatus,
})(DriverPreferences);
