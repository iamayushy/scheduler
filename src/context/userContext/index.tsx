import { createContext, useState, useEffect, type ReactNode } from "react";

interface UserState {
  name: string;
  email: string;
  role: string;
}

interface UserContextType extends UserState {
  updateUser: (userData: Partial<UserState>) => void;
  resetUser: () => void;
}

const user = localStorage.getItem('user');
let initialState: UserState = {
  name: "",
  email: "",
  role: "",
};
if (user) {
  const parsedUser = JSON.parse(user);
  initialState = parsedUser;
}

export const userContext = createContext<UserContextType>({
  ...initialState,
  updateUser: () => {},
  resetUser: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContext({ children }: UserContextProviderProps) {
  const [state, setState] = useState<UserState>(initialState);

  useEffect(() => {
    if(user) {
      setState(JSON.parse(user));
    }
  }, []);

  const updateUser = (userData: Partial<UserState>) => {
    const newState = { ...state, ...userData };
    localStorage.setItem('user', JSON.stringify(newState));
    setState(newState);
  };

  const resetUser = () => {
    setState(initialState);
    localStorage.removeItem('user');
  };

  const userData = {...state};

  return (
    <userContext.Provider 
      value={{
        ...userData,
        updateUser,
        resetUser
      }}
    >
      {children}
    </userContext.Provider>
  );
}
