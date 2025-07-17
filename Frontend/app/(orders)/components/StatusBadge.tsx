import React from 'react';
import { View, Text } from 'react-native';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'large';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default' }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
      case 'processing':
      case 'in progress':
        return 'border-secondary text-secondary';
      case 'shipped':
      case 'out for delivery':
        return 'border-blue-400 text-blue-600';
      case 'delivered':
      case 'completed':
        return 'border-primary text-primary';
      case 'cancelled':
      case 'failed':
        return 'border-red-400 text-red-600';
      default:
        return 'border-gray-400 text-gray-600';
    }
  };

  const sizeClass = variant === 'large' ? 'px-3 py-2' : 'px-3 py-1';
  const textClass = variant === 'large' ? 'text-sm' : 'text-sm';

  return (
    <View className={`${sizeClass} rounded border ${getStatusColor(status)}`}>
      <Text className={`${textClass} font-Manrope ${getStatusColor(status).split(' ')[1]}`}>
        {status}
      </Text>
    </View>
  );
};

export default StatusBadge;
