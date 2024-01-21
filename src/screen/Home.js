import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import styles from "../components/common/styles";
import { NoInternet } from "../components/internet";
import { white } from "../constants/colors";
import { Avatar } from "react-native-paper";
import { connect } from "react-redux";

import { getInterestBook, getTrendingBook } from "../API/book";
import { ForYou, Trending } from "../components/home/recommend";
import { LastBookRead } from "../components/home/lastRead";
import { banner } from "../constants/images";
import { GreetingWithFullName } from "../components/home/greeting";

const HomeView = (props) => {
    const { user } = props;
    const splitFullName ="A";
    const letterName = splitFullName ? splitFullName[splitFullName.length - 1][0] : "";

    const [forYouList, setForYouList] = useState([]);
    const [trendingList, setTrendingList] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            const forYouResponse = await getInterestBook(user?.idUser);
            const trendingResponse = await getTrendingBook();

            if (forYouResponse) setForYouList(forYouResponse.result);
            if (trendingResponse) setTrendingList(trendingResponse);
        };

        fetchBook();
    }, []);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <GreetingWithFullName fullName={user?.fullName} />
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
            <View style={styles.flexView1}>
                <Image style={styles.bannerImage} source={banner} />
                <LastBookRead user={user} />
                <ForYou list={forYouList} />
                <Trending list={trendingList} />
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
