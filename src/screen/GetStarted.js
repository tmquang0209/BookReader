import { useEffect, useState } from "react";
import {
    Keyboard,
    TouchableWithoutFeedback,
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import styles from "../components/styles";
import { girlReadingBook, googleLogo } from "../constants/images";
import { accentGreen, gray2, gray4, gray5, white } from "../constants/colors";

const GetStarted = (props) => {
    const { user, err, loginUser, navigation } = props;

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSubmitPress = async () => {
        setLoading((prev) => !prev);
        try {
            await loginUser({ email, password });
        } catch (error) {
            console.log("Error", error.message);
        }
        setLoading((prev) => !prev);
    };

    const onSignupPress = () => {
        navigation.navigate("Signup");
    };

    const renderErr = () => {
        err && Alert.alert("Error", err);
    };

    useEffect(() => {
        renderErr();
        console.log("err message:", err);
        if (user.email) navigation.replace("bottomTab");
    }, [user, err]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <View
                        style={{
                            marginTop: 50,
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={girlReadingBook}
                            style={{
                                width: 250,
                                height: 180,
                                alignSelf: "center",
                            }}
                        />
                        <View>
                            <Text
                                style={{
                                    fontFamily: "Cera-Pro-Bold",
                                    color: white,
                                    fontSize: 25,
                                }}
                            >
                                Wander Through Pages
                            </Text>
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontSize: 25,
                                    fontFamily: "Cera-Pro-Bold",
                                    color: white,
                                }}
                            >
                                of{" "}
                                <Text style={{ color: accentGreen }}>
                                    Endless Wonder
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: gray5,
                            marginTop: 50,
                            marginLeft: 20,
                            marginRight: 20,
                            padding: 16,
                            borderRadius: 12,
                            marginBottom: 10,
                        }}
                    >
                        <TextInput
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                            keyboardType="email-address"
                            style={{
                                borderRadius: 8,
                            }}
                        />
                        <TextInput
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry
                            style={{
                                marginTop: 10,
                                borderRadius: 8,
                            }}
                        />
                        <Button
                            mode="contained-tonal"
                            onPress={() => onSubmitPress()}
                            style={{
                                marginTop: 16,
                                marginBottom: 16,
                                backgroundColor: accentGreen,
                                borderRadius: 8,
                            }}
                            loading={loading}
                            disabled={loading}
                        >
                            <Text
                                style={{
                                    color: gray4,
                                    fontFamily: "SVN-Gotham-Bold",
                                }}
                            >
                                Login
                            </Text>
                        </Button>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: accentGreen,
                                    fontFamily: "SVN-Gotham-Bold",
                                    fontSize: 14,
                                    fontWeight: "700",
                                }}
                            >
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
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
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={{
                                    backgroundColor: white,
                                    flexDirection: "row",
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                    paddingTop: 14,
                                    paddingBottom: 14,
                                    borderRadius: 8,
                                    marginBottom: 32,
                                }}
                            >
                                <Image
                                    style={{
                                        marginRight: 8,
                                        width: 23,
                                        height: 23,
                                    }}
                                    source={googleLogo}
                                />
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "SVN-Gotham-Bold",
                                            fontWeight: 700,
                                            alignSelf: "center",
                                        }}
                                    >
                                        Login with google
                                    </Text>
                                </View>
                            </TouchableOpacity>
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
                                Don't have an account?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => onSignupPress()}>
                                <Text
                                    style={{
                                        color: accentGreen,
                                        fontFamily: "SVN-Gotham-Bold",
                                    }}
                                >
                                    Sign up
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
    };
};

export default connect(mapStateToProps, { loginUser })(GetStarted);