import React, { useState } from 'react';

// create an order context
const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // stick our state in here so it persists through page changes
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
