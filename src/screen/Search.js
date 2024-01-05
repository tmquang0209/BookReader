import { useEffect, useState } from "react";
import { Keyboard, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import styles from "../components/common/styles";
import { accentGreen, gray2, gray4, white } from "../constants/colors";
import { TextInput } from "react-native-paper";

import { search } from "../API/book";
import { useNavigation } from "@react-navigation/native";
import { TitleWithinUnderLine } from "../components/header";

const Search = (props) => {
    const { categories, getCatList } = props;

    const navigation = useNavigation();

    const [keyword, setKeyword] = useState("");

    const onSearchSubmit = async () => {
        //call to api function
        const response = await search(keyword);
        navigation.navigate("BookList", { bookList: response });
    };
    //print hello world
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={{ margin: 10 }}>
                    <TitleWithinUnderLine title={"Explore"} />
                    <View
                        style={{
                            marginTop: 16,
                        }}
                    >
                        <TextInput
                            left={<TextInput.Icon icon={"magnify"} color={gray2} />}
                            placeholder="Title, author or keyword"
                            style={{
                                backgroundColor: gray4,
                                borderRadius: 8,
                            }}
                            textColor={white}
                            activeUnderlineColor={accentGreen}
                            placeholderTextColor={gray2}
                            onSubmitEditing={() => onSearchSubmit()}
                            value={keyword}
                            onChangeText={(text) => setKeyword(text)}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 30,
                        }}
                    >
                        <Text
                            style={{
                                color: white,
                                fontSize: 20,
                                fontFamily: "SVN-Gotham-Bold",
                            }}
                        >
                            Topics
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {categories &&
                                categories.map((item) => (
                                    <TouchableOpacity
                                        key={item.idCategory}
                                        style={{
                                            backgroundColor: gray4,
                                            margin: 5,
                                            alignSelf: "flex-start",
                                            borderRadius: 8,
                                        }}
                                        activeOpacity={0.5}
                                        onPress={() => navigation.navigate("BookList", { topicId: item.idCategory })}
                                    >
                                        <Text
                                            style={{
                                                padding: 10,
                                                color: white,
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    categories: state.category.categories,
});

export default connect(mapStateToProps, {})(Search);

function KeywordInput({ gray2, white, accentGreen, onSearchSubmit, keyword, text, setKeyword }) {
    return (
        <TextInput
            left={<TextInput.Icon icon={"magnify"} color={gray2} />}
            placeholder="Title, author or keyword"
            style={{
                backgroundColor: gray4,
                borderRadius: 8,
            }}
            textColor={white}
            activeUnderlineColor={accentGreen}
            placeholderTextColor={gray2}
            onSubmitEditing={() => onSearchSubmit()}
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
        />
    );
}
