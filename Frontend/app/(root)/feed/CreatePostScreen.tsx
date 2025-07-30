import React from 'react';
import productData from '@/constants/productData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Keyboard, TouchableWithoutFeedback, ScrollView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const CreatePostScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Ensure uri and type are always strings
  const uri = Array.isArray(params.uri) ? params.uri[0] : params.uri;
  const type = Array.isArray(params.type) ? params.type[0] : params.type;
  const [description, setDescription] = React.useState('');
  const [selectedProductId, setSelectedProductId] = React.useState<number | null>(null);
  // Setup video player for expo-video
  const player = type === 'video' && uri ? useVideoPlayer(uri, p => { p.loop = true; p.play(); }) : null;

  const handlePost = async () => {
    if (!uri || !type) return;
    const newPost = {
      id: Date.now(),
      uri,
      type,
      description,
      product: selectedProductId ? productData.find(p => p.id === selectedProductId) : null,
      thumbnail: uri, // Use selected image/video as thumbnail
      createdAt: new Date().toISOString(),
    };
    try {
      // Get existing posts
      const existing = await AsyncStorage.getItem('myPosts');
      const posts = existing ? JSON.parse(existing) : [];
      // Add new post
      posts.unshift(newPost);
      await AsyncStorage.setItem('myPosts', JSON.stringify(posts));
    } catch (e) {
      alert('Failed to save post.');
    }
    router.replace('/(root)/(tabs)/Feed');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Create Post</Text>
          <View style={styles.mediaPreview}>
            {type === 'image' && uri ? (
              <Image source={{ uri: uri as string }} style={styles.media} resizeMode="cover" />
            ) : type === 'video' && uri && player ? (
              <VideoView
                style={styles.media}
                player={player}
                nativeControls
                allowsFullscreen
                allowsPictureInPicture
                contentFit="cover"
              />
            ) : null}
          </View>

          {/* Product Selection Section */}
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>Select Product Being Advertised</Text>
          </View>
          <View style={styles.productListContainer}>
            {productData.map(product => (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.productItem,
                  selectedProductId === product.id && styles.productItemSelected
                ]}
                onPress={() => setSelectedProductId(product.id)}
              >
                <Image
                  source={product.image}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <Text style={styles.productName}>{product.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>Description</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Add a description..."
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handlePost}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputLabelContainer: {
    marginHorizontal: 16,
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#156651',
    marginBottom: 2,
    marginLeft: 2,
    letterSpacing: 0.2,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 0,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: '#156651',
    marginTop: 32,
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  mediaPreview: {
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  media: {
    width: '100%',
    maxWidth: 340,
    height: 340,
    borderRadius: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 14,
    padding: 16,
    fontSize: 17,
    marginBottom: 22,
    minHeight: 80,
    color: '#404040',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#156651',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#156651',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 18,
    marginHorizontal: 8,
  },
  productItem: {
    alignItems: 'center',
    margin: 6,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
    width: 100,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  productItemSelected: {
    borderColor: '#156651',
    backgroundColor: '#e6f4ea',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#f3f3f3',
  },
  productName: {
    fontSize: 13,
    color: '#156651',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CreatePostScreen;
