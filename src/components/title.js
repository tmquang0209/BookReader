import { Text, View } from "react-native";
import { white, accentGreen } from "../constants/colors";
export const Title = ({ name, size = 28 }) => {
    return (
        <Text
            style={{
                color: white,
                fontFamily: "SVN-Gotham-Bold",
                fontSize: size,
            }}
        >
            {name}
        </Text>
    );
};

export const TitleWithinUnderLine = ({ title }) => {
    return (
        <View style={{ alignSelf: "flex-start" }}>
            <Text style={{ fontSize: 24, fontFamily: "SVN-Gotham-Bold", color: white }}>{title}</Text>
            <View style={{ borderWidth: 1, borderColor: accentGreen }}></View>
        </View>
    );
};
