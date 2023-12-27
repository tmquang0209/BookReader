import { FlatList, SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../components/styles";
import { TitleWithinUnderLine } from "../components/title";
import { useEffect, useState } from "react";
import { accentGreen, black, gray3, white } from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { GridItem } from "../components/listItem";
import { getBookListByStatus, getSavedBook } from "../API/library";
import { completed, inProcess, savedBook } from "../constants/text";

const Library = (props) => {
    const { user } = props;

    const [tabs, setTabs] = useState([
        { key: 1, active: true, icon: "bookmark", name: "Saved Books", status: savedBook },
        { key: 2, active: false, icon: "book-reader", name: "In Process", status: inProcess },
        { key: 3, active: false, icon: "check-circle", name: "Complete", status: completed },
    ]);
    const [bookList, setBookList] = useState([]);

    const onTabPress = (key) => {
        const updated = tabs.map((item) => ({ ...item, active: item.key === key }));
        setTabs(updated);
    };

    //fetch saved book
    const fetchBookList = async (status) => {
        setBookList([]);
        const response = await getBookListByStatus(user.idUser, status);
        setBookList(response?.result || []);
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
                {bookList && (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={bookList}
                        numColumns={2}
                        scrollEnabled={true}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <GridItem bookData={item} />}
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
