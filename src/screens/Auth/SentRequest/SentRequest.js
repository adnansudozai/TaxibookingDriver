import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../../../theme/colors";
import fonts from "../../../theme/fonts";
import { GradientButton } from "../../../components/GradientButton";
import CustomText from "../../../components/Text";
import Entypo from "react-native-vector-icons/Entypo";
import {
  bells,
  arrowright,
  Success1,
  P,
  Bye,
  Qmark,
  cross,
} from "../../../assets";

const SentRequest = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              alignItems: "flex-end",
              paddingRight: 10,
              paddingTop: 10,
            }}
          >
            <Image
              source={cross}
              resizemode="contain"
              style={{ height: 40, width: 40 }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Image source={Qmark} style={styles.logo_blue} />
          </View>

          <View style={{ paddingTop: 20, width: "100%", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                color: colors.yellow,
                fontFamily: fonts.PoppinsBold,
              }}
            >
              Are you sure?
            </Text>
            <Text style={{ textAlign: "center", paddingTop: 10 }}>
              All your measurement will be updated
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
              marginHorizontal: 20,
              // width: "95%",
              flex: 1,
            }}
          >
            <View
              style={{
                height: 50,
                width: "45%",
                backgroundColor: colors.lightWhite,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 16 }}>No</Text>
            </View>
            <View
              style={{
                height: 50,
                width: "45%",
                backgroundColor: colors.yellow,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>Yes</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logo_blue: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    // alignSelf: "center",
  },
});
export default SentRequest;
