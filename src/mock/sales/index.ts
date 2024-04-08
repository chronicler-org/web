import { ClothingModel, PaymentMethod, ProductSize, SaleStatus } from '@/enums';
import { ISale, ICustomerCare, ISaleItem, IProduct } from '@/interfaces';
import { customerCares } from '../customerCares';

const now = new Date();
const makeMockSale = (
  customer_care: ICustomerCare,
  total_value: number,
  status: SaleStatus,
  payment_method: PaymentMethod
) => {
  return {
    customer_care,
    total_value,
    status,
    payment_method,
    created_t: now,
    updated_at: now,
  } as ISale;
};

const makeMockSaleItem = (sale: ISale, product: IProduct, quantity: number) => {
  return {
    sale,
    product,
    quantity,
    created_at: now,
    updated_at: now,
  } as ISaleItem;
};

const makeMockProduct = (
  id: string,
  size: ProductSize,
  model: ClothingModel,
  fabric: string,
  stock: number,
  value: number
) => {
  return {
    id,
    size,
    model,
    stock,
    value,
    fabric,
    created_at: now,
    updated_at: now,
  } as IProduct;
};

export const sales: ISale[] = [
  makeMockSale(
    customerCares[0],
    400,
    SaleStatus.PURCHASE_COMPLETED,
    PaymentMethod.CASH
  ),
  makeMockSale(
    customerCares[1],
    800,
    SaleStatus.PURCHASE_CONFIRMED,
    PaymentMethod.CREDIT_CARD
  ),
  makeMockSale(
    customerCares[2],
    400,
    SaleStatus.AWAITING_PAYMENT,
    PaymentMethod.DEBIT_CARD
  ),
];

export const items: ISaleItem[] = [
  makeMockSaleItem(
    sales[0],
    makeMockProduct(
      '1',
      ProductSize.G,
      ClothingModel.UNDERWEAR,
      'Linho',
      4,
      100
    ),
    4
  ),
  makeMockSaleItem(
    sales[1],
    makeMockProduct(
      '2',
      ProductSize.M,
      ClothingModel.DRESS,
      'Elastano',
      10,
      150
    ),
    4
  ),
  makeMockSaleItem(
    sales[1],
    makeMockProduct(
      '3',
      ProductSize.M,
      ClothingModel.UNDERWEAR,
      'Linho',
      8,
      50
    ),
    4
  ),
  makeMockSaleItem(
    sales[2],
    makeMockProduct('4', ProductSize.M, ClothingModel.PANTS, 'Jeans', 8, 80),
    2
  ),
  makeMockSaleItem(
    sales[2],
    makeMockProduct(
      '4',
      ProductSize.M,
      ClothingModel.T_SHIRT,
      'Algodão',
      40,
      70
    ),
    1
  ),
  makeMockSaleItem(
    sales[2],
    makeMockProduct(
      '4',
      ProductSize.M,
      ClothingModel.JACKET,
      'Algodão',
      40,
      170
    ),
    1
  ),
];
