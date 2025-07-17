// app/(checkout)/components/CartDropdown.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { useCart } from '@/app/context/_CartContext';
import { useRouter } from 'expo-router';

const CartDropdown = () => {
  const { carts, selectedCartId, removeCart, selectCart } = useCart();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const selectedCart = carts.find((cart) => cart.id === selectedCartId) || carts[0];

  const handleCreateCart = () => {
    router.push('/(checkout)/components/CreateCartScreen');
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.header}>
        <Text style={styles.headerText}>{selectedCart?.name || 'My Cart'}</Text>
        <Entypo name="chevron-down" size={24} color="#156651" />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={carts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <TouchableOpacity 
                  onPress={() => {
                    selectCart(item.id);
                    setDropdownVisible(false);
                  }}
                  style={{ flex: 1 }}
                >
                  <Text style={[
                    styles.cartName,
                    item.id === selectedCartId && styles.selectedCart
                  ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
                {item.id !== 'default' && (
                  <View style={styles.cartActions}>
                    <TouchableOpacity onPress={() => removeCart(item.id)}>
                      <Feather name="trash-2" size={20} color="#FF4444" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            ListFooterComponent={
              <TouchableOpacity 
                onPress={handleCreateCart} 
                style={styles.createButton}
              >
                <Text style={styles.createButtonText}>Create New Cart</Text>
              </TouchableOpacity>
            }
          />
        </View>
      )}
    </View>
  );
};

export default CartDropdown;

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    marginTop: 20,
    zIndex: 1000,
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerText: { 
    fontSize: 18, 
    marginRight: 10,
    color: '#156651',
    fontWeight: '600',
  },
  dropdown: { 
    marginTop: 10, 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 8,
    width: '100%',
    maxHeight: 300,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  createButton: { 
    padding: 12,
    backgroundColor: '#156651',
    borderRadius: 8,
    marginTop: 10,
  },
  createButtonText: { 
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cartName: { 
    fontSize: 16,
    color: '#1F2937',
  },
  selectedCart: {
    color: '#156651',
    fontWeight: 'bold',
  },
  cartActions: {
    flexDirection: 'row',
    gap: 16,
  }
});
