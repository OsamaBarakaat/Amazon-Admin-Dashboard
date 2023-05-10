export interface Iuser {
  name: string;
  email: string;
  phone?: number;
  image?: any;
  verifyEmailCode?: string;
  password: string;
  confirmPassword: string;
  address?: any;
  passwordResetCode?: string;
  passwordResetExpires?: Date;
  passwordResetVerified?: boolean;
  role: string;
  isActive?: boolean;
  wishlist?: Array<any>;
}
