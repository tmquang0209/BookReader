import { Text, View } from "react-native";
import styles from "../common/styles";

export const Greeting = () => {
    const date = new Date();
    const hour = date.getHours();
    let greeting = "";
    if (hour >= 0 && hour < 12) {
        greeting = "Good morning";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon";
    } else if (hour >= 18 && hour < 22) {
        greeting = "Good evening";
    } else {
        greeting = "Good night";
    }

    return <Text style={styles.textNormal}>{greeting},</Text>;
};

export const GreetingWithFullName = ({ fullName }) => {
    return (
        <View style={styles.flexView1}>
            <Greeting /><Text style={styles.fullNameText}>{fullName}</Text>
        </View>
    );
};
