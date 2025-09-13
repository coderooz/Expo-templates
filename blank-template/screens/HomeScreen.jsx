import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default function HomeScreens() {
    return (
        <View className="flex-1 items-center justify-center bg-red dark:bg-black">
          <Text className="text-black dark:text-white">Home Screen</Text>
          <Text className="text-black dark:text-white">Setup Complete, make change from.</Text>
          <Text className="text-black dark:text-white bg-gray-400 py-2 px-2">./screens/HomeScreen.jsx</Text>
        </View>
    );
}