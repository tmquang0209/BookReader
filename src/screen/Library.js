import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Text, TouchableOpacity, RefreshControl, Animated } from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { getBookListByStatus } from "../API/library";

import styles from "../components/common/styles";
import { TitleWithinUnderLine } from "../components/header";
import { accentGreen, black, gray3, white } from "../constants/colors";
import { GridItem } from "../components/item/itemView";
import { completed, inProcess, savedBook } from "../constants/text";
import { LinearGradient } from "react-native-svg";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import EmptyData from "../components/empty";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerItem = () => {
    const thumbnailRef = React.useRef();
    const titleRef = React.useRef();
    const authorRef = React.useRef();
    const visible = false;

    useEffect(() => {
        const facebookAnimated = Animated.stagger(400, [Animated.parallel([thumbnailRef.current?.getAnimated(), titleRef.current?.getAnimated(), authorRef.current?.getAnimated()])]);
        Animated.loop(facebookAnimated).start();
    }, []);

    return (
        <View style={{ width: "50%", padding: 10 }}>
            <ShimmerPlaceholder ref={thumbnailRef} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black, height: 250, width: "100%" }} visible={visible} />

            <ShimmerPlaceholder ref={titleRef} width={128} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black, marginTop: 5 }} visible={visible} />

            <ShimmerPlaceholder ref={authorRef} width={128} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black, marginTop: 5 }} visible={visible} />
        </View>
    );
};

const Library = (props) => {
    const { user } = props;

    const [tabs, setTabs] = useState([
        { key: 1, active: true, icon: "bookmark", name: "Saved Books", status: savedBook },
        { key: 2, active: false, icon: "book-reader", name: "In Process", status: inProcess },
        { key: 3, active: false, icon: "check-circle", name: "Complete", status: completed },
    ]);
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setBookList([]);
        tabs.map((item) => {
            if (item.active) fetchBookList(item.status);
        });
        setRefreshing(false);
    };

    const onTabPress = (key) => {
        const updated = tabs.map((item) => ({ ...item, active: item.key === key }));
        setTabs(updated);
    };

    //fetch saved book
    const fetchBookList = async (status) => {
        setLoading(true);
        setBookList([]);
        const response = await getBookListByStatus(user.idUser, status);
        setBookList(response?.result || []);
        setLoading(false);
    };

    useEffect(() => {
        tabs.map((item) => {
            if (item.active) fetchBookList(item.status);
        });
    }, [tabs]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 10 }}>
                <TitleWithinUnderLine title={"My Library"} />

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={tabs}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => {
                        return (
                            <Animatable.View animation={"bounce"} duration={1000} delay={item.key * 200}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={{
                                        padding: 10,
                                        borderRadius: 90,
                                        borderWidth: 1,
                                        borderColor: gray3,
                                        marginTop: 20,
                                        marginRight: 10,
                                        backgroundColor: item.active ? accentGreen : null,
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    onPress={() => onTabPress(item.key)}
                                >
                                    <FontAwesome5 name={item.icon} size={24} color={item.active ? black : white} />
                                    <Text style={{ marginLeft: 5, color: item.active ? black : white }}>{item.name}</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        );
                    }}
                />
            </View>
            <View
                style={{
                    margin: 10,
                    flex: 1,
                }}
            >
                {bookList.length === 0 && loading ? (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}
                    >
                        <ShimmerItem />
                        <ShimmerItem />
                        <ShimmerItem />
                        <ShimmerItem />
                        <ShimmerItem />
                        <ShimmerItem />
                        <ShimmerItem />
                        <ShimmerItem />
                        <ShimmerItem />
                        <ShimmerItem />
                    </View>
                ) : null}
                {bookList && (
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refresing} onRefresh={onRefresh} colors={["#000"]} tintColor={"#000"} />}
                        extraData={bookList}
                        showsVerticalScrollIndicator={false}
                        data={bookList}
                        numColumns={2}
                        scrollEnabled={true}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <GridItem bookData={item} />}
                        ListEmptyComponent={!bookList.length && !loading && <EmptyData header="No books found!" message="" />}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Library);
