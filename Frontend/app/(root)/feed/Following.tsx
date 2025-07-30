import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const followingData = [
  { name: 'Alice', followers: '1.2K', following: true },
  { name: 'Bob', followers: '1.2K', following: true },
  { name: 'Charlie', followers: '2.3K', following: true },
  { name: 'Emily', followers: '900', following: true },
  { name: 'Frank', followers: '3.1K', following: true },
];
const followersData = [
  { name: 'Diana', followers: '1.2K' },
  { name: 'Eve', followers: '1.2K' },
  { name: 'George', followers: '2.8K' },
  { name: 'Helen', followers: '1.7K' },
  { name: 'Isaac', followers: '2.0K' },
];
const suggestedData = [
  { name: 'Anonymous6734...', followers: '0.5K', following: false },
  { name: 'ProductReviewer', followers: '1.2K', following: false },
  { name: 'ShopperPro', followers: '2.5K', following: false },
  { name: 'DealHunter', followers: '1.8K', following: false },
  { name: 'ReviewMaster', followers: '3.0K', following: false },
];

type CardProps = {
  name: string;
  followers: string;
  buttonText?: string | null;
  onPress?: () => void;
  showClose?: boolean;
};

const Card: React.FC<CardProps> = ({ name, followers, buttonText, onPress, showClose }) => (
  <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 18, margin: 8, width: 160, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, elevation: 2 }}>
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F3F3F3', marginBottom: 8 }} />
      <Text style={{ fontWeight: '600', fontSize: 16, color: '#222' }}>{name}</Text>
      <Text style={{ color: '#888', fontSize: 13 }}>{followers} followers</Text>
    </View>
    {buttonText ? (
      <TouchableOpacity onPress={onPress} style={{ borderWidth: 1, borderColor: '#156651', borderRadius: 24, paddingVertical: 6, alignItems: 'center', marginTop: 8 }}>
        <Text style={{ color: '#156651', fontWeight: '600', fontSize: 16 }}>{buttonText}</Text>
      </TouchableOpacity>
    ) : null}
    {showClose && (
      <TouchableOpacity style={{ position: 'absolute', top: 12, right: 12 }}>
        <Text style={{ fontSize: 18, color: '#bbb' }}>×</Text>
      </TouchableOpacity>
    )}
  </View>
);

const FollowingScreen = () => {
  const [following, setFollowing] = useState(followingData);
  const [followers] = useState(followersData);
  const [suggested, setSuggested] = useState(suggestedData);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 16 }} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={{ fontWeight: '700', fontSize: 18, marginLeft: 18, marginBottom: 8 }}>Following</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }} contentContainerStyle={{ paddingLeft: 10 }}>
        {following.map((user, idx) => (
          <Card
            key={user.name}
            name={user.name}
            followers={user.followers}
            buttonText="Unfollow"
            onPress={() => {
              setFollowing(following.filter((_, i) => i !== idx));
            }}
          />
        ))}
      </ScrollView>
      <Text style={{ fontWeight: '700', fontSize: 18, marginLeft: 18, marginTop: 18, marginBottom: 8 }}>Followers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }} contentContainerStyle={{ paddingLeft: 10 }}>
        {followers.map((user) => (
          <Card key={user.name} name={user.name} followers={user.followers} buttonText={null} />
        ))}
      </ScrollView>
      <Text style={{ fontWeight: '700', fontSize: 18, marginLeft: 18, marginTop: 18, marginBottom: 8 }}>Suggested For You</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }} contentContainerStyle={{ paddingLeft: 10 }}>
        {suggested.map((user, idx) => (
          <Card
            key={user.name}
            name={user.name}
            followers={user.followers}
            buttonText={user.following ? "Unfollow" : "Follow"}
            showClose
            onPress={() => {
              setSuggested(prev => prev.map((u, i) => i === idx ? { ...u, following: !u.following } : u));
            }}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default FollowingScreen;
