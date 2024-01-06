import React from "react";
import { Keyboard, Pressable, SafeAreaView, Text, Touchable, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import { Button, TextInput } from "react-native-paper";

import styles from "../components/common/styles";
import { BackButton, Title } from "../components/header";
import { accentGreen, bgMain, gray3, gray5, white } from "../constants/colors";
import { DatePicker, longDate } from "../components/date";

const CreateChallenge = () => {
    const [challenge, setChallenge] = React.useState({ start: new Date(), end: new Date() });
    const [show, setShow] = React.useState(false);
    const [dateType, setDateType] = React.useState(null);

    const onShow = (type) => {
        setDateType(type);
        setShow((prev) => !prev);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        Platform.OS === "android" && setShow(false);
        dateType === "start" ? setChallenge({ ...challenge, start: currentDate }) : setChallenge({ ...challenge, end: currentDate });
    };

    const onFieldChange = (field, text) => {
        setChallenge((prevChallenge) => ({ ...prevChallenge, [field]: text }));
    };

    const onCreateChallenge = () => {
        //update challenge
        console.log("create challenge");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={{ height: 50, flexDirection: "column", alignItems: "flex-start" }}>
                    <BackButton name={"Challenge"} />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <Title name={"Add goal for a challenge"} color={accentGreen} size={20} />
                    <View style={{ marginTop: 16, marginBottom: 16, gap: 10 }}>
                        <TextInput
                            placeholder="Title"
                            style={{ backgroundColor: gray5 }}
                            placeholderTextColor={gray3}
                            value={challenge.title}
                            textColor={white}
                            onChangeText={(text) => onFieldChange("title", text)}
                        />

                        <TextInput
                            placeholder="Description"
                            style={{ backgroundColor: gray5 }}
                            placeholderTextColor={gray3}
                            value={challenge?.description}
                            textColor={white}
                            onChangeText={(text) => onFieldChange("description", text)}
                        />

                        <Pressable onPress={() => onShow("start")} style={{ backgroundColor: gray5, marginTop: 5, width: "100%" }} textColor={white}>
                            <Text style={{ color: white, padding: 15, fontSize: 15 }}>{longDate(challenge.start)}</Text>
                        </Pressable>

                        <Pressable onPress={() => onShow("end")} style={{ backgroundColor: gray5, marginTop: 5, width: "100%" }} textColor={white}>
                            <Text style={{ color: white, padding: 15, fontSize: 15 }}>{longDate(challenge.end)}</Text>
                        </Pressable>

                        <TextInput
                            placeholder="Target"
                            style={{ backgroundColor: gray5 }}
                            keyboardType="number-pad"
                            placeholderTextColor={gray3}
                            value={challenge.target?.toString()}
                            right={<TextInput.Affix text="books" textStyle={{ color: white }} />}
                            textColor={white}
                            onChangeText={(text) => onFieldChange("target", text)}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "flex-end", gap: 10, margin: 10 }}>
                        <Button
                            mode="contained-tonal"
                            style={{ backgroundColor: accentGreen, padding: 5, borderRadius: 4 }}
                            onPress={() => onCreateChallenge()}
                            labelStyle={{ color: bgMain, fontFamily: "SVN-Gotham-Bold" }}
                        >
                            Create a new Challenge
                        </Button>
                    </View>
                </View>
                {show && (
                    <DatePicker
                        testID="dateTimePicker"
                        value={dateType === "start" ? challenge.start : challenge.end}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        maximumDate={new Date(2040, 1, 1)}
                        minimumDate={dateType === "end" ? challenge.start : null}
                    />
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(CreateChallenge);
