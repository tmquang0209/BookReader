import React, { useEffect, useState } from "react";

import { Alert, Image, Keyboard, SafeAreaView, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "../components/common/styles";

import { gray5, white } from "../constants/colors";

import { connect } from "react-redux";
import { TextInput } from "react-native-paper";
import { BackButton, Title } from "../components/header";
import { Button } from "../components/button";
import { updatePassword } from "../API/authUser";

const ChangePassword = (props) => {
    const { user } = props;

    const [info, setInfo] = useState({
        curPassword: "",
        newPassword: "",
        rePassword: "",
    });

    const [disable, setDisable] = useState(false);
    const [show, setShow] = useState(true);

    const handleFieldChange = (name, value) => {
        setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const onSubmitPress = async () => {
        Keyboard.dismiss();
        setDisable(true);
        const response = await updatePassword({ ...info, idUser: user.idUser });
        setDisable(false);
        console.log(response);
        if (response.success) {
            Alert.alert("Success", "Change password successfully", [{ text: "OK", onPress: () => props.navigation.goBack() }]);
        } else {
            Alert.alert("Error", response.error || response.message, [{ text: "OK" }]);
        }
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1, margin: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                height: 45,
                                alignItems: "center",
                            }}
                        >
                            <BackButton />
                            <Title name={"Change password"} size={20} />
                        </View>
                        <View>
                            <View>
                                <Text style={{ color: white, fontFamily: "SVN-Gotham-Light", paddingVertical: 5 }}>Current password</Text>
                                <TextInput
                                    placeholder="Enter your current password"
                                    value={info.curPassword}
                                    style={{ backgroundColor: gray5 }}
                                    textColor={white}
                                    onChangeText={(text) => handleFieldChange("curPassword", text)}
                                    secureTextEntry={show}
                                    right={
                                        <TextInput.Icon
                                            color={white}
                                            icon={show ? "eye" : "eye-off"}
                                            onPress={() => {
                                                setShow((prev) => !prev);
                                                Keyboard.dismiss();
                                            }}
                                        />
                                    }
                                />
                            </View>
                            <View>
                                <Text style={{ color: white, fontFamily: "SVN-Gotham-Light", paddingVertical: 5 }}>New password</Text>
                                <TextInput
                                    placeholder="Enter new password"
                                    value={info.newPassword}
                                    style={{ backgroundColor: gray5 }}
                                    textColor={white}
                                    onChangeText={(text) => handleFieldChange("newPassword", text)}
                                    secureTextEntry={show}
                                    right={
                                        <TextInput.Icon
                                            color={white}
                                            icon={show ? "eye" : "eye-off"}
                                            onPress={() => {
                                                setShow((prev) => !prev);
                                                Keyboard.dismiss();
                                            }}
                                        />
                                    }
                                />
                            </View>
                            <View>
                                <Text style={{ color: white, fontFamily: "SVN-Gotham-Light", paddingVertical: 5 }}>Re-password</Text>
                                <TextInput
                                    placeholder="Enter new password"
                                    value={info.rePassword}
                                    style={{ backgroundColor: gray5 }}
                                    textColor={white}
                                    onChangeText={(text) => handleFieldChange("rePassword", text)}
                                    secureTextEntry={show}
                                    right={
                                        <TextInput.Icon
                                            color={white}
                                            icon={show ? "eye" : "eye-off"}
                                            onPress={() => {
                                                setShow((prev) => !prev);
                                                Keyboard.dismiss();
                                            }}
                                        />
                                    }
                                />
                            </View>

                            <Button children={"Submit"} onPress={onSubmitPress} loading={disable} />
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(ChangePassword);
