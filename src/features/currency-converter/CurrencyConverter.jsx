import { useExchangeRates } from "./useExchangeRates";

export default function CurrencyConverter() {
  const {
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
  } = useExchangeRates();

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="BRL">BRL</option>
      </select>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="BRL">BRL</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>

      <button onClick={convert} disabled={loading}>
        {loading ? "Convertendo..." : "Converter"}
      </button>

      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={convert}>Tentar novamente</button>
        </div>
      )}

      {result !== null && !error && (
        <p>
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
}
