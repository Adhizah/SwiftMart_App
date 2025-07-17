import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native";
import CartItem from "./components/CartItem";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InvitedList from "./components/InvitedList";
import ShoppingCartTotalModal from "./components/ShoppingCartTotalModal";
import Modal from "react-native-modal";
import { useCart } from "../../../context/_CartContext";



const CartScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  // const [_, ] = useState(cartObject);
  const { carts, removeCart, setSelectedCartId, selectedCartId, updateItemQuantity, handleRemovePerson } = useCart(); // Use the cart context
  // const [selectedCartId, setSelectedCartId] = useState("default");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInviteVisible, setIsInviteVisible] = useState(false);
  const [showCartList, setShowCartList] = useState(false);

  // ✅ FIXED: Safe cart creation without overwriting existing carts
  useEffect(() => {
    if (params.newCart) {
      try {
        const incoming = JSON.parse(params.newCart as string);

        if (!incoming.id || !incoming.name) {
          console.warn("Missing required cart fields.");
          return;
        }

        const cartExists = carts.some((cart) => cart.id === incoming.id);

        if (!cartExists) {
          const newCart = {
            id: incoming.id,
            name: incoming.name,
            items: Array.isArray(incoming.items) ? incoming.items : [],
            invited: Array.isArray(incoming.invited) ? incoming.invited : [],
          };

          // setCarts((prev) => [...prev, newCart]);
          setSelectedCartId(newCart.id);
          setShowCartList(false);
        } else {
          console.log(
            `Cart with id ${incoming.id} already exists — not adding duplicate.`
          );
        }
      } catch (err) {
        console.error("Error parsing newCart:", err);
      }
    }
  }, [params.newCart]);

  const selectedCart =
    carts.find((cart) => cart.id === selectedCartId) || carts[0];

  const subtotal =
    selectedCart?.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;

  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleCreateCartPress = () => {
    router.push("./components/CreateCartScreen");
    setShowCartList(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-20 p-4">
      <View className="flex-row items-center p-4" style={{ marginTop: 24 }}>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.push("/")}
        >
          <Entypo name="chevron-left" size={24} color="#156651" />
          <Text className="text-BodyRegular font-Manrope text-primary ml-2">
            Go To Home
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4 z-50">
        <View className="flex-row items-center border-b border-neutral-30 pb-2">
          <View className="w-16" />
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center"
            onPress={() => setShowCartList(!showCartList)}
          >
            <Text className="font-semibold text-[30px]">
              {selectedCart?.name}
            </Text>
            {showCartList ? (
              <Entypo
                name="chevron-up"
                size={20}
                color="black"
                className="ml-2"
              />
            ) : (
              <Entypo
                name="chevron-down"
                size={20}
                color="black"
                className="ml-2"
              />
            )}
          </TouchableOpacity>

          {selectedCartId !== "default" ? (
            <TouchableOpacity
              className="w-16 items-center"
              onPress={() => setIsInviteVisible(true)}
            >
              <Ionicons name="person-add-outline" size={28} color="#156651" />
              {(selectedCart?.invited?.length ?? 0) > 0 && (
                <View className="absolute -top-1 right-0 bg-primary rounded-full w-5 h-5 flex items-center justify-center">
                  <Text className="text-white text-xs">
                    {selectedCart?.invited?.length ?? 0}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <View className="w-16" />
          )}
        </View>

        {showCartList && (
          <View className="bg-transparent w-full shadow p-4 rounded-lg max-h-60">
            <ScrollView showsVerticalScrollIndicator={false}>
              {carts.map((cart) => (
                <TouchableOpacity
                  key={cart.id}
                  onPress={() => {
                    setSelectedCartId(cart.id);
                    setShowCartList(false);
                  }}
                  className="flex bg-white py-3 rounded-xl px-8 h-[50px] flex-row justify-between items-center mb-3"
                >
                  <Text
                    style={{ fontSize: 16 }}
                    className={`${
                      cart.id === selectedCartId ? "font-bold text-primary" : ""
                    }`}
                  >
                    {cart.name}
                  </Text>

                  {cart.id === "default" ? (
                    <Text
                      style={{ color: "#888", fontSize: 14, marginLeft: 8 }}
                    >
                      (default)
                    </Text>
                  ) : (
                    <View className="flex-row items-center gap-4">
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedCartId(cart.id);
                          setShowCartList(false);
                          setIsInviteVisible(true);
                        }}
                      >
                        <Ionicons
                          name="person-add-outline"
                          size={20}
                          color="#156651"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => removeCart(cart.id)}
                      >
                        <MaterialCommunityIcons
                          name="trash-can-outline"
                          size={20}
                          color="#156651"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))}

              <Button
                BtnText="Create New Cart"
                bgColor="bg-white"
                textColor="text-primary"
                hasBorder={true}
                disabled={false}
                onPress={handleCreateCartPress}
              />
            </ScrollView>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={selectedCart?.items || []}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <CartItem
              {...item}
              onDecrease={() => updateItemQuantity(selectedCartId, item.id, -1)}
              onIncrease={() => updateItemQuantity(selectedCartId, item.id, 1)}
            />
          )}
        />
      </ScrollView>

      <TouchableOpacity
        className="bg-primary shadow-slate-950 shadow-xl p-4 rounded-2xl mb-2 absolute bottom-6 right-4 w-16 h-16"
        onPress={() => setIsModalVisible(true)}
      >
        <AntDesign name="shoppingcart" size={24} color="white" />
      </TouchableOpacity>

      <ShoppingCartTotalModal
        isVisible={isModalVisible}
        subtotal={subtotal}
        shipping={shipping}
        onClose={() => setIsModalVisible(false)}
        showCheckoutButton={true}
        onCheckout={() => {
          setIsModalVisible(false);
          router.push({
            pathname: "/(root)/(tabs)/(checkout)/CheckoutScreen",
            params: { cart: JSON.stringify(selectedCart) },
          });
        }}
      />

      <Modal
        isVisible={isInviteVisible}
        onBackdropPress={() => setIsInviteVisible(false)}
        style={{ justifyContent: "center", margin: 20 }}
      >
        <InvitedList
          people={selectedCart?.invited || []}
          onRemove={()=> handleRemovePerson(selectedCartId, "")}
          onClose={() => setIsInviteVisible(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default CartScreen;
