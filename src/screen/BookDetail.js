import React from "react";
import { Image, ImageBackground, ScrollView, View, Text, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import styles from "../components/styles";
import { accentGreen, black, white } from "../constants/colors";
import { BackButton } from "../components/header";
import { CategoryTypeItem } from "../components/categoryType";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/button";

const CategoryList = ({ subjects }) => (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        {subjects.map((item, index) => (
            <CategoryTypeItem title={item} key={index} />
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

const BookDetail = (props) => {
    const { bookData } = props.route.params;
    const navigation = useNavigation();

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
                            <FontAwesome name="bookmark-o" size={24} color={white} style={{ position: "absolute", right: 0 }} />
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

export default BookDetail;
