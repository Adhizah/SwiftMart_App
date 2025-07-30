import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Modal, Pressable, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Search, MessageCircleMore, UserCircle, Heart, Plus } from 'lucide-react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import productData from '@/constants/productData';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import FollowingScreen from '../feed/Following';
import MyPostsScreen from '../feed/MyPostsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    try {
      let permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        alert('Camera permission is required to take a photo or video.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: false,
        videoMaxDuration: 10,
        quality: 1,
      });
      setUploadModalVisible(false);
      console.log('Camera result:', result);
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        router.push({
          pathname: '/(root)/feed/createPostScreen',
          params: {
            uri: asset.uri,
            type: asset.type === 'video' ? 'video' : 'image',
          },
        });
      }
    } catch (error) {
      alert('Failed to open camera. Please try again.');
      console.error('Camera error:', error);
    }
  };

  // Handler to open gallery
  const handleOpenGallery = async () => {
    try {
      let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert('Gallery permission is required to select a photo or video.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: false,
        videoMaxDuration: 10,
        quality: 1,
      });
      setUploadModalVisible(false);
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        router.push({
          pathname: '/(root)/feed/createPostScreen',
          params: {
            uri: asset.uri,
            type: asset.type === 'video' ? 'video' : 'image',
          },
        });
      }
    } catch (error) {
      alert('Failed to open gallery. Please try again.');
      console.error('Gallery error:', error);
    }
  };

  // Masonry image heights
  const [imageHeights, setImageHeights] = useState<Record<number, number>>({});
  const [myPosts, setMyPosts] = useState<any[]>([]);

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
    // Fetch myPosts from AsyncStorage and merge with inspiration
    (async () => {
      const stored = await AsyncStorage.getItem('myPosts');
      setMyPosts(stored ? JSON.parse(stored) : []);
    })();
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
          <TouchableOpacity className="ml-3" onPress={() => router.push('/(root)/(profile)/Notifications')}>
            <MessageCircleMore size={28} color="#156651" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-3" onPress={() => router.push('/(root)/(tabs)/Profile')}>
            <UserCircle size={28} color="#156651" />
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
            data={[...myPosts, ...productData]}
            keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item, i }) => {
              const post = item as any;
              if (post.type === 'image' || post.image) {
                return (
                  <TouchableOpacity
                    key={post.id}
                    activeOpacity={0.85}
                    onPress={() => router.push({
                      pathname: '/(root)/feed/PostDetailScreen',
                      params: { id: post.id }
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
                        source={post.image ? post.image : { uri: post.thumbnail || post.uri }}
                        style={{ width: '100%', height: imageHeights[post.id] || 180, borderRadius: 0 }}
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
                              prev.includes(post.id)
                                ? prev.filter(id => id !== post.id)
                                : [...prev, post.id]
                            );
                          }}
                          style={{}}
                        >
                          <Heart
                            size={22}
                            color={likedIds.includes(post.id) ? "#E44A4A" : "#404040"}
                            fill={likedIds.includes(post.id) ? "#E44A4A" : "none"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              } else if (post.type === 'video') {
                // Render video thumbnail using expo-video
                return (
                  <TouchableOpacity
                    key={post.id}
                    activeOpacity={0.85}
                    onPress={() => router.push({
                      pathname: '/(root)/feed/PostDetailScreen',
                      params: { id: post.id }
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
                      {/* Video thumbnail or player */}
                      {post.uri && (
                        <Video
                          style={{ width: '100%', height: imageHeights[post.id] || 180, borderRadius: 0, backgroundColor: '#000' }}
                          source={{ uri: post.uri }}
                          useNativeControls={false}
                          resizeMode={ResizeMode.COVER}
                          isLooping={false}
                          shouldPlay={false}
                        />
                      )}
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
                              prev.includes(post.id)
                                ? prev.filter(id => id !== post.id)
                                : [...prev, post.id]
                            );
                          }}
                          style={{}}
                        >
                          <Heart
                            size={22}
                            color={likedIds.includes(post.id) ? "#E44A4A" : "#404040"}
                            fill={likedIds.includes(post.id) ? "#E44A4A" : "none"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
              // Always return a valid ReactElement (never null)
              return <View />;
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
        </View>
      )}
      {activeTab === 'myposts' && (
        <View style={{ flex: 1 }}>
          <MyPostsScreen />
        </View>
      )}
      {activeTab === 'following' && (
        <View style={{ flex: 1 }}>
          <FollowingScreen />
        </View>
      )}
    </View>
  );
};

export default Feed;
