import React, { useRef, useState } from 'react';
import { Modal, TextInput, ScrollView, Linking, Alert } from 'react-native';
import { View, ImageBackground, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFeed } from '../../context/FeedContext';
import { Video, ResizeMode } from 'expo-av';
import { X, MessageCircle, Share2, Heart, User, Copy, QrCode, MessageSquare, MoreHorizontal } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductInfoCard from './ProductInfoCard';
import CommentLikeButton from './CommentLikeButton';

import * as Clipboard from 'expo-clipboard';


// LikeButton component for heart icon stacked above like count
const LikeButton = ({ initialLikes }: { initialLikes: number }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
      alert('Liked!');
    }
  };
  return (
    <TouchableOpacity
      style={{ alignItems: 'center' }}
      onPress={handleLike}
    >
      <Heart size={28} color={liked ? '#E44A4A' : '#fff'} fill={liked ? '#E44A4A' : 'none'} />
      <Text style={{ color: '#fff', fontSize: 16, marginTop: 2 }}>{likes.toLocaleString()}</Text>
    </TouchableOpacity>
  );
};

const PostDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const productId = params.id || params.productId;
  const { posts } = useFeed();
  const flatListRef = useRef<FlatList<any>>(null);
  const { width, height } = Dimensions.get('window');
  const initialIndex = posts.findIndex((p: any) => p.id === productId || p.id === Number(productId));

  // Modal state for comments
  const [commentsVisible, setCommentsVisible] = useState(false);
  // Modal state for share
  const [shareVisible, setShareVisible] = useState(false);
  // State for Follow button
  const [isFollowing, setIsFollowing] = useState(false);

  // Dummy comments data
  // Each comment now has both originalText and translatedText
  const [comments, setComments] = useState([
    {
      id: 1,
      username: '1062User_62840208137',
      country: '🇳🇬',
      date: '18 Feb 2025',
      originalText: 'Nice headset.Love it !!',
      translatedText: 'Nice headset.Love it !!',
    },
    {
      id: 2,
      username: '1062User_62840208137',
      country: '🇳🇬',
      date: '18 Feb 2025',
      originalText: 'Nice headset.Love it !!',
      translatedText: 'Nice headset.Love it !!',
    },
    {
      id: 3,
      username: '1062User_62840208137',
      country: '🇳🇬',
      date: '18 Feb 2025',
      originalText: 'Nice headset.Love it !!',
      translatedText: 'Nice headset.Love it !!',
    },
    {
      id: 4,
      username: '1062User_62840208137',
      country: '🇳🇬',
      date: '18 Feb 2025',
      originalText: 'Nice headset.Love it !!',
      translatedText: 'Nice headset.Love it !!',
    },
  ]);

  const [showOriginal, setShowOriginal] = useState(false);

  const [commentInput, setCommentInput] = useState('');

  // Format date as 'DD MMM YYYY'
  const getFormattedDate = () => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleSubmitComment = () => {
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        username: 'CurrentUser', // Replace with actual user
        country: '🇳🇬', // Replace with actual user country
        date: getFormattedDate(),
        originalText: commentInput.trim(),
        translatedText: commentInput.trim(), // Replace with actual translation if available
      },
    ]);
    setCommentInput('');
  };

  // State for QR modal
  const [qrVisible, setQrVisible] = useState(false);
  // State for More modal
  const [moreVisible, setMoreVisible] = useState(false);
  // The product link to share
  const getProductLink = () => `https://swiftmart.com/product/${productId}`;

  // Share actions
  const handleOpenInstagram = () => {
    const url = `https://www.instagram.com/?url=${encodeURIComponent(getProductLink())}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open Instagram.'));
  };
  const handleOpenSnapchat = () => {
    const url = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(getProductLink())}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open Snapchat.'));
  };
  const handleOpenTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getProductLink())}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open Twitter.'));
  };
  const handleOpenTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(getProductLink())}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open Telegram.'));
  };
  const handleCopy = () => {
    Clipboard.setStringAsync(getProductLink());
    Alert.alert('Copied!', 'Product link copied to clipboard.');
  };
  const handleOpenWhatsApp = () => {
    const url = `whatsapp://send?text=${encodeURIComponent(getProductLink())}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'WhatsApp is not installed.'));
  };
  const handleOpenFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getProductLink())}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open Facebook.'));
  };
  const handleOpenSMS = () => {
    const url = `sms:?body=${encodeURIComponent(getProductLink())}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open Messages app.'));
  };

  // Find initial index for FlatList
  // const initialIndex = posts.findIndex((p: any) => p.id === productId || p.id === Number(productId));

  // Render each product as a full screen item
  const renderItem = ({ item }: { item: any }) => (
    <View style={{ width, height, flex: 1 }}>
      {/* Shared media rendering and overlay */}
      <View style={{ flex: 1 }}>
        {item.type === 'video' ? (
          <Video
            source={{ uri: item.videoUrl }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width, height }}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
          />
        ) : (
          <ImageBackground
            source={item.imageUrl}
            style={{ flex: 1, width, height }}
            resizeMode="cover"
          />
        )}
        {/* Shared overlay content */}
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: height / 3.8, backgroundColor: item.type === 'video' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.35)', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}>
          {/* Product info card overlapping overlay and background */}
          <View style={{ position: 'absolute', top: -50, left: 20, right: 20, zIndex: 10 }}>
            <ProductInfoCard
              title={item.title}
              imageUrl={item.imageUrl}
              price={item.price || '250.00'}
              oldPrice={item.oldPrice || '500.00'}
            />
          </View>
          {/* Description below card, with extra top margin to avoid overlap */}
          <View style={{ marginTop: 60 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500', marginBottom: 16, textAlign: 'left' }} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
            {/* Row: avatar, username, follow, icons */}
            <View>
              {/* Top row: avatar and username, right: like, comment, share icons */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Left: avatar and username */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#eee', marginRight: 8, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                    {item.user?.avatar && <ImageBackground source={item.user.avatar} style={{ width: 32, height: 32 }} />}
                  </View>
                  <Text style={{ color: '#fff', fontSize: 15 }}>{item.user?.username || 'user'}</Text>
                </View>
                {/* Right: like, comment, share icons */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 0 }}>
                  {/* Like */}
                  <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
                    <LikeButton initialLikes={typeof item.likes === 'number' ? item.likes : 2200} />
                  </View>
                  {/* Comment */}
                  <TouchableOpacity
                    style={{ alignItems: 'center', marginHorizontal: 8 }}
                    onPress={() => setCommentsVisible(true)}
                  >
                    <MessageCircle size={28} color="#fff" />
                    <Text style={{ color: '#fff', fontSize: 16, marginTop: 2 }}>{item.comments || '200'}</Text>
                  </TouchableOpacity>
                  {/* Share */}
                  <TouchableOpacity
                    style={{ alignItems: 'center', marginHorizontal: 8 }}
                    onPress={() => setShareVisible(true)}
                  >
                    <Share2 size={28} color="#fff" />
                    <Text style={{ color: '#fff', fontSize: 16, marginTop: 2 }}>{item.shares || '20'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Single Follow button below usernames row, alternates text and color */}
              <TouchableOpacity
                style={{
                  backgroundColor: isFollowing ? '#156651' : '#fff',
                  borderRadius: 20,
                  paddingHorizontal: 32,
                  height: 36,
                  alignSelf: 'center',
                  marginTop: 12,
                  justifyContent: 'center',
                  borderWidth: isFollowing ? 0 : 1,
                  borderColor: isFollowing ? '#156651' : '#eee',
                }}
                onPress={() => setIsFollowing(f => !f)}
              >
                <Text style={{
                  color: isFollowing ? '#fff' : '#156651',
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Top bar: Close at top left, More at top right */}
        <View style={{ position: 'absolute', top: 40, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 2 }}>
          {/* Close button at top left */}
          <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#fff', borderRadius: 20, padding: 8, borderWidth: 0.5, borderColor: '#404040' }}>
            <X size={24} color="#156651" />
          </TouchableOpacity>
          {/* More icon at top right */}
          <TouchableOpacity onPress={() => setMoreVisible(true)} style={{ backgroundColor: '#fff', borderRadius: 20, padding: 8, borderWidth: 0.5, borderColor: '#404040' }}>
            <MoreHorizontal size={24} color="#156651" />
          </TouchableOpacity>
        </View>
        {/* Comments Modal */}
        <Modal
          visible={commentsVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setCommentsVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.15)' }}>
            <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, minHeight: 420 }}>
              {/* Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontWeight: '700', fontSize: 20 }}>Comments({comments.length})</Text>
                <TouchableOpacity onPress={() => setCommentsVisible(false)}>
                  <X size={24} color="#404040" />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ color: '#888', fontSize: 13 }}>Comments have been auto translated</Text>
                <TouchableOpacity
                  style={{ borderWidth: 1, borderColor: '#eee', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 4 }}
                  onPress={() => setShowOriginal(!showOriginal)}
                >
                  <Text style={{ color: '#404040', fontSize: 13 }}>{showOriginal ? 'Show Translated' : 'Show Original'}</Text>
                </TouchableOpacity>
              </View>
              {/* Comments List */}
              <ScrollView style={{ maxHeight: 220 }}>
                {comments.map((c) => (
                  <View key={c.id} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
                    <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                      <User size={22} color="#404040" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#222' }}>{c.username}</Text>
                        <Text style={{ fontSize: 13, marginLeft: 4 }}>{c.country}</Text>
                        <Text style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>{c.date}</Text>
                      </View>
                      <Text style={{ fontSize: 15, color: '#222' }}>{showOriginal ? c.originalText : c.translatedText}</Text>
                    </View>
                    <CommentLikeButton />
                  </View>
                ))}
              </ScrollView>
              {/* Input Row */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <TextInput
                  style={{ flex: 1, backgroundColor: '#f3f3f3', borderRadius: 20, paddingHorizontal: 16, height: 40, fontSize: 15 }}
                  placeholder="Leave a comment ..."
                  placeholderTextColor="#888"
                  value={commentInput}
                  onChangeText={setCommentInput}
                />
                <TouchableOpacity
                  style={{ backgroundColor: '#156651', borderRadius: 10, paddingHorizontal: 24, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}
                  onPress={handleSubmitComment}
                >
                  <Text style={{ color: '#fff', fontWeight: '500', fontSize: 15 }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Share Modal */}
        <Modal
          visible={shareVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShareVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.15)' }}>
            <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, minHeight: 260 }}>
              {/* Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ fontWeight: '700', fontSize: 20 }}>Share</Text>
                <TouchableOpacity onPress={() => setShareVisible(false)}>
                  <X size={24} color="#404040" />
                </TouchableOpacity>
              </View>
              {/* Top row: WhatsApp and Facebook */}
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 12 }}>
                <TouchableOpacity onPress={handleOpenWhatsApp} style={{ alignItems: 'center', marginRight: 32 }}>
                  <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#25D366', justifyContent: 'center', alignItems: 'center', marginBottom: 4 }}>
                    <Ionicons name="logo-whatsapp" size={32} color="#fff" />
                  </View>
                  <Text style={{ fontSize: 15, color: '#222' }}>WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOpenFacebook} style={{ alignItems: 'center', marginRight: 32 }}>
                  <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#1877F3', justifyContent: 'center', alignItems: 'center', marginBottom: 4 }}>
                    <Ionicons name="logo-facebook" size={32} color="#fff" />
                  </View>
                  <Text style={{ fontSize: 15, color: '#222' }}>Facebook</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 1, backgroundColor: '#eee', marginBottom: 12 }} />
              {/* Bottom row: Copy, QR code, Message, More */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleCopy} style={{ alignItems: 'center', flex: 1 }}>
                  <Copy size={28} color="#404040" />
                  <Text style={{ fontSize: 13, color: '#222', marginTop: 2 }}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setQrVisible(true)} style={{ alignItems: 'center', flex: 1 }}>
                  <QrCode size={28} color="#404040" />
                  <Text style={{ fontSize: 13, color: '#222', marginTop: 2 }}>QR code</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOpenSMS} style={{ alignItems: 'center', flex: 1 }}>
                  <MessageSquare size={28} color="#404040" />
                  <Text style={{ fontSize: 13, color: '#222', marginTop: 2 }}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMoreVisible(true)} style={{ alignItems: 'center', flex: 1 }}>
                  <MoreHorizontal size={28} color="#404040" />
                  <Text style={{ fontSize: 13, color: '#222', marginTop: 2 }}>More</Text>
                </TouchableOpacity>
              </View>
        {/* More Modal */}
        <Modal
          visible={moreVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setMoreVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.15)' }}>
            <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, minHeight: 220 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ fontWeight: '700', fontSize: 20 }}>More Apps</Text>
                <TouchableOpacity onPress={() => setMoreVisible(false)}>
                  <X size={24} color="#404040" />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 12 }}>
                <TouchableOpacity onPress={handleOpenInstagram} style={{ alignItems: 'center' }}>
                  <Ionicons name="logo-instagram" size={40} color="#E1306C" />
                  <Text style={{ fontSize: 14, color: '#222', marginTop: 2 }}>Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOpenSnapchat} style={{ alignItems: 'center' }}>
                  <Ionicons name="logo-snapchat" size={40} color="#FFFC00" />
                  <Text style={{ fontSize: 14, color: '#222', marginTop: 2 }}>Snapchat</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOpenTwitter} style={{ alignItems: 'center' }}>
                  <Ionicons name="logo-twitter" size={40} color="#1DA1F2" />
                  <Text style={{ fontSize: 14, color: '#222', marginTop: 2 }}>Twitter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOpenTelegram} style={{ alignItems: 'center' }}>
                  <Ionicons name="paper-plane" size={40} color="#0088cc" />
                  <Text style={{ fontSize: 14, color: '#222', marginTop: 2 }}>Telegram</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* QR Code Modal (icon only) */}
        <Modal
          visible={qrVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setQrVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.25)' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center' }}>
              <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 12 }}>Share via QR Code</Text>
              <Ionicons name="qr-code" size={120} color="#404040" style={{ marginBottom: 12 }} />
              <Text style={{ fontSize: 15, color: '#222', marginBottom: 8 }}>{getProductLink()}</Text>
              <TouchableOpacity onPress={() => setQrVisible(false)} style={{ marginTop: 18, backgroundColor: '#156651', borderRadius: 10, paddingHorizontal: 24, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '500', fontSize: 15 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );

  if (initialIndex === -1) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      pagingEnabled
      initialScrollIndex={initialIndex}
      getItemLayout={(_, index) => ({ length: height, offset: height * index, index })}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#fff' }}
    />
  );
};

export default PostDetailScreen;
