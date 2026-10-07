import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useExchangeRates } from "../hooks/useExchangeRates";

const BASE = "USD";
const CURRENCIES = ["BRL", "EUR", "GBP"];

const CURRENCY_NAMES = {
  USD: "Dólar americano",
  BRL: "Real brasileiro",
  EUR: "Euro",
  GBP: "Libra esterlina",
};

export default function RatesTable({ base = BASE, currencies = CURRENCIES }) {
  const { rates, timestamp, ratesLoading, ratesError, loadRates } =
    useExchangeRates(base, currencies);

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: { xs: 2, sm: 4 },
        borderRadius: 3,
        textAlign: "left",
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" component="h2" sx={{ color: "#1f2937" }}>
            Cotações em tempo real
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Base {base}
            {timestamp
              ? ` • Atualizado em ${timestamp.toLocaleString("pt-BR")}`
              : ""}
          </Typography>
        </Box>

        <Box aria-live="polite" aria-atomic="true">
          {ratesLoading && (
            <Stack direction="row" spacing={2} alignItems="center">
              <CircularProgress size={24} aria-label="Buscando cotações" />
              <Typography>Carregando cotações...</Typography>
            </Stack>
          )}

          {!ratesLoading && ratesError && (
            <Alert severity="error" sx={{ overflowWrap: "anywhere" }}>
              <AlertTitle>Não foi possível carregar as cotações</AlertTitle>
              {ratesError}
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" color="error" onClick={loadRates}>
                  Tentar novamente
                </Button>
              </Box>
            </Alert>
          )}

          {!ratesLoading && !ratesError && rates.length > 0 && (
            <TableContainer>
              <Table size="small" aria-label={`Cotações a partir de ${base}`}>
                <TableHead>
                  <TableRow>
                    <TableCell>Par</TableCell>
                    <TableCell align="right">Cotação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rates.map(({ source, quote, value }) => (
                    <TableRow key={quote} hover>
                      <TableCell component="th" scope="row">
                        {source} → {quote}
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ color: "text.secondary" }}
                        >
                          {CURRENCY_NAMES[quote] ?? quote}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {value.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 4,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {!ratesLoading && !ratesError && rates.length === 0 && (
            <Alert severity="info">
              Nenhuma cotação disponível no momento.
            </Alert>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}
