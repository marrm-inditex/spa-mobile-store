export type ProductSummaryDTO = {
  id: string;
  brand: string;
  imgUrl: string;
  model: string;
  price: string;
};

export interface ProductOptionDTO {
  code: number;
  name: string;
}

export type ProductDTO = {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string | string[];
  secondaryCmera?: string | string[];
  secondaryCamera?: string | string[];
  dimensions: string;
  weight: string;
  options: {
    colors: ProductOptionDTO[];
    storages: ProductOptionDTO[];
  };
};
