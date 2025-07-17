import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Clipboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InvitedList = ({ people, onRemove, onClose  }: any) => {
  const invitationLink = "https://swiftmart.app/split-cart/invite?cartId=12345";

  const handleCopy = async () => {
    try {
      await Clipboard.setString(invitationLink);
      Alert.alert('Success', 'Link copied to clipboard!');
    } catch (err) {
      Alert.alert('Error', 'Failed to copy link');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View className="bg-white p-4 rounded-2xl">
        <Text className="font-Manrope text-BodyBold mb-4 text-center">
          Copy this link to invite others
        </Text>

        <View className="flex-row items-center border border-neutral-30 rounded-lg p-2 mb-4">
        <TextInput
          className="flex-1"
          editable={false}
          value={invitationLink}
        />
        <TouchableOpacity onPress={handleCopy}>
          <Ionicons name="copy-outline" size={24} color="#156651" />
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        {people.length > 0 && (
          <Text className="font-Manrope text-BodyBold mb-2">Invited People:</Text>
        )}

        {people.map((person: string, index: number) => (
          <View
            key={index}
            className="flex-row justify-between items-center mb-2 border-b pb-1 border-neutral-30"
          >
            <Text className="font-Manrope text-BodyRegular">{person}</Text>
            <TouchableOpacity onPress={() => onRemove(person)}>
              <Ionicons name="close-circle" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity className="bg-primary p-4 rounded-2xl mt-2" onPress={onClose}>
        <Text className="font-Manrope text-BodyBold text-neutral-10 text-center">
          Done
        </Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
};

export default InvitedList;
