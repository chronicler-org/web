import { ClothingModel, Size } from '@/enums/product';

export interface IProduct {
  id: string;
  model: ClothingModel;
  size: Size;
  value: number;
  fabric: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
