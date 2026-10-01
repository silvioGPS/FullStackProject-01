export const initialState = {
  fromCurrency: "USD",
  toCurrency: "BRL",
  amount: 1,
  result: null,
  loading: false,
  error: null,
};
 
export function currencyReducer(state, action) {
  switch (action.type) {
    case "SET_FROM_CURRENCY":
      return { ...state, fromCurrency: action.payload };
 
    case "SET_TO_CURRENCY":
      return { ...state, toCurrency: action.payload };
 
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
 
    case "FETCH_START":
      return { ...state, loading: true, error: null };
 
    case "FETCH_SUCCESS":
      return { ...state, loading: false, result: action.payload };
 
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
 
    default:
      return state;
  }
}