export type Category = 'starters' | 'mains' | 'desserts' | 'beverages';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  tags: string[]; // ["Vegan", "Gluten-Free", "Signature", "Spicy"]
  allergens: string[];
  ingredients: string[];
  calories: number;
  rating: number;
  pairedWine?: string;
  prepMinutes: number;
}

export interface OrderItem {
  id: string; // unique cart item id (dishId + custom modifications string)
  dish: Dish;
  quantity: number;
  modifications?: string;
  pricePaid: number; // in case of modifiers
}

export type TableType = 'main-hall' | 'romantic-booth' | 'garden-patio' | 'chefs-counter';

export interface Slot {
  time: string;
  status: 'available' | 'few-left' | 'fully-booked';
  tablesLeft: number;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  partySize: number;
  name: string;
  email: string;
  phone: string;
  tableType: TableType;
  celebration: 'none' | 'birthday' | 'anniversary' | 'business' | 'date-night';
  specialRequests?: string;
  status?: 'confirmed' | 'seated' | 'completed';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  role?: string; // "Food Critic", "Local Guide"
  source?: 'google' | 'yelp' | 'direct';
}
