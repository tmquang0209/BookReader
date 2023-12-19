import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import Home from "../screen/Home";
import Search from "../screen/Search";
import Library from "../screen/Library";
import Challenge from "../screen/Challenge";
import Profile from "../screen/Profile";

import { ChallengeIcon, HomeIcon, LibraryIcon, SearchIcon } from "../constants/images";
import { accentGreen, gray1 } from "../constants/colors";

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            barStyle={{
                backgroundColor: "#1E1E1E",
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: accentGreen,
                tabBarInactiveTintColor: gray1,
                tabBarStyle: {
                    height: 75,
                    // paddingHorizontal: 5,
                    paddingTop: 0,
                    backgroundColor: "#1E1E1E",
                    borderTopWidth: 0,
                    paddingBottom: 20,
                    position: "absolute",
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: "Explore",
                    tabBarIcon: ({ color }) => <SearchIcon color={color} />,
                }}
            />
            <Tab.Screen
                name="Library"
                component={Library}
                options={{
                    tabBarLabel: "Library",
                    tabBarIcon: ({ color }) => <LibraryIcon color={color} />,
                }}
            />
            <Tab.Screen
                name="Challenge"
                component={Challenge}
                options={{
                    tabBarLabel: "Challenge",
                    tabBarIcon: ({ color }) => <ChallengeIcon color={color} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="user-circle" size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}
