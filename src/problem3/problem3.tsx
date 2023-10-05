import React, { useEffect, useMemo, useState } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Add a type for blockchain
}

interface BoxProps {}

interface Props extends BoxProps {
  // Define props if needed
  children: React.ReactNode;
}

const blockchainPriorities: { [key: string]: number } = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
  default: -99,
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const [balances, setBalances] = useState<WalletBalance[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch and set balances
    // Fetch and set prices
  }, []);

  const getPriority = (blockchain: string): number => {
    return blockchainPriorities[blockchain] || blockchainPriorities.default;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // sort desc
      });
  }, [balances, prices]);

  const rows = (): React.ReactElement[] => {
    return sortedBalances.map((balance, index) => {
      const usdValue = (prices[balance.currency] || 0) * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()}
        />
      );
    });
  };

  return <div {...rest}>{rows()}</div>;
};
