import React, { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import styles from "../components/styles";
import { NoInternet } from "./NoInternet";
import { white } from "../constants/colors";
import { Avatar } from "react-native-paper";
import { connect } from "react-redux";

import { getInterestBook } from "../API/book";
import { ForYou } from "../components/recommend";
import { LastBookRead } from "../components/lastRead";
import { banner } from "../constants/images";

const Banner = () => {};

const HomeView = (props) => {
    const { user } = props;
    const splitFullName = user?.fullName?.split(" ");
    const letterName = splitFullName ? splitFullName[splitFullName.length - 1][0] : "";

    const [forYouList, setForYouList] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            const response = await getInterestBook(user.idUser);

            if (response) setForYouList(response.result);
        };
        fetchBook();
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
                <Image
                    style={{
                        width: Dimensions.get("screen").width - 15,
                        height: 200,
                        margin: 5,
                        borderRadius: 10,
                        alignSelf: "center",
                    }}
                    source={banner}
                />
                <LastBookRead />
                <ForYou list={forYouList} />
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
