import { SafeAreaView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "../components/styles";

const Search = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Explore</Text>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Search);
