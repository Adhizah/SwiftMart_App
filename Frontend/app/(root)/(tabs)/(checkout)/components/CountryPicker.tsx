import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, SectionList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { countries } from '../../../../../constants/countries';

const CountryPicker = ({
  selectedCountry,
  onSelect,
}: {
  selectedCountry: string,
  onSelect: (country: string, code: string, flag: string) => void
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Filter and section countries
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const sectionedCountries = getSectionedCountries(filteredCountries);

  const selected = countries.find(c => c.name === selectedCountry);

  return (
    <>
      <TouchableOpacity
        className="border border-neutral-200 rounded-lg p-4 flex-row justify-between items-center"
        onPress={() => setModalVisible(true)}
      >
        <View className="flex-row items-center">
          <Text style={{ fontSize: 20, marginRight: 8 }}>{selected?.flag}</Text>
          <Text className="font-Manrope">
            {selectedCountry || 'Select a country'}
          </Text>
        </View>
        <AntDesign name="down" size={16} color="#888" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
      >
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View className="flex-1 p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-Heading5 font-Manrope">Select Country</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="#888" />
              </TouchableOpacity>
            </View>

            <TextInput
              className="border border-neutral-200 rounded-lg p-4 mb-4 font-Manrope"
              placeholder="Search country"
              value={searchText}
              onChangeText={setSearchText}
            />

            <SectionList
              sections={sectionedCountries}
              keyExtractor={(item) => item.name}
              renderSectionHeader={({ section: { title } }) => (
                <View
                  style={{
                    backgroundColor: '#E5E7EB', // Tailwind's neutral-200
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    width: '100%',
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 16 }}>
                    {title}
                  </Text>
                </View>
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-neutral-100 flex-row items-center"
                  onPress={() => {
                    onSelect(item.name, item.code, item.flag);
                  setModalVisible(false);
                }}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>{item.flag}</Text>
                <Text className="flex-1 font-Manrope">{item.name}</Text>
                <Text className="text-neutral-500">{item.code}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

// Utility function (place above or outside the component)
function getSectionedCountries(countriesList: any[]) {
  const sections: Record<string, any[]> = {};
  countriesList.forEach((country) => {
    const letter = country.name[0].toUpperCase();
    if (!sections[letter]) sections[letter] = [];
    sections[letter].push(country);
  });
  return Object.keys(sections)
    .sort()
    .map((letter) => ({
      title: letter,
      data: sections[letter].sort((a, b) => a.name.localeCompare(b.name)),
    }));
}

export default CountryPicker;