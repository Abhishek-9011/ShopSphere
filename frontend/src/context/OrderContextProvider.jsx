import React from "react";
import OrderContext from "./OrderContext";

const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  return <div></div>;
};

export default OrderContextProvider;
