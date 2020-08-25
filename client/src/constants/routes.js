export const routes = {
  home: {
    path: '/',
    name: 'Home',
    exact: true,
    admin: false,
    authenticated: false,
  },
  products: {
    path: '/products',
    name: 'Products',
    exact: true,
    admin: false,
    authenticated: false,
  },
  cart: {
    path: '/cart',
    name: 'Cart',
    exact: true,
    admin: false,
    authenticated: false,
  },
  account: {
    path: '/account',
    name: 'Account',
    exact: true,
    admin: false,
    authenticated: true,
  },
  admin: {
    path: '/admin',
    name: 'Admin',
    exact: false,
    admin: true,
    authenticated: true,
  },
};

export const adminRouter = {
  products: { path: 'products', name: 'Products' },
  orders: {
    path: 'orders',
    name: 'Orders',
  },
};
