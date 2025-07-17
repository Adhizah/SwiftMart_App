import { View, Text } from "react-native";
import Modal from "react-native-modal";
import Button from "@/components/Button";

type ShoppingCartTotalModalProps = {
  isVisible: boolean;
  subtotal: number;
  shipping: number;
  onClose: () => void;
  onCheckout?: () => void; // Make checkout optional
  showCheckoutButton?: boolean; // Control whether to show the checkout button
};

const ShoppingCartTotalModal = ({
  isVisible,
  subtotal,
  shipping,
  onClose,
  onCheckout,
  showCheckoutButton = false, // Default to false
}: ShoppingCartTotalModalProps) => {
  const total = subtotal + shipping;

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      backdropOpacity={0}
      onBackdropPress={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        className="bg-white p-4 rounded-t-2xl shadow"
        style={{ height: showCheckoutButton ? 290 : 220, padding: 16, gap: 8 }}
      >
        <View className="flex-row justify-center mb-4">
          <View className="w-16 h-1.5 bg-neutral-40 rounded-full" />
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="font-Manrope text-BodyRegular text-neutral-80">Subtotal</Text>
          <Text className="font-Manrope text-BodyBold text-text">${subtotal.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="font-Manrope text-BodyRegular text-neutral-80">Shipping</Text>
          <Text className="font-Manrope text-BodyBold text-text">${shipping.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between border-t pt-2 border-neutral-30">
          <Text className="font-Manrope text-Heading5 text-text">Total</Text>
          <Text className="font-Manrope text-Heading5 text-text">${total.toFixed(2)}</Text>
        </View>

        {showCheckoutButton && onCheckout && (
          <Button
            BtnText="Checkout"
            bgColor="bg-primary"
            textColor="text-neutral-10"
            hasBorder={true}
            disabled={false}
            onPress={onCheckout}
          />
        )}
      </View>
    </Modal>
  );
};

export default ShoppingCartTotalModal;