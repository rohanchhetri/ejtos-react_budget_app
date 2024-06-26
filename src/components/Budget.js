import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getCurrencySymbol } from "./currencyUtils";

const Budget = () => {
  const { budget, currency, dispatch } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);
  const handleBudgetChange = (event) => {
    const value = parseInt(event.target.value);
    setNewBudget(value);
    dispatch({
      type: "SET_BUDGET",
      payload: value,
    });
  };
  return (
    <div className="alert alert-secondary">
      <span>Budget: {getCurrencySymbol(currency)}</span>
      <input
        style={{ width: "100%", maxWidth: "160px" }}
        type="number"
        step="10"
        max={20000}
        value={newBudget}
        onChange={handleBudgetChange}
      ></input>
    </div>
  );
};
export default Budget;
