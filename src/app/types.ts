export type DicePrediction = "over" | "under";
export type DiceResult = {
  id: string;
  time: string;
  guess: string;
  result: number;
  isWinner: boolean;
};