export async function fetchExchangeRates(base, currencies) {
  await new Promise((resolve) => setTimeout(resolve, 400));
 
  return {
    success: true,
    quotes: {
      [`${base}${currencies}`]: 5.32, // troque pelo par que estiver testando
    },
  };
}