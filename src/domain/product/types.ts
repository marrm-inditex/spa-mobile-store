export type ProductSummary = Pick<Product, "id" | "brand" | "model" | "price" | "imgUrl">;

export type Product = {
  id: string;
  brand: string;
  imgUrl: string;
  model: string;
  price: number;
};
