import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Modal, Pressable, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Search, MessageCircleMore, UserCircle, Heart, Plus } from 'lucide-react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import productData from '@/constants/productData';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';

const Feed: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'inspiration' | 'myposts' | 'following'>('inspiration');
  const [search, setSearch] = useState('');
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{ uri: string; type: 'image' | 'video' } | null>(null);
  // Handler to open camera (photo or video)
  const handleOpenCamera = async () => {
    setUploadModalVisible(false);
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      videoMaxDuration: 10,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedMedia({ uri: asset.uri, type: asset.type === 'video' ? 'video' : 'image' });
    }
  };

  // Handler to open gallery
  const handleOpenGallery = async () => {
    setUploadModalVisible(false);
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      videoMaxDuration: 10,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedMedia({ uri: asset.uri, type: asset.type === 'video' ? 'video' : 'image' });
    }
  };

  // Masonry image heights
  const [imageHeights, setImageHeights] = useState<Record<number, number>>({});

  useEffect(() => {
    // Get natural image sizes for all products
    productData.forEach((product) => {
      if (!imageHeights[product.id]) {
        // Only works for remote images, for local require() images use a fixed aspect ratio or hardcoded height
        if (typeof product.image === 'number') {
          // Local image: fallback to fixed aspect ratio
          setImageHeights((prev) => ({ ...prev, [product.id]: 180 }));
        } else if (product.image?.uri) {
          Image.getSize(product.image.uri,
            (width, height) => {
              const cardWidth = 180; // px
              const displayHeight = Math.max(120, cardWidth * (height / width));
              setImageHeights((prev) => ({ ...prev, [product.id]: displayHeight }));
            },
            () => setImageHeights((prev) => ({ ...prev, [product.id]: 180 }))
          );
        }
      }
    });
  }, [productData]);

  return (
    <View className="flex-1 bg-white">
      {/* Top Bar with Search and Promo */}
      <View className="mt-16 px-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 bg-secondary/10 rounded-2xl px-3" style={{ height: 40 }}>
            <Search size={24} color="#156651" style={{ marginRight: 8 }} />
            <TextInput
              className="flex-1 text-base text-text"
              placeholder="Come  Earn Freebies 🎁"
              placeholderTextColor="#9e9e9e"
              value={search}
              onChangeText={setSearch}
              editable={true}
              style={{ backgroundColor: 'transparent', height: 40, color: '#404040' }}
            />
          </View>
          <TouchableOpacity className="ml-3">
        <TouchableOpacity className="ml-3" onPress={() => router.push('/(root)/(profile)/Notifications')}>
          <MessageCircleMore size={28} color="#156651" />
        </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity className="ml-3" onPress={() => router.push('/(root)/(tabs)/Profile')}>
        <TouchableOpacity className="ml-3" onPress={() => router.push('/(root)/(tabs)/Profile')}>
          <UserCircle size={28} color="#156651" />
        </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row bg-white mt-4 text-BodyBold">
        <TouchableOpacity
          className="flex-1 py-3 items-center"
          onPress={() => setActiveTab('inspiration')}
        >
          <Text className={`font-bold text-lg ${activeTab === 'inspiration' ? 'text-primary' : 'text-neutral-400'}`}>Inspiration</Text>
          {activeTab === 'inspiration' && <View className="h-0.5 bg-primary mt-1 w-8" />}
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-3 items-center"
          onPress={() => setActiveTab('myposts')}
        >
          <Text className={`font-bold text-lg ${activeTab === 'myposts' ? 'text-primary' : 'text-neutral-400'}`}>My Post</Text>
          {activeTab === 'myposts' && <View className="h-0.5 bg-primary mt-1 w-8" />}
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-3 items-center"
          onPress={() => setActiveTab('following')}
        >
          <Text className={`font-bold text-lg ${activeTab === 'following' ? 'text-primary' : 'text-neutral-400'}`}>Following</Text>
          {activeTab === 'following' && <View className="h-0.5 bg-primary mt-1 w-8" />}
        </TouchableOpacity>
      </View>

      {/* Masonry Product Grid - only show for Inspiration tab */}
      {activeTab === 'inspiration' && (
        <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 12 }}>
          <MasonryList
            data={productData}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => {
              const product = item as typeof productData[number];
              return (
                <TouchableOpacity
                  key={product.id}
                  activeOpacity={0.85}
                  onPress={() => router.push({
                    pathname: '/(root)/feed/PostDetailScreen',
                    params: { id: product.id }
                  })}
                  style={{
                    borderRadius: 24,
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    marginBottom: 16,
                    marginHorizontal: 6,
                    shadowColor: '#000',
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 3,
                  }}
                >
                  <View style={{ width: '100%', borderRadius: 24, overflow: 'hidden' }}>
                    <Image
                      source={product.image}
                      style={{ width: '100%', height: imageHeights[product.id] || 180, borderRadius: 0 }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <UserCircle size={20} color="#9e9e9e" />
                      <Text style={{ marginLeft: 8, fontSize: 15, color: '#404040', fontWeight: '600' }}>{user?.firstName || 'User'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 15, color: '#404040', marginRight: 4 }}>0</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setLikedIds((prev) =>
                            prev.includes(product.id)
                              ? prev.filter(id => id !== product.id)
                              : [...prev, product.id]
                          );
                        }}
                        style={{}}
                      >
                        <Heart
                          size={22}
                          color={likedIds.includes(product.id) ? "#E44A4A" : "#404040"}
                          fill={likedIds.includes(product.id) ? "#E44A4A" : "none"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          {/* Floating Plus Icon */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 24,
              bottom: 32,
              backgroundColor: '#156651',
              borderRadius: 32,
              width: 56,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 6,
            }}
            activeOpacity={0.85}
            onPress={() => setUploadModalVisible(true)}
          >
            <Plus size={32} color="#fff" />
          </TouchableOpacity>
          {/* Upload Modal */}
          <Modal
            visible={uploadModalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setUploadModalVisible(false)}
          >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
              <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 220 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#156651', marginBottom: 18, textAlign: 'center' }}>Upload Media</Text>
                <TouchableOpacity
                  style={{ backgroundColor: '#156651', borderRadius: 16, paddingVertical: 14, marginBottom: 14 }}
                  onPress={handleOpenCamera}
                >
                  <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: '600' }}>Take Photo or Video</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: '#156651', borderRadius: 16, paddingVertical: 14 }}
                  onPress={handleOpenGallery}
                >
                  <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: '600' }}>Choose from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 10, alignSelf: 'center' }} onPress={() => setUploadModalVisible(false)}>
                  <Text style={{ color: '#156651', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        {/* Media Preview after selection */}
        {selectedMedia && (
          <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            {selectedMedia.type === 'image' ? (
              <Image source={{ uri: selectedMedia.uri }} style={{ width: 320, height: 320, borderRadius: 18, backgroundColor: '#fff' }} resizeMode="contain" />
            ) : (
              <View style={{ width: 320, height: 320, borderRadius: 18, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                {/* Video preview: use expo-av for playback if needed */}
                <Text style={{ color: '#fff', fontSize: 16 }}>Video selected (max 10s)</Text>
              </View>
            )}
            <TouchableOpacity style={{ marginTop: 18, backgroundColor: '#156651', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 10 }} onPress={() => setSelectedMedia(null)}>
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15 }}>Close Preview</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      )}
    </View>
  );
};

export default Feed;
