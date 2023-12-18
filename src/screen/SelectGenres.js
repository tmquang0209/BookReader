import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, View, Text, ImageBackground } from "react-native";
import { connect } from "react-redux";
import styles from "../components/styles";
import { accentGreen, gray1, gray4, white } from "../constants/colors";
import { girlReadingBook } from "../constants/images";

import { Button } from "react-native-paper";
import { ActiveItem, UnActiveItem } from "../components/genresItem";
import { addFavCat, getCategory } from "../API/category";

const ListItemView = ({ dataItem, onPressItem }) =>
    dataItem.map((item) =>
        item.active ? (
            <ActiveItem key={item.idCategory} id={item.idCategory} name={item.name} onPress={onPressItem} />
        ) : (
            <UnActiveItem key={item.idCategory} id={item.idCategory} name={item.name} onPress={onPressItem} />
        )
    );

export const SelectGenres = (props) => {
    const { navigation, user } = props;
    const [data, setData] = useState([]);

    const onPressItem = (id) => {
        setData((prevData) => prevData.map((item) => (item.idCategory === id ? { ...item, active: !item.active } : item)));
    };

    const saveToDB = async (userId, favCatIds) => {
        const result = await addFavCat({ userId, favCatIds });
        console.log(result);
        return result;
    };

    const onContinuePress = async () => {
        //check num of item select
        const activeItem = data.filter((item) => item.active === true);
        const numOfActiveItem = activeItem.length;
        //if true => next to screen
        if (numOfActiveItem >= 3) {
            //save to db
            const favCatIds = data.filter((item) => item.active === true).map((item) => item.idCategory);
            const result = await saveToDB(user.idUser, favCatIds);

            //navigate to home
            if (result.success) navigation.navigate("bottomTab");
        }
        //else => notice
        else Alert.alert("Error", "Please choose at least 3 genres.");
    };

    const getCatList = async () => {
        const catList = await getCategory();
        setData(catList.result);
    };

    useEffect(() => {
        getCatList();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={girlReadingBook}
                style={{
                    flex: 1,
                }}
                resizeMode="center"
                blurRadius={15}
            >
                <View
                    style={{
                        margin: 20,
                    }}
                >
                    <Text
                        style={{
                            color: white,
                            fontSize: 25,
                            fontFamily: "SVN-Gotham-Bold",
                        }}
                    >
                        Select Genres
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: "#313333B0",

                        height: "70%",
                        borderRadius: 12,
                        paddingTop: 24,
                        paddingBottom: 24,
                        paddingLeft: 16,
                        paddingRight: 16,
                        margin: 20,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "SVN-Gotham-Book",
                            color: white,
                            opacity: 1,
                        }}
                    >
                        Select the type of book you enjoy reading.
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <ListItemView dataItem={data} onPressItem={onPressItem} />
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <Button
                            mode="contained-tonal"
                            style={{
                                marginTop: 24,
                                width: "100%",
                                backgroundColor: accentGreen,
                                borderRadius: 8,
                            }}
                            onPress={() => onContinuePress()}
                        >
                            <Text
                                style={{
                                    fontFamily: "SVN-Gotham-Bold",
                                    fontWeight: 700,
                                    color: gray4,
                                }}
                            >
                                Continue
                            </Text>
                        </Button>
                        <Text
                            style={{
                                marginTop: 12,
                                color: gray1,
                                fontFamily: "SVN-Gotham-Book",
                                fontSize: 12,
                            }}
                        >
                            Select 3 or more genres to continue
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, {})(SelectGenres);
