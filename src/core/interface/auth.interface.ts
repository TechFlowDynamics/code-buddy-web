export interface AuthData {
  [key: string]: string | object | number | Array<object | string | number>; // Adjust this type to match the actual structure of your auth data
}

export interface SignUpCredentials {
  email: string;
  password: string;
  userName: string;
}

export interface UserStepTwo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  imageUrl?: string;
}

export interface VerifyOtp {
  email: string;
  code: string;
  purpose: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}