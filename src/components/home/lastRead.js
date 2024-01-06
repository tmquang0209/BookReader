import { View, Text, Image, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import styles from "../common/styles";
import * as Progress from "react-native-progress";
import { white, accentGreen, BGShade } from "../../constants/colors";
import { getLastBookRead } from "../../API/book";
import { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export const LastBookRead = ({ user }) => {
    const navigation = useNavigation();

    const [data, setData] = useState([]);

    //use callback to get last book read
    const getData = useCallback(async () => {
        const response = await getLastBookRead(user.idUser);
        console.log(response);
        setData(response.result[0]);
    }, [user]);

    //handle press continue reading
    const handlePressContinueReading = () => {
        //get last page
        if (data.id) navigation.navigate("Reading", { user, bookId: data.id, file: data.formats.epub });
        //display error with toast
        else console.log("error");
    };

    useEffect(() => {
        getData();
        console.log(data);
    }, [getData]);

    return (
        <>
            {data && (
                <View style={styles.itemBox}>
                    <Text style={styles.headerItem}>Last book read</Text>
                    <View style={styles.lastViewContainer}>
                        <ImageBackground source={{ uri: data?.formats?.image }} resizeMode="cover" blurRadius={2} style={[styles.backgroundImage, { position: "relative", width: 115, height: 150 }]}>
                            <LinearGradient colors={["#18191900", "#18191999", "#181919"]}>
                                <Image style={styles.lastReadImg} source={{ uri: data?.formats?.image }} />
                            </LinearGradient>
                        </ImageBackground>

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
                                    labelStyle={{ fontSize: 13, fontFamily: "SVN-Gotham-Bold", color: { BGShade } }}
                                    onPress={() => handlePressContinueReading()}
                                >
                                    Continue reading
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
};
