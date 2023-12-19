import React from "react";
import { Image, View } from "react-native";
import { noInternet } from "../constants/images";
import { Text } from "react-native";
import { white } from "../constants/colors";

export const NoInternet = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "column",
            }}
        >
            <Image
                style={{
                    width: 450,
                    height: 250,
                    alignSelf: "center",
                    marginBottom: 20, // Add margin bottom if needed
                }}
                source={noInternet}
            />
            <View
                style={{
                    width: 350,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: white,
                        textAlign: "center",
                        fontFamily: "SVN-Gotham-Bold",
                        fontSize: 18,
                        fontWeight: 900,
                    }}
                >
                    No Internet
                </Text>
                <Text style={{ color: white, textAlign: "center", fontFamily: "SVN-Gotham-Thin", fontSize: 16, fontWeight: 400 }}>You can read books downloaded or available on your device.</Text>
            </View>
        </View>
    );
};
