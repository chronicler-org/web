import { API_URL } from '@/constants/publicEnv';

export const BASE_URL = API_URL;

export enum EndPoints {
  AUTH = '/auth',
  AUTH_LOGIN = '/login',

  MANAGER = '/manager',
  MANAGER_ME = '/manager/me',

  ATTENDANT = '/attendant',
  ATTENDANT_ME = '/attendant/me',

  CUSTOMER = '/customer',
  NEW_CUSTOMER_VARIATION = '/customer/new-variation-percent',

  CUSTOMER_CARE = '/customer-care',

  PRODUCT = 'product',

  TAG = 'tag',

  TEAM = 'team',

  SALE = '/sale',
  SALE_ITEM = '/sale/item',
  SALE_PRODUCTS_SUMMARY = '/sale/products-summary',
  PRODUCT_QUANTITY_SOLD_VARIATION = '/sale/product-quantity-sold-variation',
  TOTAL_VALUES_SOLD = '/sale/total-values-sold',
  TOTAL_VALUES_SOLD_VARIATION = '/sale/total-values-sold-variation',
}
