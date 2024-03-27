// BranchContext.tsx
import React, { createContext, useContext } from 'react';
import { useAuthorization, useGetUserAccounts } from "@/context";

// Define the context value type for branch-related functions
interface BranchContextType {
  isAuthenticated:() => Promise<boolean>;
  hasDepositAccount: () => Promise<boolean>;
  testCondition: () => Promise<boolean>;
}

// Create the branch context
const BranchContext = createContext<BranchContextType | undefined>(undefined);
export const BranchProvider: React.FC = ({ children }) => {
  const { tokenStep } = useAuthorization();
  const {getUserAccounts }= useGetUserAccounts()

  const isAuthenticated = () => {
    return !!tokenStep;
  }

  const hasDepositAccount = async () => {
    const userAccounts = await getUserAccounts()
    return userAccounts.some((account:any)=> account.type === "DEPOSIT_WALLET")
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
