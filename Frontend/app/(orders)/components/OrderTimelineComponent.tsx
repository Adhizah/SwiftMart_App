import React from 'react';
import { View, Text } from 'react-native';
import { OrderTimeline } from '../types';

interface OrderTimelineProps {
  timeline: OrderTimeline[];
}

const OrderTimelineComponent: React.FC<OrderTimelineProps> = ({ timeline }) => {
  return (
    <View className="space-y-3">
      {timeline.map((update, index) => (
        <View key={index} className="flex-row items-center">
          <View className={`w-3 h-3 rounded-full mr-3 ${update.completed ? 'bg-primary' : 'bg-neutral-300'}`} />
          <View className="flex-1">
            <Text className={`font-Manrope ${update.completed ? 'text-text' : 'text-neutral-60'}`}>
              {update.status}
            </Text>
            <Text className="text-BodyRegular font-Manrope text-neutral-60">
              {update.date}{update.time !== 'Pending' ? ` at ${update.time}` : ''}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default OrderTimelineComponent;
