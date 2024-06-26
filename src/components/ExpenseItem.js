import React, { useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../context/AppContext";
import { getCurrencySymbol } from "../components/currencyUtils";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
const ExpenseItem = (props) => {
  const { dispatch, currency } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch({
      type: "RESET_EXPENSE_COST",
      payload: props.id,
    });
  };

  const increaseAllocation = (name) => {
    const expense = {
      name: name,
      cost: 10,
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });
  };
  const decreaseAllocation = (id) => {
    dispatch({
      type: "DECREASE_EXPENSE",
      payload: id,
    });
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>
        {getCurrencySymbol(currency)}
        {props.cost}
      </td>
      <td>
        <FaPlusCircle
          style={{ fontSize: "2rem", color: "green" }}
          onClick={(event) => increaseAllocation(props.name)}
        />
      </td>
      <td>
        <FaMinusCircle
          style={{ fontSize: "2rem", color: "red" }}
          onClick={(event) => decreaseAllocation(props.id)}
        />
      </td>
      <td>
        <TiDelete
          onClick={(event) => handleDeleteExpense()}
          size="1.5em"
        ></TiDelete>
      </td>
    </tr>
  );
};

export default ExpenseItem;
