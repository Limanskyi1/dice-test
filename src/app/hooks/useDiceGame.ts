import { useRef, useState } from "react";
import { getRandomNumber } from "../utils/getRandomNumber";
import { DicePrediction, DiceResult } from "../types";

export const useDiceGame = () => {
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const [chosenNumber, setChosenNumber] = useState(20);
  const [prediction, setPrediction] = useState<DicePrediction>("under");
  const [results, setResults] = useState<DiceResult[]>([]);
  const keyCounter = useRef(0);

  const changePrediction = (value: DicePrediction) => {
    setPrediction(value);
  };

  const changeChosenNumber = (value: number) => {
    setChosenNumber(value);
  };

  const checkIsWinner = (isOver: boolean, number: number) => {
    return isOver ? number > chosenNumber : number < chosenNumber;
  };

  const addResult = (result: DiceResult) => {
    setResults((prev) => [result, ...prev.slice(0, 9)]);
  };

  const getDescription = (isWinner: boolean, isOver: boolean, isEqual: boolean) => {
    if (isWinner) return "";
    const comparison = isEqual ? "equal to" : isOver ? "lower" : "higher";
    return `Number was ${comparison} your range`;
  };

  const play = () => {
    const generatedNumber = getRandomNumber(0, 100);
    const isOver = prediction === "over";
    const isEqual = generatedNumber === chosenNumber;
    const isWinner = checkIsWinner(isOver, generatedNumber);
    const description = getDescription(isWinner, isOver, isEqual);

    setGeneratedNumber(generatedNumber);
    addResult({
      id: `${keyCounter.current++}`,
      time: new Date().toLocaleTimeString(),
      guess: `${prediction} ${chosenNumber}`,
      result: generatedNumber,
      isWinner,
    });
    return {
      number: generatedNumber,
      isWinner,
      message: isWinner ? "You won!" : "You lost!",
      description,
    };
  };

  return {
    generatedNumber,
    chosenNumber,
    prediction,
    results,
    play,
    changePrediction,
    changeChosenNumber,
  };
};
