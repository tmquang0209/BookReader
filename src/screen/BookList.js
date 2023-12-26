import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "../components/styles";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { gray2, gray4, white, accentGreen } from "../constants/colors";
import { CategoryTypeItem } from "../components/categoryType";
import { search } from "../API/book";
import { ListItem } from "../components/listItem";

const BookList = (props) => {
    const { categories } = props;
    const { bookList, topicId } = props.route.params;

    const navigation = useNavigation();

    const [catList, setCatList] = useState(categories);
    const [bookListItem, setBookListItem] = useState(bookList);
    const [keyword, setKeyword] = useState("");
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
                <ScrollView horizontal>
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
            <FlatList data={bookListItem} key={(item) => item.id} renderItem={({ item }) => <ListItem item={item} />} />
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    categories: state.category.categories,
});

export default connect(mapStateToProps, {})(BookList);
