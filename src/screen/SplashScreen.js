import { Image, View } from "react-native";
import styles from "../components/common/styles";
import { logoText } from "../constants/images";
import { ActivityIndicator } from "react-native-paper";

const SplashModal = () => {
    return (
        <View
            style={[
                styles.container,
                {
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20,
                },
            ]}
        >
            <Image
                source={logoText}
                style={{
                    width: 330,
                    height: 100,
                    borderRadius: 90,
                    marginTop: 200,
                }}
            />
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
};

export default SplashModal;
