export const adminRole = '659ba7c62b611171a5347a97';
export const roleDefault = [
  {
    _id: adminRole,
    name: 'Supper Admin',
  },
];
export const permisstionDefault = [
  {
    _id: '65a0a995aa7ea10ac4d16961',
    role: adminRole,
    action: ['manage'],
    subject: 'all',
  },
];

export const userDefault = [
  {
    _id: '669b3221b61af72ce33f704e',
    username: 'admin',
    password: '123123@',
    fullname: 'Super Admin',
    role: adminRole,
  },
];
