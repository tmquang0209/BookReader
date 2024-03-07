import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "../components/common/styles";
import { Keyboard, SafeAreaView, Text, View, TouchableWithoutFeedback, Pressable, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

import { updateChallengeDetails, deleteChallenge } from "../API/challenges";

import { Title, BackButton } from "../components/header";
import { accentGreen, bgMain, black, gray3, gray5, white } from "../constants/colors";
import { DatePicker, longDate } from "../components/date";

const validationSchema = yup.object().shape({
    name: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    target: yup.number().required("Target is required"),
});

const updateChallenge = ({ navigation, user, route }) => {
    const { challengeItem } = route.params;

    const [challenge, setChallenge] = useState({ ...challengeItem, startDate: new Date(challengeItem.startDate), endDate: new Date(challengeItem.endDate) });
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState(null);
    const [disable, setDisable] = useState(false);
    const [deleteProgress, setDeleteProgress] = useState(false);

    const onShow = (type) => {
        setDateType(type);
        setShow((prev) => !prev);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        console.log(currentDate);
        Platform.OS === "android" && setShow(false);
        if (dateType === "start" && currentDate > challenge.endDate) {
            Alert.alert("Error", "Start date must be before end date");
            return;
        }
        dateType === "start" ? setChallenge({ ...challenge, startDate: currentDate }) : setChallenge({ ...challenge, endDate: currentDate });
    };

    const handleDelete = async () => {
        //delete challenge
        console.log("delete challenge");
        setDeleteProgress(true);
        const response = await deleteChallenge(user.idUser, challenge.idChallenge);
        console.log(response);
        if (response.success) {
            Alert.alert("Success", "Delete challenge successfully");
            navigation.goBack();
        } else {
            Alert.alert("Error", response.error || response.message);
        }
        setDeleteProgress(false);
    };

    const onDelete = () => {
        //delete challenge
        //display message to confirm
        Alert.alert("Delete Challenge", "Are you sure you want to delete this challenge?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: () => handleDelete() },
        ]);
    };

    const onUpdateChallenge = async (values) => {
        //update challenge
        setDisable(true);
        const response = await updateChallengeDetails(user.idUser, { ...values, idChallenge: challengeItem.idChallenge, startDate: challenge.startDate, endDate: challenge.endDate });
        console.log(response, { ...values, idChallenge: challengeItem.idChallenge, startDate: challenge.startDate, endDate: challenge.endDate });
        if (response.success) {
            Alert.alert("Success", "Update challenge successfully");
            navigation.goBack();
        } else {
            Alert.alert("Error", response.error);
        }
        setDisable(false);
    };

    useEffect(() => {
        setChallenge({ ...challengeItem, startDate: new Date(challengeItem.startDate), endDate: new Date(challengeItem.endDate) });
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <Formik
                initialValues={{ name: challenge.name, description: challenge.description, target: challenge.target }}
                validationSchema={validationSchema}
                onSubmit={(values) => onUpdateChallenge(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <SafeAreaView style={styles.container}>
                        <View
                            style={{
                                flexDirection: "column",
                                height: 50,
                                alignItems: "flex-start",
                            }}
                        >
                            <BackButton name={"Challenge"} />
                        </View>

                        <View style={{ margin: 10 }}>
                            <Title name={"Edit goal for a challenge"} size={20} color={accentGreen} />
                            <View style={{ marginTop: 16, marginBottom: 16, gap: 10 }}>
                                <TextInput
                                    placeholder="Title"
                                    style={{ backgroundColor: gray5 }}
                                    placeholderTextColor={gray3}
                                    value={values.name}
                                    textColor={white}
                                    onChangeText={handleChange("name")}
                                    onBlur={handleBlur("name")}
                                />
                                {errors.name && touched.name && <Text style={{ fontSize: 10, color: "red" }}>{errors.name}</Text>}

                                <TextInput
                                    placeholder="Description"
                                    style={{ backgroundColor: gray5 }}
                                    placeholderTextColor={gray3}
                                    value={values.description}
                                    textColor={white}
                                    onChangeText={handleChange("description")}
                                    onBlur={handleBlur("description")}
                                />
                                {errors.description && touched.description && <Text style={{ fontSize: 10, color: "red" }}>{errors.description}</Text>}

                                <Pressable onPress={() => onShow("start")} style={{ backgroundColor: gray5, marginTop: 5, width: "100%" }} textColor={white}>
                                    <Text style={{ color: white, padding: 15, fontSize: 15 }}>{longDate(challenge.startDate)}</Text>
                                </Pressable>

                                <Pressable onPress={() => onShow("end")} style={{ backgroundColor: gray5, marginTop: 5, width: "100%" }} textColor={white}>
                                    <Text style={{ color: white, padding: 15, fontSize: 15 }}>{longDate(challenge.endDate)}</Text>
                                </Pressable>

                                <TextInput
                                    placeholder="Target"
                                    style={{ backgroundColor: gray5 }}
                                    keyboardType="number-pad"
                                    placeholderTextColor={gray3}
                                    value={values.target?.toString()}
                                    right={<TextInput.Affix text="books" textStyle={{ color: white }} />}
                                    textColor={white}
                                    onChangeText={handleChange("target")}
                                    onBlur={handleBlur("target")}
                                />
                                {errors.target && touched.target && <Text style={{ fontSize: 10, color: "red" }}>{errors.target}</Text>}
                            </View>
                        </View>

                        <View style={{ flex: 1, justifyContent: "flex-end", gap: 10, margin: 10 }}>
                            <Button
                                mode="contained-tonal"
                                buttonColor={white}
                                textColor="red"
                                style={{
                                    borderRadius: 4,
                                }}
                                labelStyle={{
                                    fontFamily: "SVN-Gotham-Bold",
                                    fontSize: 14,
                                    color: "red",
                                }}
                                onPress={() => onDelete()}
                                loading={deleteProgress}
                                disabled={deleteProgress}
                            >
                                Delete
                            </Button>

                            <Button
                                mode="contained-tonal"
                                buttonColor={accentGreen}
                                textColor={black}
                                style={{
                                    borderRadius: 4,
                                }}
                                loading={disable}
                                // disabled={disable}
                                labelStyle={{
                                    fontFamily: "SVN-Gotham-Bold",
                                    fontSize: 14,
                                    color: bgMain,
                                }}
                                onPress={handleSubmit}
                            >
                                Update Challenge
                            </Button>
                        </View>

                        {show && (
                            <DatePicker
                                mode={"date"}
                                value={dateType === "start" ? challenge.startDate : challenge.endDate}
                                onChange={onChange}
                                onShow={onShow}
                                minimumDate={dateType === "end" ? challenge.startDate : new Date()}
                                maximumDate={new Date(2040, 1, 1)}
                            />
                        )}
                    </SafeAreaView>
                )}
            </Formik>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(updateChallenge);
