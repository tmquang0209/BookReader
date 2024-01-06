import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableWithoutFeedback, Alert, Keyboard } from "react-native";
import { connect } from "react-redux";
import styles from "../components/common/styles";
import { LogoWithoutText } from "../components/logo";
import { Title, BackButton } from "../components/header";
import { white, accentGreen } from "../constants/colors";
import { TextInput } from "react-native-paper";
import { Button } from "../components/button";
import { FontAwesome5 } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { resetPassword } from "../API/authUser";

const SetPassword = ({ navigation, route }) => {
    const { email, code } = route.params;
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");
    const [hidden, setHidden] = useState(false);

    const onSubmitPress = async () => {
        setLoading((prev) => !prev);

        const response = await resetPassword(email, code, newPassword, reNewPassword);
        if (!response.success) {
            Alert.alert("Error", response.message);
            setLoading((prev) => !prev);
            return;
        }

        Alert.alert("Successful", response.message, [
            {
                text: "OK",
                onPress: () => navigation.navigate("GetStarted"),
            },
        ]);
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <SafeAreaView style={styles.container}>
                    <BackButton name={"Back to Login"} componentName={"GetStarted"} />
                    <LogoWithoutText />
                    <View
                        style={{
                            marginTop: 80,
                            marginLeft: 20,
                        }}
                    >
                        <Title name={"Set password"} size={25} />
                    </View>
                    <View style={[styles.containerForm, { marginTop: 10 }]}>
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <FontAwesome5 name="check-circle" size={60} color={accentGreen} />
                            <Text
                                style={{
                                    fontFamily: "SVN-Gotham-Bold",
                                    color: white,
                                    fontSize: 16,
                                }}
                            >
                                Code verified
                            </Text>
                        </View>
                        <TextInput
                            placeholder="Enter new password"
                            style={{
                                marginTop: 20,
                                borderRadius: 8,
                            }}
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            secureTextEntry={hidden}
                            right={<TextInput.Icon icon={hidden ? "eye" : "eye-off"} onPress={() => setHidden((prev) => !prev)} />}
                        />
                        <TextInput
                            placeholder="Re-type new password"
                            style={{
                                marginTop: 20,
                                borderRadius: 8,
                            }}
                            value={reNewPassword}
                            onChangeText={(text) => setReNewPassword(text)}
                            secureTextEntry={hidden}
                            right={<TextInput.Icon icon={hidden ? "eye" : "eye-off"} onPress={() => setHidden((prev) => !prev)} />}
                        />
                        <Button children={"Set password"} loading={loading} onPress={onSubmitPress} />
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

const mapStateToProps = (state) => ({
    err: state.auth.err,
});

export default connect(mapStateToProps, {})(SetPassword);
