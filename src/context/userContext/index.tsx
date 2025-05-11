import { createContext, useReducer, type ReactNode } from "react";

interface UserState {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
}

type UserAction = 
  | { type: 'UPDATE_USER'; payload: Partial<UserState> }
  | { type: 'RESET_USER' };

const initialState: UserState = {
  name: "user",
  email: "EMAIL",
  password: "user",
  phone: "0123456789",
  address: "user",
  role: "user",
};

interface UserContextType extends UserState {
  updateUser: (userData: Partial<UserState>) => void;
  resetUser: () => void;
}

export const userContext = createContext<UserContextType>({
  ...initialState,
  updateUser: () => {},
  resetUser: () => {},
});

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, ...action.payload };
    case 'RESET_USER':
      return initialState;
    default:
      return state;
  }
};

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContext({ children }: UserContextProviderProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const updateUser = (userData: Partial<UserState>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const resetUser = () => {
    dispatch({ type: 'RESET_USER' });
  };

  return (
    <userContext.Provider 
      value={{
        ...state,
        updateUser,
        resetUser
      }}
    >
      {children}
    </userContext.Provider>
  );
}
