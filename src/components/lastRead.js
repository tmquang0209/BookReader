import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import styles from "./styles";
import * as Progress from "react-native-progress";
import { white, accentGreen, BGShade } from "../constants/colors";

export const LastBookRead = () => {
    return (
        <View style={styles.itemBox}>
            <Text style={styles.headerItem}>Last book read</Text>
            <View style={{ height: 150, backgroundColor: "rgba(255, 255, 255, 0.12)", flex: 1, flexDirection: "row" }}>
                <Image
                    style={{
                        width: 100,
                        height: 140,
                        marginLeft: 16,
                        marginTop: 9,
                    }}
                    source={{
                        uri: "https://www.gutenberg.org/cache/epub/46/images/bookcover.jpg",
                    }}
                />
                <View style={{ marginLeft: 15, marginTop: 16, flex: 1 }}>
                    <Text style={styles.itemBookName}>The Bee</Text>
                    <Text style={styles.itemBookAuthor}>Paul Murray</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", height: 15, marginTop: 8 }}>
                        <View>
                            <Progress.Bar
                                progress={0.3}
                                style={{
                                    height: 6,
                                }}
                                color={white}
                            />
                        </View>
                        <Text
                            style={{
                                color: white,
                                fontFamily: "SVN-Gotham-Light",
                                fontSize: 10,
                                marginLeft: 8, // Adjust the margin as needed
                            }}
                        >
                            24/520
                        </Text>
                    </View>
                    <View style={{ marginRight: 10, marginTop: 16 }}>
                        <Button
                            mode="contained-tonal"
                            style={{
                                borderRadius: 4,
                                backgroundColor: accentGreen,
                            }}
                        >
                            <Text style={{ fontSize: 13, fontFamily: "SVN-Gotham-Bold", color: { BGShade } }}>Continue reading</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    );
};
