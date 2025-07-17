import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type InviteModalProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedCart: { id: string; name: string; items: any[] } | undefined;
};

const InviteModal = ({ isVisible, onClose, selectedCart }: InviteModalProps) => {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-[90%] p-4 rounded-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Invite to Cart</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text className="mb-4">Invite people to: {selectedCart?.name}</Text>

       

          <TouchableOpacity
            onPress={onClose}
            className="bg-primary py-3 rounded-lg items-center"
          >
            <Text className="text-white font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InviteModal;
