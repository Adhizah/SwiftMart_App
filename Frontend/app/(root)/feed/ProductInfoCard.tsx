import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

interface ProductInfoCardProps {
  title: string;
  imageUrl: any;
  price?: string | number;
  oldPrice?: string | number;
}

const ProductInfoCard: React.FC<ProductInfoCardProps> = ({ title, imageUrl, price, oldPrice }) => {
  const router = useRouter();
  return (
    <View className="bg-white rounded-2xl p-2 flex-row items-center w-full" style={{ borderRadius: 20 }}>
      <View className="w-28 h-24 rounded-2xl overflow-hidden mr-2 justify-center items-center bg-neutral-100">
        <ImageBackground source={imageUrl} className="w-28 h-24" resizeMode="cover" />
      </View>
      <View className="flex-1 flex-col justify-between h-full pl-1 pr-2">
        <Text className="text-base font-medium text-neutral-900" numberOfLines={2} ellipsizeMode="tail">{title}</Text>
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            {price && <Text className="text-2xl font-bold text-[#156651]">${price}</Text>}
            {oldPrice && <Text className="text-base text-neutral-400 ml-2 line-through">${oldPrice}</Text>}
          </View>
          <View className="bg-[#156651] rounded-full w-12 h-12 justify-center items-center">
            <TouchableOpacity onPress={() => router.push('/(root)/(Home)/ProductDetail')}>
              <ShoppingCart size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductInfoCard;
