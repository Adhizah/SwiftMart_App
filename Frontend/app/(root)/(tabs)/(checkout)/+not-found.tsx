import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="font-Manrope text-Heading2 mb-4 text-red-500 text-center">
        Oops! Page Not Found
      </Text>
      <TouchableOpacity
        className="bg-primary p-4 rounded-2xl"
        onPress={() => router.push("/")}
      >
        <Text className="font-Manrope text-BodyBold text-white text-center">
          Go to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
