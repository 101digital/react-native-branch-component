// BranchContext.tsx
import React, { createContext, useContext } from 'react';
import { useAuthorization } from "@/context";

// Define the context value type for branch-related functions
interface BranchContextType {
  isAuthenticated:() => Promise<boolean>;
  hasDepositAccount: () => Promise<boolean>;
  testCondition: () => Promise<boolean>;
}

// Create the branch context
const BranchContext = createContext<BranchContextType | undefined>(undefined);
export const BranchProvider: React.FC = ({ children }) => {
  const { token } = useAuthorization();

  const isAuthenticated = () => {
    if(token){
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
