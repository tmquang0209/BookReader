import { View, Text, Image } from "react-native";
import { girlReadingBook } from "../constants/images";
import { accentGreen, white } from "../constants/colors";

export const LogoWithoutText = () => {
    return (
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
        </View>
    );
};

export const LogoWithText = () => {
    return (
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
                    of <Text style={{ color: accentGreen }}>Endless Wonder</Text>
                </Text>
            </View>
        </View>
    );
};
