import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Text } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import SavedAddressCard from "./components/SavedAddressCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCheckout } from "../../../context/_CheckoutContext";

type Address = {
  id: string;
  name: string;
  phone: string;
  code: string;
  street: string;
  city: string;
  region: string;
  house: string;
  country: string;
  isDefault?: boolean;
};

const AddressSelectionScreen: React.FC = () => {
  const router = useRouter();
  const { setAddress, clearAddress } = useCheckout();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const loadAddresses = async () => {
    const stored = await AsyncStorage.getItem("addresses");
    setAddresses(stored ? JSON.parse(stored) : []);
  };


  const onRefresh = async () => {
    setRefreshing(true);
    await loadAddresses();
    setRefreshing(false);
  };

  const handleAddAddress = async () => {
    await router.push("./components/AddAddress");
    // Refresh addresses after returning from add address screen
    loadAddresses();
  };

  const handleEditAddress = async (addressId: string) => {
    await router.push({
      pathname: "./components/AddAddress",
      params: {
        addressId,
        editMode: "true",
      },
    });
    // Refresh addresses after returning from edit address screen
    loadAddresses();
  };

  const handleConfirm = () => {
    const selectedAddress = addresses.find(
      (address) => address.id === selectedAddressId
    );
    if (selectedAddress) {
      // Convert the address format and save to context
      const addressForCheckout = {
        name: selectedAddress.name,
        street: selectedAddress.street,
        city: selectedAddress.city,
        country: selectedAddress.country,
        region: selectedAddress.region,
        zipCode: selectedAddress.code,
        phone: selectedAddress.phone,
      };
      console.log("Selected address:", selectedAddress);
      console.log("Address for checkout:", addressForCheckout);
      setAddress(addressForCheckout);
    }
    router.push("/CheckoutScreen");
  };

  const handleDeleteAddress = async (addressId: string) => {
    const existing = await AsyncStorage.getItem("addresses");
    const addresses = existing ? JSON.parse(existing) : [];
    const updatedAddresses = addresses.filter(
      (addr: any) => addr.id !== addressId
    );
    await AsyncStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);

    // If all addresses are deleted, clear the checkout address
    if (updatedAddresses.length === 0) {
      clearAddress();
    }
  };

  useEffect(() => {
    // Load addresses when component mounts
    loadAddresses();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Back Button */}
      <View className="flex-row items-center p-4 mt-16">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#156651" />
          <Text className="text-BodyRegular font-Manrope text-primary ml-2">
            Back
          </Text>
        </TouchableOpacity>
      </View>

      {/* Centered Heading */}
      <View className="items-center mb-6">
        <Text className="text-Heading3 font-Manrope text-text">
          Saved Address
        </Text>
      </View>

      {addresses.length === 0 ? (
        <View className="items-center justify-center py-16">
          <Text className="text-BodyRegular font-Manrope text-neutral-80 mb-6">
            No saved address.
          </Text>
        </View>
      ) : (
        <View>
          {addresses.map((address) => (
            <SavedAddressCard
              key={address.id}
              address={{
                ...address,
                countryCode: address.code,
                zipCode: address.code,
                isDefault: address.isDefault || false,
              }}
              onEdit={() => handleEditAddress(address.id)}
              onDelete={() => handleDeleteAddress(address.id)}
              isSelected={selectedAddressId === address.id}
              onPress={() => setSelectedAddressId(address.id)}
            />
          ))}
          {/* Confirm Button */}
          <TouchableOpacity
            className={`rounded-lg p-4 mt-4 items-center mx-auto w-[92%] border border-primary
    ${selectedAddressId ? "bg-primary" : "bg-transparent"}`}
            disabled={!selectedAddressId}
            onPress={handleConfirm}
          >
            <Text
              className={`text-BodyBold font-Manrope ${
                selectedAddressId ? "text-neutral-10" : "text-primary"
              }`}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add New Address Button (always visible) */}
      <TouchableOpacity
        className="border border-primary rounded-lg p-4 mt-6 items-center mx-auto w-[92%] bg-primary"
        onPress={handleAddAddress}
      >
        <Text className="text-BodyBold font-Manrope text-neutral-10">
          Add New Address
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddressSelectionScreen;
