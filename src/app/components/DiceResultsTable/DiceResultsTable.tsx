import { DiceResult } from "@/app/types";
import { capitalize } from "@/app/utils/capitalize";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";

interface DiceResultsTableProps {
  results: DiceResult[];
}

export const DiceResultsTable = (props: DiceResultsTableProps) => {
  const { results = [] } = props;
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Guess</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(({ id, time, guess, result, isWinner }) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {time}
              </TableCell>
              <TableCell>{capitalize(guess)}</TableCell>
              <TableCell sx={{ color: isWinner ? "green" : "red" }}>{result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
