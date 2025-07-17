import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import CartDropdown from "./CartDropdown";
import { Entypo } from "@expo/vector-icons";

const CartHeader = () => {
  const router = useRouter();

  return (
    <View className="mb-4">
      <TouchableOpacity onPress={() => router.push("/")} className="flex-row items-center mb-2">
        <Entypo name="chevron-left" size={24} color="#156651" />
        <Text className="text-primary ml-1">Go To Home</Text>
      </TouchableOpacity>

      <CartDropdown />
    </View>
  );
};

export default CartHeader;
