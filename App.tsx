//importReact
import React, { useState, useEffect } from 'react';
import { Alert, Text } from 'react-native';
import Navigation from './src/navigation';
import { ToastProvider } from 'react-native-toast-notifications';
import messaging from '@react-native-firebase/messaging';

const App = () => {
    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }


    useEffect(() => {
        requestUserPermission();
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("A new FCM message arrived!", remoteMessage);
            Alert.alert('There is new information', remoteMessage.notification?.body);
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            Alert.alert('There is new information', remoteMessage.notification?.body);
        });

        return unsubscribe;
    }, []);

    return (
        <ToastProvider>
            <Navigation />
        </ToastProvider>
    );
}

export default App;