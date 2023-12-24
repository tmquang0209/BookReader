import { useEffect, useState } from "react";
import { Keyboard, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import styles from "../components/styles";
import { accentGreen, gray2, gray4, white } from "../constants/colors";
import { TextInput } from "react-native-paper";
import { getCatList } from "../store/actions/categoryAction";
import { search } from "../API/book";
import { useNavigation } from "@react-navigation/native";

const Search = (props) => {
    const { categories, getCatList } = props;

    const navigation = useNavigation();

    const [keyword, setKeyword] = useState("");

    const onSearchSubmit = async () => {
        //call to api function
        const response = await search(keyword);
        navigation.navigate("BookList", { bookList: response });
    };

    useEffect(() => {
        const getList = async () => {
            await getCatList();
        };
        getList();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={[styles.container, { padding: 10 }]}>
                <View style={{ alignSelf: "flex-start" }}>
                    <Text style={{ fontSize: 24, fontFamily: "SVN-Gotham-Bold", color: white }}>Explore</Text>
                    <View style={{ borderWidth: 1, borderColor: accentGreen }}></View>
                </View>
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
                        theme={{ colors: { primary: "green", underlineColor: "transparent" } }}
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
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    categories: state.category.categories,
});

export default connect(mapStateToProps, { getCatList })(Search);
