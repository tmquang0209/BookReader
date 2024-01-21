import { useEffect, useState } from "react";
import { View, Text, Alert, Keyboard, SafeAreaView, TouchableWithoutFeedback, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";

import { Button } from "../components/button";
import styles from "../components/common/styles";
import { accentGreen, gray2, gray4, white } from "../constants/colors";
import { signupAccount, emptyAuth } from "../store/actions/authActions";
import { LogoWithoutText } from "../components/logo";
import { Title } from "../components/header";
import { validateHtmlTag, validateLimit, validateSpecialCharacter } from "../components/validate/text";
import { validatePassword } from "../components/validate/password";
import { validateEmail } from "../components/validate/email";

const validateField = (field, value, errorMessage) => {
    console.log(validateLimit(field, 0));
    if (value.trim().length === 0) {
        Alert.alert("Error", errorMessage);
        return false;
    } else if (field === "Email" && validateEmail(value) === false) {
        Alert.alert("Error", `${field} is invalid.`);
        return false;
    } else if (!["Email", "Password", "Re-password"].includes(field) && !validateSpecialCharacter(value)) {
        Alert.alert("Error", `${field} cannot contain special characters.`);
        return false;
    } else if (validateHtmlTag(value)) {
        Alert.alert("Error", `${field} cannot contain html tag.`);
        return false;
    } else if (validateLimit(value, 50) === false) {
        Alert.alert("Error", `${field} cannot be more than 50 characters.`);
        return false;
    } else if (validatePassword(value) === false && (field === "Password" || field === "Re-password")) {
        Alert.alert("Error", `${field} must contain at least 1 uppercase, lowercase, number and special character.`);
        return false;
    }
    return true;
};

const Signup = (props) => {
    const { loggedIn, user, err, signupAccount, navigation, emptyAuth } = props;

    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(true);

    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        password: "",
        rePassword: "",
    });

    const onFieldChange = (field, value) => {
        setUserData((prev) => ({ ...prev, [field]: value.trimStart() }));
    };

    const onSubmitPress = async () => {
        const { fullName, email, password, rePassword } = userData;

        if (
            !validateField("Full name", fullName, "Full name cannot be empty.") ||
            !validateField("Email", email, "Email cannot be empty.") ||
            !validateField("Password", password, "Password cannot be empty.") ||
            !validateField("Re-password", rePassword, "Re-password cannot be empty.")
        ) {
            return;
        }

        if (password !== rePassword) {
            Alert.alert("Error", "Password and re-password must be the same.");
            return;
        }

        try {
            setLoading((prev) => !prev);
            await signupAccount(userData);
            if (loggedIn) {
                navigation.replace("SelectGenres");
            }
            setLoading((prev) => !prev);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Something went wrong. Please try again.");
            setLoading((prev) => !prev);
        }
    };

    const emptyErr = async () => {
        await emptyAuth();
    };

    const onLoginPress = () => {
        navigation.navigate("GetStarted");
    };

    const renderErr = () => {
        if (err) {
            Alert.alert("Error", err, [
                {
                    text: "OK",
                    onPress: () => {
                        emptyErr();
                    },
                },
            ]);
        }
    };

    useEffect(() => {
        renderErr();
        if (user?.email) {
            navigation.replace("SelectGenres");
        }
        console.log("signup", user);
    }, [user, err]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <LogoWithoutText />
                    <View
                        style={{
                            marginTop: 20,
                            marginLeft: 20,
                        }}
                    >
                        <Title name="Sign up" />
                    </View>
                    <View style={[styles.containerForm, { marginTop: 10 }]}>
                        <View
                            style={{
                                marginBottom: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: white,
                                    fontSize: 14,
                                    fontFamily: "SVN-Gotham-Book",
                                }}
                            >
                                Looks like you don't have an account.
                            </Text>
                            <Text
                                style={{
                                    color: white,
                                    fontSize: 14,
                                    fontFamily: "SVN-Gotham-Book",
                                }}
                            >
                                Let's create a new account for you.
                            </Text>
                        </View>
                        <TextInput
                            placeholder="Full name"
                            value={userData.fullName}
                            onChangeText={(text) => onFieldChange("fullName", text)}
                            style={{
                                borderRadius: 8,
                            }}
                        />
                        <TextInput
                            placeholder="Email"
                            value={userData.email}
                            onChangeText={(text) => onFieldChange("email", text)}
                            keyboardType="email-address"
                            style={{
                                marginTop: 10,
                                borderRadius: 8,
                            }}
                        />
                        <TextInput
                            placeholder="Password"
                            value={userData.password}
                            onChangeText={(text) => onFieldChange("password", text)}
                            right={
                                <TextInput.Icon
                                    icon={hidden ? "eye" : "eye-off"}
                                    onPress={() => {
                                        setHidden((prev) => !prev);
                                        Keyboard.dismiss();
                                    }}
                                />
                            }
                            secureTextEntry={hidden}
                            style={{
                                marginTop: 10,
                                borderRadius: 8,
                            }}
                        />
                        <TextInput
                            placeholder="Re-password"
                            value={userData.rePassword}
                            onChangeText={(text) => onFieldChange("rePassword", text)}
                            right={
                                <TextInput.Icon
                                    icon={hidden ? "eye" : "eye-off"}
                                    onPress={() => {
                                        setHidden((prev) => !prev);
                                        Keyboard.dismiss();
                                    }}
                                />
                            }
                            secureTextEntry={hidden}
                            style={{
                                marginTop: 10,
                                borderRadius: 8,
                            }}
                        />
                        <Text
                            style={{
                                marginTop: 16,
                                color: white,
                                fontSize: 14,
                            }}
                        >
                            By selecting Create Account below, I agree to <Text style={{ color: accentGreen, fontWeight: 800 }}>Terms of Service</Text> &{" "}
                            <Text
                                style={{
                                    color: accentGreen,
                                    fontWeight: 800,
                                }}
                            >
                                Privacy Policy
                            </Text>
                        </Text>
                        <Button children={"Create account"} onPress={onSubmitPress} loading={loading} />
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 32,
                                marginBottom: 32,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    height: 2,
                                    backgroundColor: gray4,
                                }}
                            />
                            <Text
                                style={{
                                    marginLeft: 16,
                                    marginRight: 16,
                                    color: gray2,
                                }}
                            >
                                Or
                            </Text>
                            <View
                                style={{
                                    flex: 1,
                                    height: 2,
                                    backgroundColor: gray4,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "SVN-Gotham-Regular",
                                    fontWeight: 400,
                                    color: white,
                                    fontSize: 14,
                                }}
                            >
                                Already have an account?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => onLoginPress()}>
                                <Text
                                    style={{
                                        color: accentGreen,
                                        fontFamily: "SVN-Gotham-Bold",
                                    }}
                                >
                                    Log in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        err: state.auth.err,
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, { signupAccount, emptyAuth })(Signup);
