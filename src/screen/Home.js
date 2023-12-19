import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import styles from "../components/styles";
import { NoInternet } from "./NoInternet";
import { accentGreen, white, BGShade } from "../constants/colors";
import { Avatar, Button } from "react-native-paper";
import { connect } from "react-redux";
import { NextIcon } from "../constants/images";

import * as Progress from "react-native-progress";

const Banner = () => {};

const LastBookRead = () => {
    return (
        <View style={styles.itemBox}>
            <Text style={styles.headerItem}>Last book read</Text>
            <View style={{ height: 150, backgroundColor: "#FFFFFF1F", flex: 1, flexDirection: "row" }}>
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

const ForYou = ({ list }) => {
    console.log(list);
    return (
        <View style={styles.itemBox}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerItem}>For you</Text>
                <View style={styles.showAllContainer}>
                    <TouchableOpacity>
                        <Text style={styles.showAllText}>
                            Show all <NextIcon />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <FlatList
                    horizontal
                    data={list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginRight: 10 }}>
                                <Image
                                    style={styles.imageItemHome}
                                    source={{
                                        uri: item.img,
                                    }}
                                />
                                <View>
                                    <Text style={styles.itemBookName}>{item.name}</Text>
                                    <Text style={styles.itemBookAuthor}>{item.author}</Text>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const HomeView = (props) => {
    const { user } = props;
    const splitFullName = user.fullName.split(" ");
    const letterName = splitFullName[splitFullName.length - 1][0];

    const [forYou, setForYou] = useState();

    useEffect(() => {
        setForYou([
            { id: 1, img: "https://www.gutenberg.org/cache/epub/46/images/bookcover.jpg", name: "Bee", author: "ABC" },
            { id: 2, img: "https://www.gutenberg.org/cache/epub/46/images/bookcover.jpg", name: "Bee", author: "ABC" },
            { id: 3, img: "https://www.gutenberg.org/cache/epub/46/images/bookcover.jpg", name: "Bee", author: "ABC" },
            { id: 4, img: "https://www.gutenberg.org/cache/epub/46/images/bookcover.jpg", name: "Bee", author: "ABC" },
            { id: 5, img: "https://www.gutenberg.org/cache/epub/46/images/bookcover.jpg", name: "Bee", author: "ABC" },
        ]);
    }, []);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    flexDirection: "row",
                    margin: 10,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            color: white,
                            fontSize: 12,
                        }}
                    >
                        Good morning,
                    </Text>
                    <Text
                        style={{
                            fontSize: 24,
                            color: white,
                            fontFamily: "SVN-Gotham-Bold",
                        }}
                    >
                        {user?.fullName}
                    </Text>
                </View>
                <View>
                    <Avatar.Text
                        label={letterName}
                        size={48}
                        style={{
                            backgroundColor: "red",
                        }}
                        color={white}
                    />
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                }}
            >
                <LastBookRead />
                <ForYou list={forYou} />
            </View>
        </ScrollView>
    );
};

const Home = (props) => {
    const { user } = props;
    const { isConnected } = useNetInfo();

    return <SafeAreaView style={styles.container}>{isConnected ? <HomeView user={user} /> : <NoInternet />}</SafeAreaView>;
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, {})(Home);
