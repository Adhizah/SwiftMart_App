import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Minus, Plus, Heart } from 'lucide-react-native';

// Added onPress to the props
interface CartItemProps {
    image: any;
    title: string;
    price: number;
    oldPrice: number;
    color: string;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onPress?: () => void; 
}

function CartItem({
    image,
    title,
    price,
    oldPrice,
    color,
    quantity,
    onIncrease,
    onDecrease,
    onPress, 
}: CartItemProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <TouchableOpacity onPress={onPress} >
            <View
                className="bg-neutral-10 p-4 rounded-2xl mb-4 shadow-sm"
                style={{ height: 168 }} 
            >
                <View className="flex-row">
                    <Image source={image} className="w-24 h-24 rounded-lg" />
                    <View className="flex-1 ml-4 justify-between">
                        <Text className="font-Manrope text-Heading4 text-text">{title}</Text>
                        <Text className="font-Manrope text-BodyBold text-text mt-1">${price.toFixed(2)}</Text>
                        <View className="flex-row items-center space-x-2 mt-1">
                            <Text className="font-Manrope text-BodySmallRegular text-neutral-60 line-through">
                                ${oldPrice.toFixed(2)}
                            </Text>
                            <Text className="font-Manrope text-Caption bg-alert rounded-tl-xl rounded-br-xl text-neutral-10 ml-2">
                                45% OFF
                            </Text>
                        </View>
                        <Text className="font-Manrope text-BodySmallRegular text-neutral-80 mt-1">{color}</Text>
                        <View className="flex-row items-center mt-2 justify-between">
                            {/* Heart icon on the left */}
                            <TouchableOpacity
                                className="self-start"
                                onPress={() => setIsFavorite(!isFavorite)}
                            >
                                <Heart size={28} color={isFavorite ? 'red' : '#C2C2C2'} fill={isFavorite ? 'red' : 'none'} />
                            </TouchableOpacity>
                            {/* Quantity controls on the right, inside a frame */}
                            <View
                              className="flex-row items-center bg-neutral-10 rounded px-2 py-1"
                              style={{
                                width: 105,
                                borderWidth: 1,
                                borderColor: "#E5E5E5",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                                <TouchableOpacity onPress={onDecrease}>
                                    <Minus size={24} color="#156651" />
                                </TouchableOpacity>
                                <Text className="font-Manrope text-BodyRegular mx-2">{quantity}</Text>
                                <TouchableOpacity onPress={onIncrease}>
                                    <Plus size={24} color="#156651" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default CartItem;

