import { SafeAreaView, View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

import styles from "../components/styles";
import { Line } from "../components/line";
import { TitleWithinUnderLine } from "../components/title";
import { Avatar } from "react-native-paper";
import { accentGreen, white } from "../constants/colors";
import { logoutIcon, userIcon } from "../constants/images";
import { logoutUser } from "../store/actions/authActions";
import { useNavigation } from "@react-navigation/native";

const MenuItem = ({ iconLeft, title, iconRight, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
            onPress={() => onPress()}
        >
            <Image source={iconLeft} style={{ width: 50, height: 50 }} />
            <Text
                style={{
                    flex: 1,
                    marginLeft: 20,
                    color: white,
                    fontFamily: "SVN-Gotham-Thin",
                }}
            >
                {title}
            </Text>
            {iconRight && <SimpleLineIcons name={iconRight} size={16} color={white} />}
        </TouchableOpacity>
    );
};

const Profile = (props) => {
    const { user, logoutUser } = props;
    const navigation = useNavigation();

    const onProfileDetail = () => {
        navigation.navigate("ProfileDetails");
    };

    const onLogoutPress = () => {
        logoutUser();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, margin: 10 }}>
                <TitleWithinUnderLine title={"Account"} />
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View>
                        <Avatar.Text label="A" style={{ borderRadius: 90 }} />
                    </View>
                    <View style={{ marginLeft: 20, flex: 3 }}>
                        <Text style={{ fontFamily: "SVN-Gotham-Bold", fontSize: 15, color: white }}>{user.fullName}</Text>
                        <Text style={{ fontFamily: "SVN-Gotham-Light", fontSize: 13, color: white }}>{user.email}</Text>

                        <TouchableOpacity style={{ alignItems: "center", width: "40%", flexDirection: "row" }}>
                            <MaterialCommunityIcons name="crown-outline" size={24} color={accentGreen} />
                            <Text style={{ padding: 10, color: accentGreen }}>Premium</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Line />
                <View>
                    <MenuItem iconLeft={userIcon} title={"Profile details"} iconRight={"arrow-right"} onPress={onProfileDetail} />
                    <Line />
                    <MenuItem iconLeft={logoutIcon} title={"Logout"} onPress={onLogoutPress} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(Profile);
