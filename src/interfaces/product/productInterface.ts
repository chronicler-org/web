import { ClothingModel, Size } from '@/enums/product';

export interface IProduct {
  id: string;
  model: ClothingModel;
  size: Size;
  value: number;
  fabric: string;
  stock: number;
  created_at: Date;
  updated_at: Date;
}
