import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, Image, TouchableOpacity, Animated } from "react-native";

import styles from "../common/styles";
import { NextIcon } from "../../constants/images";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { black } from "../../constants/colors";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ItemView = ({ item }) => {
    const navigation = useNavigation();

    const onItemPress = (bookId) => {
        navigation.navigate("BookDetail", { bookData: item });
    };

    return (
        <TouchableOpacity style={{ marginRight: 10, maxWidth: 130 }} activeOpacity={0.5} onPress={() => onItemPress(item.id)}>
            <Image
                style={styles.imageItemHome}
                source={{
                    uri: item?.formats.image,
                }}
            />
            <View>
                <Text style={styles.itemBookName} ellipsizeMode="tail" numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.itemBookAuthor}>{item.authors[0]?.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

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
        <View style={{ marginRight: 10, maxWidth: 130 }}>
            <ShimmerPlaceholder ref={thumbnailRef} height={184} width={128} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black }} visible={visible} />

            <ShimmerPlaceholder ref={titleRef} width={128} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black, marginTop: 5 }} visible={visible} />

            <ShimmerPlaceholder ref={authorRef} width={128} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: black, marginTop: 5 }} visible={visible} />
        </View>
    );
};

const ListItem = ({ list }) => {
    if (list.length === 0)
        return (
            <View style={{ flexDirection: "row" }}>
                {/* create 10 item */}
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
        );
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={list}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ItemView item={item} />}
            ListFooterComponent={<View style={{ height: 200 }} />}
        />
    );
};

export const ForYou = ({ list }) => {
    const navigation = useNavigation();
    const reducedList = list.length !== 0 ? list.filter((item, index) => index <= 10) : [];
    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.headerItem}>For you</Text>
                <>
                    <TouchableOpacity onPress={() => navigation.navigate("BookList", { bookList: list })} style={styles.showAllContainer}>
                        <Text style={styles.showAllText}>Show all</Text>
                        <NextIcon />
                    </TouchableOpacity>
                </>
            </View>
            <View style={styles.itemBox}>
                <View>
                    <ListItem list={reducedList} />
                </View>
            </View>
        </>
    );
};

export const Trending = ({ list }) => {
    const navigation = useNavigation();
    const reducedList = list ? list.filter((item, index) => index <= 10) : [];
    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.headerItem}>Trending</Text>
                <>
                    <TouchableOpacity onPress={() => navigation.navigate("BookList", { bookList: list })} style={styles.showAllContainer}>
                        <Text style={styles.showAllText}>Show all</Text>
                        <NextIcon />
                    </TouchableOpacity>
                </>
            </View>
            <View style={styles.itemBox}>
                <View>
                    <ListItem list={reducedList} />
                </View>
            </View>
        </>
    );
};
