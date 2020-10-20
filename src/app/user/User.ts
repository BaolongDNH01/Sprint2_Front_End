export class User {
  userId: number;
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  birthday: string;
  address: string;
  idCard: string;
  point: number;
  signInRecent: string;
  avatar: string;
  flag: string;
  timeLock: number;
  rank: string;
  check = false;
  wallet: number;
  confirmPassword = 'false';
  enabled = 'false';
  constructor() {
  }
}
