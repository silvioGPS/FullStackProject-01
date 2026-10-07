import { Container, Stack, Typography } from "@mui/material";
import CurrencyConverter from "./components/CurrencyConverter";
import RatesTable from "./components/RatesTable";

function App() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Conversor de Moedas
        </Typography>
        <RatesTable />
        <CurrencyConverter />
      </Stack>
    </Container>
  );
}

export default App;
