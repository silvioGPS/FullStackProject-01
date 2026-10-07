import { useReducer, useCallback, useEffect } from "react";
import { currencyReducer, initialState } from "../reducers/currencyReducer";
import { fetchExchangeRates } from "../api/exchangerate";

export function useExchangeRates(base = "USD", currencies = []) {
  const [state, dispatch] = useReducer(currencyReducer, initialState);
  const {
    fromCurrency,
    toCurrency,
    amount,
    result,
    loading,
    error,
    rates,
    timestamp,
    ratesLoading,
    ratesError,
  } = state;

  const currencyKey = currencies.join(",");

  const setFromCurrency = useCallback(
    (value) => dispatch({ type: "SET_FROM_CURRENCY", payload: value }),
    [],
  );

  const setToCurrency = useCallback(
    (value) => dispatch({ type: "SET_TO_CURRENCY", payload: value }),
    [],
  );

  const setAmount = useCallback(
    (value) => dispatch({ type: "SET_AMOUNT", payload: value }),
    [],
  );

  const convert = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await fetchExchangeRates(fromCurrency, toCurrency);

      if (!data.success) {
        throw new Error(data.error?.info || "Falha ao buscar a cotação");
      }

      const pair = `${fromCurrency}${toCurrency}`;
      const rate = data.quotes[pair];
      dispatch({ type: "FETCH_SUCCESS", payload: amount * rate });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, [fromCurrency, toCurrency, amount]);

  const loadRates = useCallback(async () => {
    if (!currencyKey) return;

    dispatch({ type: "RATES_START" });
    try {
      const data = await fetchExchangeRates(base, currencyKey);

      if (!data.success) {
        throw new Error(data.error?.info || "Falha ao buscar as cotações");
      }

      const list = Object.entries(data.quotes || {}).map(([pair, value]) => ({
        source: base,
        quote: pair.slice(base.length),
        value,
      }));

      const parsedTimestamp =
        typeof data.timestamp === "number"
          ? new Date(
              data.timestamp < 1e12 ? data.timestamp * 1000 : data.timestamp,
            )
          : new Date();

      dispatch({
        type: "RATES_SUCCESS",
        payload: { rates: list, timestamp: parsedTimestamp },
      });
    } catch (err) {
      dispatch({ type: "RATES_ERROR", payload: err.message });
    }
  }, [base, currencyKey]);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  return {
    fromCurrency,
    toCurrency,
    amount,
    result,
    loading,
    error,
    setFromCurrency,
    setToCurrency,
    setAmount,
    convert,
    rates,
    timestamp,
    ratesLoading,
    ratesError,
    loadRates,
  };
}
