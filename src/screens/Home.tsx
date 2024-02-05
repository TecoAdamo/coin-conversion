import React from 'react';
import { TextInput, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import tw from 'twrnc';

import CardConversion from '../components/CardConversion';

export default function Home() {
    return (
        <View style={tw`flex-1 bg-indigo-200 p-4`}>
            <StatusBar barStyle="light-content" />
            <View style={tw`w-full mb-4`}>
                <Text style={tw`text-center font-bold text-2xl  text-gray-600 italic`}>Coin Conversion</Text>
            </View>

            <CardConversion />
        </View>
    );
}
