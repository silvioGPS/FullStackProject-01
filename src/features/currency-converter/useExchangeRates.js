import { useReducer, useCallback } from "react";
import { currencyReducer, initialState } from "./currencyReducer";
 
// MOCK enquanto o service real (issue #2) não termina.
// Quando ele existir, troque só esta linha:
import { fetchExchangeRates } from "./api.mock";
// import { fetchExchangeRates } from "./api";
 
export function useExchangeRates() {
  const [state, dispatch] = useReducer(currencyReducer, initialState);
  const { fromCurrency, toCurrency, amount, result, loading, error } = state;
 
  const setFromCurrency = useCallback(
    (value) => dispatch({ type: "SET_FROM_CURRENCY", payload: value }),
    []
  );
 
  const setToCurrency = useCallback(
    (value) => dispatch({ type: "SET_TO_CURRENCY", payload: value }),
    []
  );
 
  const setAmount = useCallback(
    (value) => dispatch({ type: "SET_AMOUNT", payload: value }),
    []
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
  };
}