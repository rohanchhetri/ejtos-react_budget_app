import React, { createContext, useReducer } from "react";
import { getCurrencySymbol } from "../components/currencyUtils";

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  let budget = 0;
  switch (action.type) {
    case "ADD_EXPENSE":
      let total_budget = 0;
      total_budget = state.expenses.reduce((previousExp, currentExp) => {
        return previousExp + currentExp.cost;
      }, 0);
      total_budget = total_budget + action.payload.cost;
      action.type = "DONE";
      if (total_budget <= state.budget) {
        total_budget = 0;
        state.expenses.map((currentExp) => {
          if (currentExp.name === action.payload.name) {
            currentExp.cost = action.payload.cost + currentExp.cost;
          }
          return currentExp;
        });
        return {
          ...state,
        };
      } else {
        alert("Cannot increase the allocation! Out of funds");
        return {
          ...state,
        };
      }
    case "RED_EXPENSE":
      const red_expenses = state.expenses.map((currentExp) => {
        if (
          currentExp.name === action.payload.name &&
          currentExp.cost - action.payload.cost >= 0
        ) {
          currentExp.cost = currentExp.cost - action.payload.cost;
          budget = state.budget + action.payload.cost;
        }
        return currentExp;
      });
      action.type = "DONE";
      return {
        ...state,
        expenses: [...red_expenses],
      };

    case "RESET_EXPENSE_COST":
      const resetExpenses = state.expenses.map((currentExp) => {
        if (currentExp.id === action.payload) {
          return { ...currentExp, cost: 0 };
        }
        return currentExp;
      });

      return {
        ...state,
        expenses: resetExpenses,
      };
    case "DECREASE_EXPENSE":
      const decreasedExpenses = state.expenses.map((currentExp) => {
        if (currentExp.id === action.payload && currentExp.cost - 10 >= 0) {
          return { ...currentExp, cost: currentExp.cost - 10 };
        }
        return currentExp;
      });

      return {
        ...state,
        expenses: decreasedExpenses,
      };

    case "SET_BUDGET":
      const totalExpenses = state.expenses.reduce(
        (total, item) => total + item.cost,
        0
      );
      if (action.payload < totalExpenses) {
        alert("You cannot reduce the budget value lower than the spending");
        return {
          ...state,
        };
      }
      return {
        ...state,
        budget: action.payload,
      };
    case "CHG_CURRENCY":
      const currencySymbol = getCurrencySymbol(action.payload);
      return {
        ...state,
        currency: action.payload,
        // currencyText: currency.text,
        currencySymbol: currencySymbol,
      };
    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads
const initialState = {
  budget: 2000,
  expenses: [
    { id: "Marketing", name: "Marketing", cost: 50 },
    { id: "Finance", name: "Finance", cost: 300 },
    { id: "Sales", name: "Sales", cost: 70 },
    { id: "Human Resource", name: "Human Resource", cost: 40 },
    { id: "IT", name: "IT", cost: 500 },
  ],
  currency: "Pound",
  //   currencyText: "Pound",
  currencySymbol: "£",
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);
  let remaining = 0;

  if (state.expenses) {
    const totalExpenses = state.expenses.reduce((total, item) => {
      return (total = total + item.cost);
    }, 0);
    remaining = state.budget - totalExpenses;
  }

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        remaining: remaining,
        dispatch,
        currency: state.currency,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
