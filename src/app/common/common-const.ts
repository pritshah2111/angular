export const currencyArray = [
  { id: 'USD', title: 'USD' },
  { id: 'EUR', title: 'EUR' },
  { id: 'GBP', title: 'GBP' },
  { id: 'AUD', title: 'AUD' },
  { id: 'PLN', title: 'PLN' },
  { id: 'CAD', title: 'CAD', description: 'Canadian Dollar' },
  { id: 'INR', title: 'INR', description: 'Indian Rupee' },
  { id: 'JPY', title: 'JPY', description: 'Japanese Yen' },
  { id: 'CLP', title: 'CLP', description: 'Chilean Peso' },
  { id: 'CNY', title: 'CNY', description: 'Chinese Renminbi Yuan' },
  { id: 'COP', title: 'COP', description: 'Colombian Peso' },

  { id: 'HKD', title: 'HKD', description: 'Hong Kong Dollar' },
  { id: 'IDR', title: 'IDR', description: 'Indonesian Rupiah' },

  { id: 'MXN', title: 'MXN', description: 'Mexican Peso' },
  { id: 'NZD', title: 'NZD', description: 'New Zealand Dollar' },
  { id: 'PEN', title: 'PEN', description: 'Peruvian Sol' },
  { id: 'SGD', title: 'SGD', description: 'Singapore Dollar' },

  { id: 'ZAR', title: 'ZAR', description: 'South African Rand' },
  { id: 'KRW', title: 'KRW', description: 'South Korean Won' },
  { id: 'SEK', title: 'SEK', description: 'Swedish Krona' },
  { id: 'CHF', title: 'CHF', description: 'Swiss Franc' },
  { id: 'NOK', title: 'NOK', description: 'Norwegian Krone' },
];

export const TOKEN_STORAGE_KEY = 'authToken';

export const USER_DETAILS = 'userDetails';

export const SHIPPING_DETAILS = 'shippingDetails';

export const FORWARD_SHIPPING_DETAILS = 'forwardShippingDetails';

export const RISK_SHIPPING_DETAILS = 'riskShippingDetails';

export const RISK_DETAILS = 'riskDetails';

export const STATUSFILTER = {
  active: 'ACTIVE',
  approved: 'APPROVED',
  forwardBook: 'FORWARD_BOOK',
};

export const RISKSTATUSFILTER = [
  { id: 'ACTIVE', value: 'Active Shipments' },
  { id: 'FORWARD_BOOK', value: 'Forward Book Shipments' },
  { id: 'APPROVED', value: 'Approved Shipments' },
];
