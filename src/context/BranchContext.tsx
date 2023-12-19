// BranchContext.tsx
import React, { createContext, useContext } from 'react';
import { useAuth } from 'react-native-auth-component';

// Define the context value type for branch-related functions
interface BranchContextType {
  isAuthenticated:() => Promise<boolean>;
  hasDepositAccount: () => Promise<boolean>;
  testCondition: () => Promise<boolean>;
}

// Create the branch context
const BranchContext = createContext<BranchContextType | undefined>(undefined);
export const BranchProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const isAuthenticated = () => {
    if(user){
      return true;
    }else{
      return false;
    }
  }

  const hasDepositAccount = () => {
    return true;
  }
  const testCondition = () => {
    return false;
  }

  return (
    <BranchContext.Provider value={{ isAuthenticated, hasDepositAccount, testCondition }}>
      {children}
    </BranchContext.Provider>
  );
};

export const useConditions = () => {
  const context = useContext(BranchContext);
  if (context === undefined) {
    throw new Error('useBranch must be used within an BranchProvider');
  }
  return context;
};
