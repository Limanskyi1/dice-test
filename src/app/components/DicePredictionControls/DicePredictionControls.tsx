import { Box, FormControlLabel, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import styles from "./DicePredictionControls.module.scss";
import { DicePrediction } from "@/app/types";

const sliderMarks = [
  { value: 0 },
  { value: 20 },
  { value: 40 },
  { value: 60 },
  { value: 80 },
  { value: 100 },
];

export const DicePredictionControls = ({
  prediction,
  onChangePrediction,
  chosenNumber,
  onChangeChosenNumber,
}: {
  prediction: DicePrediction;
  onChangePrediction: (value: DicePrediction) => void;
  chosenNumber: number;
  onChangeChosenNumber: (value: number) => void;
}) => {
  return (
    <>
      <RadioGroup
        row
        value={prediction}
        onChange={(_, value) => onChangePrediction(value as DicePrediction)}
        className={styles.radioGroup}
      >
        <FormControlLabel
          value="under"
          label="Under"
          control={<Radio color="secondary" />}
          className={styles.label}
        />
        <FormControlLabel
          value="over"
          label="Over"
          control={<Radio color="secondary" />}
          className={styles.label}
        />
      </RadioGroup>
      <Box sx={{ marginBottom: "16px" }}>
        <Slider
          size="small"
          value={chosenNumber}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          step={1}
          marks={sliderMarks}
          color="secondary"
          onChange={(_, value) => onChangeChosenNumber(value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "var(--c-title)" }} variant="body1" component="span">
            0
          </Typography>
          <Typography sx={{ color: "var(--c-title)" }} variant="body2" component="span">
            100
          </Typography>
        </Box>
      </Box>
    </>
  );
};
