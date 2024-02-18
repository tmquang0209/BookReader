import { Image, Text, View } from "react-native";
import { cartoonLearningEnglish } from "../../constants/images";
import { white } from "../../constants/colors";

const EmptyData = (props) => {
    const { header, message } = props;

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image
                style={{
                    width: 250,
                    height: 250,
                }}
                source={cartoonLearningEnglish}
            />
            <Text
                style={{
                    color: white,
                    fontFamily: "SVN-Gotham-Bold",
                    fontSize: 20,
                }}
            >
                {header}
            </Text>
            <Text
                style={{
                    color: white,
                    fontFamily: "SVN-Gotham-Thin",
                    fontSize: 16,
                    textAlign: "center",
                    margin: 20,
                }}
            >
                {message}
            </Text>
        </View>
    );
};

export default EmptyData;
