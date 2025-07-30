import React from 'react';
import { View, Image, Text } from 'react-native';
import productData from '../constants/productData';
import { UserCircle } from 'lucide-react-native';

type Product = {
  image: any;
  // Add other product properties as needed
};

const ProductPreviewCard = ({ product }: { product: Product }) => (
  <View style={{
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
    width: 220,
    alignSelf: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  }}>
    <Image
      source={product.image}
      style={{ width: '100%', height: 280, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      resizeMode="cover"
      blurRadius={3}
    />
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <UserCircle size={20} color="#9e9e9e" />
        <Text style={{ marginLeft: 6, fontSize: 16, color: '#404040' }}>You</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#404040', marginRight: 4 }}>0</Text>
        <Text style={{ fontSize: 22, color: '#404040' }}>♡</Text>
      </View>
    </View>
  </View>
);

const MediaPreview = () => {
  // For demo, use the first product
  const product = productData[0];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
      <ProductPreviewCard product={product} />
    </View>
  );
};

export default MediaPreview;
