import { View, Text, Image, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import styles from "../common/styles";
import * as Progress from "react-native-progress";
import { white, accentGreen, BGShade } from "../../constants/colors";
import { getLastBookRead } from "../../API/book";
import { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerItem = () => {
    return (
        <View style={styles.itemBox}>
            <View style={styles.lastViewContainer}>
                <View style={{ width: 115, height: 150, marginRight: 15 }}>
                    <ShimmerPlaceholder style={{ width: 115, height: 150 }} shimmerColors={["#333", "#222", "#111"]} />
                </View>
                <View style={{ marginLeft: 15, marginTop: 16, flex: 1 }}>
                    <ShimmerPlaceholder style={{ width: 150, height: 20, marginBottom: 8 }} shimmerColors={["#333", "#222", "#111"]} />
                    <ShimmerPlaceholder style={{ width: 100, height: 20, marginBottom: 8 }} shimmerColors={["#333", "#222", "#111"]} />
                    <ShimmerPlaceholder style={{ width: 100, height: 20, marginBottom: 8 }} shimmerColors={["#333", "#222", "#111"]} />
                    <ShimmerPlaceholder style={{ width: 100, height: 20, marginBottom: 8 }} shimmerColors={["#333", "#222", "#111"]} />
                </View>
            </View>
        </View>
    );
};

export const LastBookRead = ({ user, data }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    //handle press continue reading
    const handlePressContinueReading = () => {
        //get last page
        if (data.id) navigation.navigate("Reading", { user, bookId: data.id, file: data.formats.epub });
        //display error with toast
        else console.log("error");
    };

    return (
        <>
            {!data && loading && <ShimmerItem />}
            {data && (
                <>
                    <View style={styles.itemBox}>
                        <Text style={styles.headerItem}>Last book read</Text>
                        <View style={styles.lastViewContainer}>
                            <ImageBackground
                                source={{ uri: data?.formats?.image }}
                                resizeMode="cover"
                                blurRadius={2}
                                style={[styles.backgroundImage, { position: "relative", width: 115, height: 150 }]}
                            >
                                <LinearGradient colors={["#18191900", "#18191999", "#181919"]}>
                                    <Image style={styles.lastReadImg} source={{ uri: data?.formats?.image }} />
                                </LinearGradient>
                            </ImageBackground>
                            <View style={{ marginLeft: 15, marginTop: 16, flex: 1 }}>
                                <Text style={styles.itemBookName} numberOfLines={1}>
                                    {data?.title}
                                </Text>
                                <Text style={styles.itemBookAuthor}>{data?.authors && data?.authors[0] && data?.authors[0]?.name}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", height: 15, marginTop: 8 }}></View>
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
                </>
            )}
        </>
    );
};
