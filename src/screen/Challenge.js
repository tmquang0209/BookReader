import { Animated, Dimensions, FlatList, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

import styles from "../components/common/styles";
import { TitleWithinUnderLine } from "../components/header";
import { accentGreen, black, gray4, white } from "../constants/colors";
import { congratulations, encouragement } from "../constants/text";
import { getAllChallenges } from "../API/challenges";
import React, { useEffect, useState } from "react";
import { fullDate, longDate } from "../components/date/date";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerItem = () => {
    const titleRef = React.useRef();
    const startRef = React.useRef();
    const endRef = React.useRef();
    const progressRef = React.useRef();
    const quoteRef = React.useRef();
    const visible = false;

    useEffect(() => {
        const facebookAnimated = Animated.stagger(400, [
            Animated.parallel([titleRef.current?.getAnimated(), startRef.current?.getAnimated(), progressRef.current?.getAnimated(), quoteRef.current?.getAnimated()]),
        ]);
        Animated.loop(facebookAnimated).start();
    }, []);

    return (
        <View style={{ height: 150, marginTop: 10, backgroundColor: gray4, paddingHorizontal: 16, paddingVertical: 18, flex: 1, borderRadius: 10 }}>
            <ShimmerPlaceholder ref={titleRef} height={20} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black }} visible={visible} />
            <ShimmerPlaceholder ref={startRef} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black, marginTop: 5 }} visible={visible} />
            <ShimmerPlaceholder ref={endRef} width={128} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black, marginTop: 5 }} visible={visible} />
            <ShimmerPlaceholder ref={progressRef} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black, marginTop: 5 }} visible={visible} />
            <ShimmerPlaceholder ref={quoteRef} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black, marginTop: 5 }} visible={visible} />
        </View>
    );
};

const Challenge = (props) => {
    const { navigation, user } = props;

    const onPressCreateNewChallenge = () => {
        navigation.navigate("CreateChallenge");
    };

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setData([]);
        fetchData();
        setRefreshing(false);
    };

    const fetchData = async () => {
        const response = await getAllChallenges(user.idUser);
        setData(response.data);
    };

    const generateQuote = (progress) => {
        if (progress === 1) {
            const indexRandom = Math.floor(Math.random() * congratulations.length);
            return congratulations[indexRandom];
        } else {
            const indexRandom = Math.floor(Math.random() * encouragement.length);
            return encouragement[indexRandom];
        }
    };

    const onChallengeItemPress = (data) => {
        navigation.navigate("UpdateChallenge", { challengeItem: data });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 10, flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TitleWithinUnderLine title={"Challenge"} />
                    <Button
                        mode="contained-tonal"
                        buttonColor={accentGreen}
                        style={{
                            alignSelf: "flex-end",
                            borderRadius: 4,
                        }}
                        onPress={() => onPressCreateNewChallenge()}
                    >
                        Create new
                    </Button>
                </View>
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    {data.length === 0 && (
                        <ScrollView>
                            <ShimmerItem />
                            <ShimmerItem />
                            <ShimmerItem />
                            <ShimmerItem />
                            <ShimmerItem />
                        </ScrollView>
                    )}
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#000"]} tintColor={"#000"} />}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity activeOpacity={0.5} onPress={() => onChallengeItemPress(item)}>
                                <LinearGradient
                                    colors={["#EAB734", "#313333"]}
                                    locations={[0, 0.4]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        marginTop: 10,
                                        backgroundColor: gray4,
                                        paddingTop: 16,
                                        paddingBottom: 16,
                                        paddingLeft: 18,
                                        paddingRight: 18,
                                        flex: 1,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: white,
                                            fontFamily: "SVN-Gotham-Bold",
                                            fontSize: 18,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text style={{ color: white }}>
                                        <Text style={{ fontFamily: "SVN-Gotham-Bold" }}>Start: </Text> {longDate(new Date(item.startDate))}
                                    </Text>
                                    <Text style={{ color: white }}>
                                        <Text style={{ fontFamily: "SVN-Gotham-Bold" }}>End:</Text> {longDate(new Date(item.endDate))}
                                    </Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Progress.Bar
                                            progress={item.completedBooksCount / item.target}
                                            color={white}
                                            width={null}
                                            style={{ width: "65%", marginTop: 10 }}
                                            height={6}
                                            borderWidth={0}
                                            unfilledColor={"#EAF4F433"}
                                        />
                                        <Text style={{ color: white, marginLeft: 10 }}>
                                            {item.completedBooksCount}/{item.target} books
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: white, fontStyle: "italic", fontFamily: "SVN-Gotham-Bold", fontSize: 10, marginTop: 10 }}>
                                            {generateQuote(item.completedBooksCount / item.target)}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Challenge);
