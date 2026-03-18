import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { RootStackParamList } from "./types";
import AuthScreen from "../screens/AuthScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()
type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: SplashProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Auth')
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'#000'} />
        </View>
    )
};

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailsScreen} />
        </Stack.Navigator>
    )
}

export default AppNavigator

