import React, { useState, useEffect, ChangeEvent } from "react";
import swap from "./swap.svg";
import "./App.css";
import Spinner from "./components/spinner";
import Input from "./components/currency-input";
import CurrencySelect from "./components/currency-select";
import { calculatorPrice, filterPricesByDate } from "./utils";

export interface CurrencyVM {
  currency: string;
  date: string;
  price: number;
}

interface InputCurrencyValue {
  currency: CurrencyVM;
  value: string;
}

const initialInputValue: InputCurrencyValue = {
  currency: {
    currency: "",
    date: "",
    price: 0,
  },
  value: "",
};

function App() {
  // show/hide spinner
  const [loading, setLoading] = useState<boolean>(false);
  const [prices, setPrices] = useState<CurrencyVM[]>([]);
  const [from, setFrom] = useState<InputCurrencyValue>(initialInputValue);
  const [to, setTo] = useState<InputCurrencyValue>(initialInputValue);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    getPrices();
  }, []);

  const getPrices = async () => {
    setLoading(true);
    const response = await fetch("https://interview.switcheo.com/prices.json");

    if (response.ok) {
      const res = await response.json();
      const filterDataFromCurrencyName = filterPricesByDate(res);

      if (filterDataFromCurrencyName.length > 1) {
        setTo({ currency: filterDataFromCurrencyName[0], value: "" });
        setFrom({ currency: filterDataFromCurrencyName[1], value: "" });
      }

      setPrices(filterDataFromCurrencyName);
    }

    setLoading(false);
  };

  const onCurrencySelectChange = (currency: CurrencyVM, isFrom?: boolean) => {
    if (
      (isFrom && currency.currency === to.currency.currency) ||
      (!isFrom && currency.currency === from.currency.currency)
    ) {
      onSwitchClick();
    } else {
      exchangePrice(isFrom || false, isFrom ? from.value : to.value, currency);
      isFrom ? setFrom({ ...from, currency }) : setTo({ ...to, currency });
    }
  };

  const onSwitchClick = () => {
    setTo(from);
    setFrom(to);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    isFrom?: boolean
  ) => {
    const newValue = event.target.value;

    if (/^\d+(\.\d{0,2})?$/.test(newValue) || newValue === "") {
      if (timer) {
        clearTimeout(timer);
      }

      setTimer(
        setTimeout(() => {
          exchangePrice(
            isFrom || false,
            newValue,
            isFrom ? from.currency : to.currency
          );
        }, 300)
      );

      isFrom
        ? setFrom({ ...from, value: newValue })
        : setTo({ ...to, value: newValue });
    }
  };

  const exchangePrice = (
    isFrom: boolean,
    newValue: string,
    currentCurrency: CurrencyVM
  ) => {
    const value =
      calculatorPrice(
        parseFloat(newValue) || 0,
        currentCurrency.price,
        isFrom ? to.currency.price : from.currency.price
      ) || "";

    isFrom ? setTo({ ...to, value }) : setFrom({ ...from, value });
  };

  return (
    <>
      <div className="container">
        <form
          className="card"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);

            setTimeout(() => {
              setLoading(false);
            }, 3000);
          }}
        >
          <h1>CURRENCY EXCHANGE</h1>
          <div className="card-body">
            <div className="left">
              <CurrencySelect
                data={prices}
                onChange={(e) => onCurrencySelectChange(e, true)}
                value={from.currency || undefined}
              />
              <br />
              <Input
                placeholder="0.00"
                type="text"
                value={from.value}
                onChange={(e) => handleInputChange(e, true)}
                required
              />
            </div>
            <div className="center">
              <button type="button" onClick={onSwitchClick}>
                <img src={swap} alt="switch" />
              </button>
            </div>
            <div className="right">
              <CurrencySelect
                data={prices}
                onChange={(e) => onCurrencySelectChange(e)}
                value={to.currency}
              />
              <br />
              <Input
                placeholder="0.00"
                type="text"
                value={to.value}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
          </div>
          <button type="submit" className="button">
            EXCHANGE
          </button>
        </form>
      </div>

      <Spinner show={loading} />
    </>
  );
}

export default App;
