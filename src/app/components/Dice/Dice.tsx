"use client";
import {
  Alert,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import styles from "./Dice.module.scss";
import { useSnackPack } from "../../hooks/useSnackPack";
import { useDiceGame } from "../../hooks/useDiceGame";
import { DiceResultsTable } from "../DiceResultsTable/DiceResultsTable";
import { DicePredictionControls } from "../DicePredictionControls/DicePredictionControls";

type SnackPackMessage = {
  key: number;
  message: string;
  variant: "success" | "error";
  description?: string;
};

export const Dice = () => {
  const diceGame = useDiceGame();
  const snackPack = useSnackPack<SnackPackMessage>();

  const handleClickPlay = () => {
    const { isWinner, message, description } = diceGame.play();
    snackPack.show({
      key: Date.now(),
      message,
      description,
      variant: isWinner ? "success" : "error",
    });
  };

  return (
    <>
      <div className={styles.game}>
        <div className={styles.box}>
          <Typography variant="h1">{diceGame.generatedNumber}</Typography>
        </div>
        <DicePredictionControls
          prediction={diceGame.prediction}
          onChangePrediction={diceGame.changePrediction}
          chosenNumber={diceGame.chosenNumber}
          onChangeChosenNumber={diceGame.changeChosenNumber}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickPlay}
          sx={{ width: "100%" }}
        >
          Play
        </Button>
      </div>
      <DiceResultsTable results={diceGame.results} />
      <Snackbar
        key={snackPack.messageInfo?.key}
        message={snackPack.messageInfo?.message}
        open={snackPack.open}
        onClose={snackPack.close}
        autoHideDuration={1000}
        slotProps={{ transition: { onExited: snackPack.exit } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className={styles.snackbar}
      >
        <Alert severity={snackPack.messageInfo?.variant} sx={{ width: "100%" }}>
          <Typography>{snackPack.messageInfo?.message}</Typography>
          <Typography>{snackPack.messageInfo?.description}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
};
