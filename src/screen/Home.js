import React, { useCallback, useEffect, useState } from "react";
import { Image, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import styles from "../components/common/styles";
import { NoInternet } from "../components/internet";
import { white } from "../constants/colors";
import { Avatar } from "react-native-paper";
import { connect } from "react-redux";

import { getInterestBook, getLastBookRead, getTrendingBook } from "../API/book";
import { ForYou, Trending } from "../components/home/recommend";
import { LastBookRead } from "../components/home/lastRead";
import { banner } from "../constants/images";
import { GreetingWithFullName } from "../components/home/greeting";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import SplashModal from "./SplashScreen";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const HomeView = (props) => {
    const { user, data } = props;
    const splitFullName = "A";
    const letterName = splitFullName ? splitFullName[splitFullName.length - 1][0] : "";

    const [lastRead, setLastRead] = useState({});
    const [forYouList, setForYouList] = useState([]);
    const [trendingList, setTrendingList] = useState([]);

    const [refresing, setRefreshing] = useState(false);

    const [loading, setLoading] = useState({
        lastRead: true,
        forYou: true,
        trending: true,
    });

    const fetchBook = async () => {
        const lastReadResponse = await getLastBookRead(user?.idUser);
        if (lastReadResponse) {
            setLastRead(lastReadResponse.result[0]);
            setLoading({ ...loading, lastRead: false });
        }

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
        setLastRead();
        setForYouList([]);
        setTrendingList([]);
        fetchBook();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        if (data.lastRead) {
            setLastRead(data.lastRead);
            setLoading({ ...loading, lastRead: false });
        }

        if (data.trending) {
            setTrendingList(data.trending);
            setLoading({ ...loading, trending: false });
        }

        if (data.forYou) {
            setForYouList(data.forYou);
            setLoading({ ...loading, forYou: false });
        }
    }, [data]);

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
                <LastBookRead user={user} data={lastRead} />
                <ForYou list={forYouList} />
                <Trending list={trendingList} />
            </View>
        </ScrollView>
    );
};

const Home = (props) => {
    const { user } = props;
    const { isConnected } = useNetInfo();

    const [data, setData] = useState({});
    const [showSplash, setShowSplash] = useState(true);

    const fetchBook = async () => {
        const lastReadResponse = await getLastBookRead(user?.idUser);
        if (lastReadResponse) {
            setData({ ...data, lastRead: lastReadResponse.result[0] });
        }

        const trendingResponse = await getTrendingBook();
        if (trendingResponse) {
            setData({ ...data, trending: trendingResponse });
        }
        const forYouResponse = await getInterestBook(user?.idUser);
        if (forYouResponse) {
            setData({ ...data, forYou: forYouResponse.result });
        }
    };

    useEffect(() => {
        fetchBook();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowSplash(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    return <SafeAreaView style={styles.container}>{showSplash ? <SplashModal /> : isConnected ? <HomeView user={user} data={data} /> : <NoInternet />}</SafeAreaView>;
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, {})(Home);
