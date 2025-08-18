export type SortOptions = {
  label: string;
  ascending: boolean | null;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export type CartItem = Product & { quantity: number };
