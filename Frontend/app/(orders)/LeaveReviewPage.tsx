import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Star, Camera, X, ChevronRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const LeaveReviewPage = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<(string | null)[]>([null, null]);

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(orders)/TransactionPage');
    }
  };

  // Mock order data for review
  const orderData = {
    id: orderId || 'SWM93284',
    items: [
      {
        id: 1,
        name: 'Sony',
        model: 'S59013',
        color: 'White',
        price: 590.13,
        image: require('../../assets/images/computer.png')
      }
    ]
  };

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is required to take photos.');
      return false;
    }
    return true;
  };

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Media library permission is required to select photos.');
      return false;
    }
    return true;
  };

  const handleAddPhotos = (index: number) => {
    Alert.alert(
      'Add Photos',
      'Choose how you want to add photos',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: () => takePhoto(index) },
        { text: 'Choose from Gallery', onPress: () => pickFromGallery(index) }
      ]
    );
  };

  const takePhoto = async (index: number) => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newImages = [...selectedImages];
      newImages[index] = result.assets[0].uri;
      setSelectedImages(newImages);
    }
  };

  const pickFromGallery = async (index: number) => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newImages = [...selectedImages];
      newImages[index] = result.assets[0].uri;
      setSelectedImages(newImages);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages[index] = null;
    setSelectedImages(newImages);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting your review.');
      return;
    }

    if (reviewText.trim().length < 10) {
      Alert.alert('Review Too Short', 'Please write at least 10 characters for your review.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Review Submitted',
        'Thank you for your feedback! Your review has been submitted successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-center p-4 relative">
        <TouchableOpacity 
          onPress={handleBackPress}
          className="absolute left-4"
        >
          <ChevronLeft size={24} color="#156651" />
        </TouchableOpacity>
        <Text className="text-Heading3 font-Manrope text-text">Leave Review</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Order Card - Same as Transaction Page */}
        <TouchableOpacity
          className="bg-white rounded-xl p-4 mb-6"
          style={{ 
            height: 142,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 8,
          }}
        >
          {/* Single Row Layout */}
          <View className="flex-row items-center justify-between h-full">
            {/* Left Side: Image and Product Info */}
            <View className="flex-row items-center flex-1">
              <View className="w-20 h-20 bg-neutral-100 rounded-lg mr-4 items-center justify-center overflow-hidden">
                <Image 
                  source={orderData.items[0].image}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-Manrope text-base mb-1">
                  {orderData.items[0].name}
                </Text>
                <Text className="text-gray-800 font-Manrope text-lg font-bold mb-1">
                  ${orderData.items[0].price.toFixed(2)}
                </Text>
                <Text className="text-neutral-60 font-Manrope text-sm">
                  {orderData.items[0].color}
                </Text>
              </View>
            </View>
            
            {/* Right Side: Chevron */}
            <View className="ml-4">
              <ChevronRight size={20} color="#666" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Rating Section */}
        <View className="mb-6">
          <Text className="text-BodyBold font-Manrope text-text mb-4">Rate</Text>
          <View className="flex-row mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}
                style={{ marginRight: 8 }}
              >
                <Star
                  size={16}
                  color={star <= rating ? '#156651' : '#E5E7EB'}
                  fill={star <= rating ? '#156651' : 'transparent'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Review Text */}
        <View className="mb-6">
          <Text className="text-BodyBold font-Manrope text-text mb-3">
            Tell us more
          </Text>
          <TextInput
            value={reviewText}
            onChangeText={setReviewText}
            placeholder="Write a review to let other shoppers know what you think about this transaction."
            multiline
            numberOfLines={5}
            className="border border-neutral-200 rounded-xl p-4 text-BodyRegular font-Manrope text-neutral-50 bg-white"
            style={{ 
              textAlignVertical: 'top', 
              height: 114,
              fontSize: 14,
              lineHeight: 20
            }}
            maxLength={500}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Add Photos Section */}
        <View className="mb-6">
          <View className="flex-row justify-center">
            {selectedImages.map((imageUri, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => handleAddPhotos(index)}
                className="border-2 border-dashed border-primary rounded-lg items-center justify-center"
                style={{ 
                  width: 75, 
                  height: 75,
                  marginRight: index === 0 ? 32 : 0
                }}
              >
                {imageUri ? (
                  <View className="relative w-full h-full">
                    <Image
                      source={{ uri: imageUri }}
                      style={{ width: '100%', height: '100%' }}
                      className="rounded-lg"
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-alert rounded-full w-6 h-6 items-center justify-center"
                    >
                      <X size={12} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Camera size={50} color="#1A1A1A" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Guidelines */}
        <View className="bg-neutral-20 border border-neutral-200 rounded-lg p-4 mb-6">
          <Text className="text-BodyBold font-Manrope text-text mb-2">Review Guidelines</Text>
          <Text className="text-BodyRegular font-Manrope text-neutral-60 mb-1">
            • Be honest and helpful to other customers
          </Text>
          <Text className="text-BodyRegular font-Manrope text-neutral-60 mb-1">
            • Focus on the product quality and your experience
          </Text>
          <Text className="text-BodyRegular font-Manrope text-neutral-60 mb-1">
            • Avoid personal information or inappropriate content
          </Text>
          <Text className="text-BodyRegular font-Manrope text-neutral-60">
            • Reviews are moderated and may take time to appear
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmitReview}
          disabled={isSubmitting}
          className={`py-4 rounded-lg ${
            isSubmitting ? 'bg-neutral-300' : 'bg-primary'
          }`}
        >
          <Text className="text-white text-center font-Manrope font-medium">
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaveReviewPage;
