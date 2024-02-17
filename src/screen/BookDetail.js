import React, { useEffect, useState } from "react";
import { Image, ImageBackground, ScrollView, View, Text, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";

import styles from "../components/common/styles";
import { white } from "../constants/colors";
import { BackButton } from "../components/header";
import { CategoryTypeItem } from "../components/item/categoryType";
import { Button } from "../components/button";
import { connect } from "react-redux";
import { getBookStatus, updateStatusBook } from "../API/book";
import { savedBook } from "../constants/text";

const CategoryList = ({ subjects }) => (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        {subjects.map((item, index) => (
            <CategoryTypeItem title={item} key={index} onPress={() => console.log(123)} />
        ))}
    </View>
);

const AuthorDetail = ({ author }) => {
    const nameDigit = author.name ? author.name[0] : "A";

    return (
        <View style={styles.authorContainer}>
            <Avatar.Text label={nameDigit} />
            <View
                style={{
                    flex: 1,
                    marginLeft: 10,
                }}
            >
                <Text style={styles.authorName}>{author.name}</Text>
                <Text style={styles.authorDateText}>
                    {author.birth_year}-{author.death_year}
                </Text>
                <Text style={styles.authorDescriptionText}>...</Text>
            </View>
        </View>
    );
};

const BookDetail = ({ user, route, navigation }) => {
    const { bookData } = route.params;
    const [bookmark, setBookmark] = useState(false);

    const saveBook = async () => {
        console.log("save book");
        setBookmark((prev) => !prev);
        const response = await updateStatusBook(user.idUser, bookData.id, savedBook);
        console.log(response);
    };

    const checkBookMark = async () => {
        const response = await getBookStatus(user.idUser, bookData.id);
        if (response.success) setBookmark(response.result !== null);
    };

    useEffect(() => {
        checkBookMark();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fixedButton}>
                <BackButton styleText={{ color: white }} />
            </View>
            <ScrollView style={{ marginBottom: 10 }}>
                <ImageBackground source={{ uri: bookData?.formats?.image }} resizeMode="cover" blurRadius={2} style={[styles.backgroundImage, { position: "relative" }]}>
                    <LinearGradient colors={["#18191900", "#18191999", "#181919"]}>
                        <Image
                            style={{
                                height: 220,
                                width: 150,
                                alignSelf: "center",
                            }}
                            source={{ uri: bookData?.formats?.image }}
                        />
                    </LinearGradient>
                </ImageBackground>
                <View style={{ margin: 10 }}>
                    <View>
                        <View>
                            <Text style={[styles.bookTitle, { width: Dimensions.get("screen").width - 30 }]}>{bookData?.title}</Text>
                            <FontAwesome name={bookmark ? "bookmark" : "bookmark-o"} size={24} color={white} style={{ position: "absolute", right: 0 }} onPress={saveBook} />
                        </View>
                        <Text style={[styles.authorName]}>{bookData?.authors[0]?.name}</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBox}>
                                <Feather name="clock" size={24} color={white} />
                                <Text style={{ color: white, marginLeft: 10 }}>10 h</Text>
                            </View>
                            <View style={[styles.infoBox, { borderRightWidth: 0 }]}>
                                <Feather name="download" size={24} color={white} />
                                <Text style={{ color: white, marginLeft: 10 }}>{bookData?.download_count || 0} times</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ gap: 16 }}>
                        <Text style={styles.aboutTitle}>About this book</Text>
                        <Text style={styles.aboutText}>Updating...</Text>
                        <CategoryList subjects={bookData?.subjects} />
                    </View>
                    <AuthorDetail author={bookData?.authors[0]} />
                </View>
            </ScrollView>
            <View
                style={{
                    alignItems: "center",
                }}
            >
                <Button children={"Reading now"} style={{ width: "90%" }} onPress={() => navigation.navigate("Reading", { bookId: bookData.id, file: bookData.formats.epub })} />
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(BookDetail);
