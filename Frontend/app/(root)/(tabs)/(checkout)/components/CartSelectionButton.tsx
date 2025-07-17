import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

type Cart = {
  id: string;
  name: string;
 
};

type CartSelectionButtonProps = {
  cart: Cart;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onInvite: () => void;
};

const CartSelectionButton: React.FC<CartSelectionButtonProps> = ({ cart, isSelected, onSelect, onDelete, onInvite }) => {
  return (
    <TouchableOpacity
      className={`p-4 mb-3 rounded-lg border ${
        isSelected ? "border-primary bg-primary/10" : "border-gray-200 bg-white"
      }`}
      onPress={onSelect}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-medium">{cart.name}</Text>
        
        {cart.id !== "default" && (
          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={onInvite}>
              <AntDesign name="adduser" size={24} color="#156651" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Entypo name="trash" size={24} color="#E53E3E" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CartSelectionButton;