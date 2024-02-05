import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'twrnc';
import { COIN_API_BASE } from '../constants/CountryApi';

const CountryPicker = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [conversionResult, setConversionResult] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(COIN_API_BASE);

                if (response.data && typeof response.data === 'object') {
                    const countryData = Object.keys(response.data).map((currencyCode) => ({
                        label: `${currencyCode} - ${response.data[currencyCode].name}`,
                        value: currencyCode,
                    }));

                    countryData.sort((a, b) => a.label.localeCompare(b.label));

                    setCountries(countryData);
                } else {
                    console.error('Invalid response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleCalculate = async () => {
        try {
            if (!selectedCountry || !selectedDestination || !inputValue) {
                alert('Por favor, preencha todos os campos antes de calcular.');
                return;
            }

            const response = await axios.get('https://api.fxratesapi.com/convert', {
                params: {
                    from: selectedCountry,
                    to: selectedDestination,
                    amount: inputValue || 1,
                    format: 'json',
                },
            });

            console.log('API Response:', response.data);

            if (response.data && response.data.info && typeof response.data.info === 'object') {
                console.log('Exchange Rate:', response.data.info.rate);
                setConversionResult(response.data.info.rate);
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    return (
        <View style={tw``}>
            <View style={tw`bg-white rounded-4 shadow-2xl w-full mb-8`}>
                <RNPickerSelect
                    items={countries}
                    onValueChange={(value) => setSelectedCountry(value)}
                    placeholder={{ label: 'From', value: null }}
                />
            </View>

            <TextInput
                style={tw`bg-white rounded-4 shadow-2xl w-full mb-8 p-2`}
                placeholder="Digite o valor"
                keyboardType="numeric"
                onChangeText={(text) => setInputValue(text)}
            />

            <View style={tw`bg-white rounded-4 shadow-2xl w-full mb-8`}>
                <RNPickerSelect
                    items={countries}
                    onValueChange={(value) => setSelectedDestination(value)}
                    placeholder={{ label: 'To', value: null }}
                />
            </View>

            <TouchableOpacity
                style={tw`bg-white rounded-4 shadow-2xl w-1/2 mb-8 p-4 left-2/9`}
                onPress={handleCalculate}>
                <Text style={tw`text-center `}>
                    Calcular
                </Text>
            </TouchableOpacity>

            <View style={tw`bg-white h-1/9 rounded-6`}>
                <Text style={tw`text-center top-1/4`}>Resultado: {conversionResult !== null ? (parseFloat(inputValue) * conversionResult).toFixed(2) : ''}</Text>
            </View>
        </View>
    );
};

export default CountryPicker;
