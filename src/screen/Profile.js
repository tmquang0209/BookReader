import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import styles from "../components/styles";

const Profile = (props) => {
    return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile);
