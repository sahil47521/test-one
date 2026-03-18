import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const AuthScreen = () => {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '693517614414-q95bp48ufa9nu5goiiss8iq7t2a7p6ib.apps.googleusercontent.com',
        });
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();

            console.log('User Info:', userInfo);

            // ✅ Access data
            const { user, idToken } = userInfo;

            console.log('Email:', user.email);
            console.log('Name:', user.name);
            console.log('Token:', idToken);

        } catch (error: any) {
            console.log('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            {/* ✅ Correct Button */}
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={handleGoogleSignIn}
            />


        </View>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: '600',
    },
});