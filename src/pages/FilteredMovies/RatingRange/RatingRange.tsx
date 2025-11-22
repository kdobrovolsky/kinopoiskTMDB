import s from './RatingRange.module.css';
import { debounce, Slider } from '@mui/material';
import { useCallback } from 'react';

type Props = {
  minRating: string;
  maxRating: string;
  onRatingChange: (min: string, max: string) => void;
};

export const RatingRange = ({ minRating, maxRating, onRatingChange }: Props) => {
  const debouncedRatingChange = useCallback(
    debounce((min: string, max: string) => {
      onRatingChange(min, max);
    }, 200),
    [onRatingChange]
  );

  return (
    <div className={s.filterGroup}>
      <div className={s.filterTitle}>Rating</div>
      <div className={s.ratingValue}>
        {minRating} – {maxRating}
      </div>
      <Slider
        value={[Number(minRating), Number(maxRating)]}
        onChange={(_e, newValue) => {
          debouncedRatingChange(newValue[0].toString(), newValue[1].toString());
        }}
        min={0}
        max={10}
        step={0.1}
        valueLabelDisplay='auto'
        sx={{ maxWidth: 300 }}
      />
    </div>
  );
};
