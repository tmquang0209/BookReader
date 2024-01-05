import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Platform, Text, TouchableOpacity } from "react-native";
import { black, white } from "../../constants/colors";

const DatePickerAndroid = ({ date, mode, onChange, minimumDate, maximumDate }) => {
    return (
        <View>
            <DateTimePicker minimumDate={minimumDate} maximumDate={maximumDate} value={date} mode={mode} onChange={onChange} />
        </View>
    );
};

const DatePickerIOS = ({ date, mode, onChange, onClose, minimumDate, maximumDate }) => {
    return (
        <View
            style={{
                position: "absolute",
                backgroundColor: white,
                width: "100%",
                zIndex: 1,
                bottom: 0,
                height: "35%",
            }}
        >
            <TouchableOpacity style={{ alignItems: "flex-end", marginRight: 10, marginTop: 10 }} onPress={onClose}>
                <Text style={{ color: black, fontSize: 20 }}>Close</Text>
            </TouchableOpacity>
            <DateTimePicker minimumDate={minimumDate} maximumDate={maximumDate} value={date} mode={mode} onChange={onChange} display="spinner" timeZoneName={"Asia/Ho_Chi_minh"} />
        </View>
    );
};

const DatePicker = ({ value, mode, onChange, onShow, minimumDate, maximumDate }) => {
    const [date, setDate] = useState(value || new Date(1970, 1, 1));

    const defaultMinDate = minimumDate ? minimumDate : new Date(1900, 1, 1);
    1;
    const defaultMaxDate = maximumDate ? maximumDate : new Date();

    return Platform.OS === "ios" ? (
        <DatePickerIOS date={date} mode={mode} onChange={onChange} onClose={onShow} minimumDate={defaultMinDate} maximumDate={defaultMaxDate} />
    ) : (
        <DatePickerAndroid date={date} mode={mode} onChange={onChange} minimumDate={defaultMinDate} maximumDate={defaultMaxDate} />
    );
};

export default DatePicker;
