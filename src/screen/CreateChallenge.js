import React, { useState } from "react";
import { Alert, Keyboard, Pressable, SafeAreaView, Text, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

import styles from "../components/common/styles";
import { BackButton, Title } from "../components/header";
import { accentGreen, bgMain, gray3, gray5, white } from "../constants/colors";
import { DatePicker, longDate } from "../components/date";
import { createChallenge } from "../API/challenges";

const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    target: yup.number().required("Target is required"),
});

const CreateChallenge = (props) => {
    const { navigation, user } = props;

    const [challenge, setChallenge] = useState({ startDate: new Date(), endDate: new Date() });
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState(null);
    const [loading, setLoading] = useState(false);

    const onShow = (type) => {
        setDateType(type);
        setShow((prev) => !prev);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        Platform.OS === "android" && setShow(false);
        if (dateType === "start" && currentDate > challenge.endDate) {
            Alert.alert("Error", "Start date must be before end date");
            return;
        }
        dateType === "start" ? setChallenge({ ...challenge, startDate: currentDate }) : setChallenge({ ...challenge, endDate: currentDate });
    };

    const onCreateChallenge = async (values) => {
        //update challenge
        setLoading(true);
        const response = await createChallenge(user.idUser, { ...values, startDate: challenge.startDate, endDate: challenge.endDate });
        if (response.success) {
            Alert.alert("Success", "Create challenge successfully");
            navigation.goBack();
        } else {
            Alert.alert("Error", response.error);
        }
        setLoading(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={{ height: 50, flexDirection: "column", alignItems: "flex-start" }}>
                    <BackButton name={"Challenge"} />
                </View>
                <Formik
                    initialValues={{ name: "", description: "", target: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onCreateChallenge(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex: 1, margin: 10 }}>
                            <Title name={"Add goal for a challenge"} color={accentGreen} size={20} />
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

                                <TextInput
                                    placeholder="Description"
                                    style={{ backgroundColor: gray5 }}
                                    placeholderTextColor={gray3}
                                    value={values?.description}
                                    textColor={white}
                                    onChangeText={handleChange("description")}
                                    onBlur={handleBlur("description")}
                                />

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
                            </View>
                            <View style={{ flex: 1, justifyContent: "flex-end", gap: 10, margin: 10 }}>
                                <Button
                                    mode="contained-tonal"
                                    style={{ backgroundColor: accentGreen, padding: 5, borderRadius: 4 }}
                                    onPress={handleSubmit}
                                    labelStyle={{ color: bgMain, fontFamily: "SVN-Gotham-Bold" }}
                                    loading={loading}
                                    disabled={loading}
                                >
                                    Create a new Challenge
                                </Button>
                            </View>
                        </View>
                    )}
                </Formik>
                {show && (
                    <DatePicker
                        testID="dateTimePicker"
                        value={dateType === "start" ? challenge.startDate : challenge.endDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        maximumDate={new Date(2040, 1, 1)}
                        minimumDate={dateType === "end" ? challenge.startDate : null}
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
