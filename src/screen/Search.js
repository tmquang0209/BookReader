import { useState } from "react";
import { Keyboard, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import styles from "../components/common/styles";
import { gray4, white } from "../constants/colors";

import { search } from "../API/book";
import { useNavigation } from "@react-navigation/native";
import { TitleWithinUnderLine } from "../components/header";
import { KeywordInput } from "../components/textInput";

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
                        <KeywordInput keyword={keyword} setKeyword={setKeyword} onSearchSubmit={onSearchSubmit} />
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
