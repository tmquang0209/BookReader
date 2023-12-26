import { FlatList, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { connect } from "react-redux";
import styles from "../components/styles";
import { TitleWithinUnderLine } from "../components/title";
import { useState } from "react";
import { accentGreen, black, gray1, gray2, gray3, white } from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { demoDetail } from "../constants/images";
import { GridItem } from "../components/listItem";

const Library = (props) => {
    const [tabs, setTabs] = useState([
        { key: 1, active: true, icon: "bookmark", name: "Saved Books" },
        { key: 2, active: false, icon: "book-reader", name: "In Process" },
        { key: 3, active: false, icon: "check-circle", name: "Complete" },
    ]);
    const [bookList, setBookList] = useState([
        { id: 1, img: demoDetail, title: "The good guy 1", author: [{ name: "Mark mcaillister" }] },
        { id: 2, img: demoDetail, title: "The good guy 2", author: [{ name: "Mark mcaillister" }] },
        { id: 3, img: demoDetail, title: "The good guy 3", author: [{ name: "Mark mcaillister" }] },
        { id: 4, img: demoDetail, title: "The good guy 4", author: [{ name: "Mark mcaillister" }] },
        { id: 5, img: demoDetail, title: "The good guy 5", author: [{ name: "Mark mcaillister" }] },
        { id: 6, img: demoDetail, title: "The good guy 6", author: [{ name: "Mark mcaillister" }] },
        { id: 7, img: demoDetail, title: "The good guy 7", author: [{ name: "Mark mcaillister" }] },
        { id: 8, img: demoDetail, title: "The good guy 8", author: [{ name: "Mark mcaillister" }] },
    ]);

    const onTabPress = (key) => {
        const updated = tabs.map((item) => ({ ...item, active: item.key === key }));
        setTabs(updated);
    };

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
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={bookList}
                    numColumns={2}
                    scrollEnabled={true}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <GridItem image={item.img} title={item.title} authorName={item.author[0].name} />}
                />
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Library);
