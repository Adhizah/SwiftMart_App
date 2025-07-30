import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';

const ALERT_RED = '#E44A4A'; // Use the custom alert color from tailwind config

const CommentLikeButton = () => {
  const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity onPress={() => setLiked(!liked)} style={{ marginLeft: 8 }}>
      <Heart
        size={22}
        color={liked ? ALERT_RED : '#bbb'}
        fill={liked ? ALERT_RED : 'none'}
      />
    </TouchableOpacity>
  );
};

export default CommentLikeButton;
