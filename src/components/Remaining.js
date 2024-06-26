import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { getCurrencySymbol } from "./currencyUtils";
const Remaining = () => {
  const { expenses, budget, currency } = useContext(AppContext);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);
  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";
  return (
    <div className={`alert ${alertType}`}>
      <span>
        Remaining: {getCurrencySymbol(currency)}
        {budget - totalExpenses}
      </span>
    </div>
  );
};
export default Remaining;
