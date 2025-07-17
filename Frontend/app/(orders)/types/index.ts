export interface Order {
  id: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'In Progress' | 'Received' | 'Completed';
  amount: number;
  orderDate: string;
  estimatedDelivery?: string;
  items: OrderItem[];
  customer: Customer;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  timeline: OrderTimeline[];
  totals: OrderTotals;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  sku?: string;
  category?: string;
  image?: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingInfo {
  address: Address;
  method: string;
  carrier?: string;
  trackingNumber?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  method: string;
  cardType?: string;
  last4?: string;
  billingAddress?: Address;
}

export interface OrderTimeline {
  status: string;
  date: string;
  time: string;
  completed: boolean;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Review {
  id: string;
  orderId: string;
  itemId: number;
  rating: number;
  comment: string;
  photos?: string[];
  createdAt: string;
  helpful?: number;
}

export interface OrderTrackingData {
  orderId: string;
  orderPlacedDate: string;
  orderPlacedTime: string;
  paymentCompletedDate: string;
  paymentCompletedTime: string;
  shipmentStatus: 'Not Completed' | 'Completed' | 'In Progress';
  shipmentDate?: string;
  orderReceivedStatus: 'Not Received' | 'Received' | 'In Progress';
  orderReceivedDate?: string;
  paymentMethod: string;
}

export interface OrderListItem {
  id: string;
  amount: number;
  size: number;
  status: 'In Progress' | 'Received' | 'Completed' | 'Cancelled';
  items: Pick<OrderItem, 'name' | 'price' | 'quantity'>[];
}
