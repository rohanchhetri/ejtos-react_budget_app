import React, { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AppContext } from "../context/AppContext";
import { getCurrencySymbol } from "./currencyUtils";

const Currency = () => {
  const { dispatch, currency } = useContext(AppContext);

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleSelect = (eventKey) => {
    dispatch({
      type: "CHG_CURRENCY",
      payload: eventKey,
    });
  };

  const handleMouseEnter = (eventKey) => {
    setHoveredItem(eventKey);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const getBackgroundColor = (eventKey) => {
    return eventKey === hoveredItem ? "white" : "lightgreen";
  };

  const style = {
    backgroundColor: "lightgreen",
    color: "white",
    border: "none",
    cursor: "default",
    width: "100%",
    textAlign: "left",
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="alert"
        style={style}
      >
        Currency: ({getCurrencySymbol(currency)} {currency})
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-0 border-black">
        <Dropdown.Item
          onMouseEnter={() => handleMouseEnter("USD")}
          onMouseLeave={handleMouseLeave}
          eventKey="Dollar"
          className="dropdown-items text-black rounded-top"
          style={{
            cursor: "default",
            backgroundColor: getBackgroundColor("USD"),
          }}
        >
          $ Dollar
        </Dropdown.Item>
        <Dropdown.Item
          onMouseEnter={() => handleMouseEnter("GBP")}
          onMouseLeave={handleMouseLeave}
          eventKey="Pound"
          className="dropdown-items text-black"
          style={{
            cursor: "default",
            backgroundColor: getBackgroundColor("GBP"),
          }}
        >
          £ Pound
        </Dropdown.Item>
        <Dropdown.Item
          onMouseEnter={() => handleMouseEnter("EUR")}
          onMouseLeave={handleMouseLeave}
          eventKey="Euro"
          className="dropdown-items text-black"
          style={{
            cursor: "default",
            backgroundColor: getBackgroundColor("EUR"),
          }}
        >
          € Euro
        </Dropdown.Item>
        <Dropdown.Item
          onMouseEnter={() => handleMouseEnter("NPR")}
          onMouseLeave={handleMouseLeave}
          eventKey="Rupees"
          className="dropdown-items text-black rounded-bottom"
          style={{
            cursor: "default",
            backgroundColor: getBackgroundColor("NPR"),
          }}
        >
          ₹ Rupees
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Currency;
