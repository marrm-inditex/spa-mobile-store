export type ProductSummary = Pick<Product, "id" | "brand" | "model" | "price" | "imgUrl">;

export type ProductOption = {
  code: number;
  name: string;
};

export type Product = {
  id: string;
  brand: string;
  imgUrl: string;
  model: string;
  price: number;
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string[];
  secondaryCamera: string[];
  dimensions: string;
  weight: string;
  options: {
    colors: ProductOption[];
    storages: ProductOption[];
  };
};
