export interface Category {
  id: number;
  slug: string;
  name: string;
  shops: CoffeeShop[];
}

export interface Photo {
  id: number;
  url: string;
  coffeeShopId: number;
  shop: CoffeeShop;
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  location?: string;
  password: string;
  avatarURL?: string;
  githubUsername: string;
  totalFollowing: number;
  totalFollowers: number;
  seeFollowings: User[];
  seeFollowers: User[];
  isMe: boolean;
  userCoffeeShops: CoffeeShop;
}

export interface CoffeeShop {
  id: number;
  name: string;
  slug: string;
  payload?: string;
  latitude?: string;
  longitude?: string;
  categories?: Category[];
  photos?: Photo[];
}

export interface ShopWithUser extends CoffeeShop {
  user: User;
}
