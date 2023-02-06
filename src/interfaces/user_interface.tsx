export interface IUserContext {
  userId: string;
  userInfo: User | null;
  onSignUp: (newUser: NewUser) => Promise<User>;
  onSignIn: (existingUser: {
    email: string;
    password: string;
  }) => Promise<{ id: string; saved: string[] }>;
  onLogOut: () => Promise<void>;
  onError: (code: number, value: string) => void;
  onErrorReset: () => void;
  signError: { on: boolean; message: string };
  savedPets: string[] | string;
  updateUser: (savedList: string[]) => void;
  updateUserInfo: (paramsToUpdate: object) => void;
  getAllUsers: () => Promise<User[]>;
  getUserDetails: () => void;
  getUserForAdmin: (id: string) => Promise<User>;
  onCookieExpired: () => void;
}

export interface User {
  adopted: string[];
  email: string;
  firstName: string;
  fostered: string[];
  is_admin: boolean;
  lastName: string;
  password: string;
  phone: string;
  saved: string[];
  __v: number;
  _id: string;
}

export interface NewUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  repassword: string;
}
