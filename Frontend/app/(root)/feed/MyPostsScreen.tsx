import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { useVideoPlayer, VideoView } from 'expo-video';

const { width } = Dimensions.get('window');

const MyPostsScreen: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const stored = await AsyncStorage.getItem('myPosts');
      setPosts(stored ? JSON.parse(stored) : []);
    };
    fetchPosts();
  }, []);

  // Track which video is playing
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Video player component for each video post
  const VideoPlayer = React.memo(({ uri, id }: { uri: string, id: string }) => {
    const player = useVideoPlayer(uri, (p: any) => {
      p.loop = true;
      if (playingId === id) {
        p.play();
      } else {
        p.pause();
      }
    });
    return (
      <VideoView
        style={styles.media}
        player={player}
        nativeControls
        allowsFullscreen
        allowsPictureInPicture
        contentFit="cover"
      />
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 8, paddingTop: 12 }}>
      {posts.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#888' }}>No posts yet.</Text>
        </View>
      ) : (
        <MasonryList
          data={posts as any[]}
          keyExtractor={(item: any) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => {
                if (item.type === 'video') {
                  setPlayingId(playingId === item.id ? null : item.id);
                } else {
                  router.push({
                    pathname: '/(root)/feed/PostDetailScreen',
                    params: { id: item.id }
                  });
                }
              }}
              style={styles.card}
            >
              <View style={{ width: '100%', borderRadius: 24, overflow: 'hidden' }}>
                {item.type === 'image' ? (
                  <Image source={{ uri: item.uri }} style={styles.media} resizeMode="cover" />
                ) : (
                  <VideoPlayer uri={item.uri} id={item.id} />
                )}
              </View>
              <View style={styles.infoRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginLeft: 8, fontSize: 15, color: '#404040', fontWeight: '600' }}>{user?.firstName || 'User'}</Text>
                </View>
                <Text style={{ fontSize: 15, color: '#404040', marginRight: 4 }}>{item.description || ''}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  },
  media: {
    width: '100%',
    height: 180,
    borderRadius: 0,
    backgroundColor: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export default MyPostsScreen;
