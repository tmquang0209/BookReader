import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, ScrollView, Animated } from "react-native";
import { connect } from "react-redux";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import { search } from "../API/book";

import styles from "../components/common/styles";
import { useNavigation } from "@react-navigation/native";
import { gray2, gray4, white, accentGreen } from "../constants/colors";
import { CategoryTypeItem } from "../components/item/categoryType";
import { ListItem } from "../components/item/itemView";
import EmptyData from "../components/empty";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

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
        <View style={{ margin: 10, flexDirection: "row", gap: 10 }}>
            <ShimmerPlaceHolder ref={thumbnailRef} height={184} width={128} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: gray4 }} visible={visible} />
            <View>
                <ShimmerPlaceHolder ref={titleRef} width={128} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: gray4, marginTop: 5 }} visible={visible} />
                <ShimmerPlaceHolder ref={authorRef} width={128} shimmerColors={["#333", "#222", "#111"]} style={{ backgroundColor: gray4, marginTop: 5 }} visible={visible} />
            </View>
        </View>
    );
};

const BookList = (props) => {
    const { categories } = props;
    const { bookList, topicId } = props.route.params;

    const navigation = useNavigation();

    const [catList, setCatList] = useState(categories);
    const [bookListItem, setBookListItem] = useState(bookList);
    const [keyword, setKeyword] = useState(props.route.params.keyword || "");
    const [loading, setLoading] = useState(false);

    const onCategoryPress = (catId) => {
        const updatedCatList = catList.map((item) => ({
            ...item,
            active: item.idCategory === catId,
        }));
        setCatList(updatedCatList);

        const topic = updatedCatList.filter((item) => item.idCategory === catId)[0].name;
        onSubmitSearch(topic);
    };

    const onSubmitSearch = async (topic = "") => {
        try {
            setLoading(true);

            const catActive = catList.find((item) => item.active === true);
            const getTopic = catActive ? catActive.name : "all";

            setBookListItem(null);
            const response = await search(keyword, topic || getTopic);
            setBookListItem(response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (topicId) {
            onCategoryPress(topicId);
        }
        if (keyword) {
            onSubmitSearch();
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator animating={loading} size={"small"} color={accentGreen} style={{ position: "absolute", right: 15, top: 25, zIndex: 1 }} />
            <View
                style={{
                    margin: 10,
                }}
            >
                <TextInput
                    placeholder="Search"
                    value={keyword}
                    left={<TextInput.Icon icon={"chevron-left"} color={gray2} onPress={() => navigation.goBack()} />}
                    style={{
                        backgroundColor: gray4,
                        borderRadius: 8,
                    }}
                    textColor={white}
                    activeUnderlineColor={accentGreen}
                    placeholderTextColor={gray2}
                    onChangeText={(text) => setKeyword(text)}
                    onSubmitEditing={() => onSubmitSearch()}
                />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {catList.map((item, index) => (
                        <CategoryTypeItem
                            title={item.name}
                            key={item.idCategory}
                            active={item.active}
                            onPress={() => onCategoryPress(item.idCategory)}
                            style={{
                                margin: 0,
                                marginRight: 5,
                                marginTop: 20,
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
            {!bookListItem && (
                <ScrollView>
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
                    <ShimmerItem />
                </ScrollView>
            )}
            <FlatList
                data={bookListItem}
                key={(item) => item.id}
                renderItem={({ item }) => <ListItem item={item} />}
                ListEmptyComponent={bookListItem && !loading && <EmptyData header="No books found!" message="Please search using other keywords." />}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    categories: state.category.categories,
});

export default connect(mapStateToProps, {})(BookList);
