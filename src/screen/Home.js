import React, { useCallback, useEffect, useState } from "react";
import { Animated, Image, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import styles from "../components/common/styles";
import { NoInternet } from "../components/internet";
import { bgDark, black, white } from "../constants/colors";
import { Avatar } from "react-native-paper";
import { connect } from "react-redux";

import { getInterestBook, getTrendingBook } from "../API/book";
import { ForYou, Trending } from "../components/home/recommend";
import { LastBookRead } from "../components/home/lastRead";
import { banner } from "../constants/images";
import { GreetingWithFullName } from "../components/home/greeting";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const HomeView = (props) => {
    const { user } = props;
    const splitFullName = "A";
    const letterName = splitFullName ? splitFullName[splitFullName.length - 1][0] : "";

    const [forYouList, setForYouList] = useState([]);
    const [trendingList, setTrendingList] = useState([]);

    const [refresing, setRefreshing] = useState(false);

    const [loading, setLoading] = useState({
        forYou: true,
        trending: true,
    });

    const fetchBook = async () => {
        const trendingResponse = await getTrendingBook();
        if (trendingResponse) {
            setTrendingList(trendingResponse);
            setLoading({ ...loading, trending: false });
        }
        const forYouResponse = await getInterestBook(user?.idUser);
        if (forYouResponse) {
            setForYouList(forYouResponse.result);
            setLoading({ ...loading, forYou: false });
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setForYouList([]);
        setTrendingList([]);
        fetchBook();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        fetchBook();
    }, []);

    return (
        <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refresing} onRefresh={onRefresh} colors={["#000"]} tintColor={"#000"} />}>
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
