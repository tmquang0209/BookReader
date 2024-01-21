import { SafeAreaView, View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import styles from "../components/common/styles";
import { Line } from "../components/common/line";
import { TitleWithinUnderLine } from "../components/header";
import { accentGreen, white } from "../constants/colors";
import { dictionaryIcon, logoutIcon, userIcon } from "../constants/images";
import { logoutUser } from "../store/actions/authActions";

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

    const onDictionary = () => {
        navigation.navigate("Dictionary");
    };

    const onChangeGenres = () => {
        navigation.navigate("SelectGenres");
    };

    const onChangePassword = () => {
        navigation.navigate("ChangePassword");
    };

    const onLogoutPress = () => {
        logoutUser();
        navigation.navigate("GetStarted");
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
                        <Text style={{ fontFamily: "SVN-Gotham-Bold", fontSize: 15, color: white }}>{user?.fullName}</Text>
                        <Text style={{ fontFamily: "SVN-Gotham-Light", fontSize: 13, color: white }}>{user?.email}</Text>

                        <TouchableOpacity style={{ alignItems: "center", width: "40%", flexDirection: "row" }}>
                            <MaterialCommunityIcons name="crown-outline" size={24} color={accentGreen} />
                            <Text style={{ padding: 10, color: accentGreen }}>Premium</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Line />
                <View
                    style={{
                        gap: 20,
                    }}
                >
                    <MenuItem iconLeft={userIcon} title={"Profile details"} iconRight={"arrow-right"} onPress={onProfileDetail} />
                    <MenuItem iconLeft={dictionaryIcon} title={"Your dictionary"} iconRight={"arrow-right"} onPress={onDictionary} />
                    <MenuItem iconLeft={dictionaryIcon} title={"Genres"} iconRight={"arrow-right"} onPress={onChangeGenres} />
                    <MenuItem iconLeft={dictionaryIcon} title={"Change password"} iconRight={"arrow-right"} onPress={onChangePassword} />
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
