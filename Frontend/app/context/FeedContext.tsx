import React, { createContext, useState, useContext } from 'react';
import productData from '../../constants/productData';

// Map productData to feed post format
const initialFeedData: any[] = productData.map((product: any) => ({
  id: product.id.toString(),
  type: product.mediaType === 'video' ? 'video' : 'image',
  videoUrl: product.mediaType === 'video' ? product.videoUrl || '' : undefined,
  imageUrl: product.image,
  title: product.name,
  comments: 0,
  likes: '0',
  shares: 0,
  user: {
    id: 'user1',
    username: 'Anonymous',
    avatar: require('@/assets/images/userPic.jpeg'),
    followers: '0',
    isFollowing: false,
  },
  product: {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount || 0,
    image: product.image,
  },
  isLiked: false,
}));

const FeedContext = createContext<any>(null);

export const FeedProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<any[]>(initialFeedData);
  const addPost = (post: any) => setPosts((prev: any[]) => [{ ...post, id: Date.now().toString() }, ...prev]);
  return (
    <FeedContext.Provider value={{ posts, setPosts, addPost }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => useContext(FeedContext);

export default FeedProvider; 