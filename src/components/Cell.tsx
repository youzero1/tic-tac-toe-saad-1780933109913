import clsx from 'clsx';
import { CellValue } from '@/types';

type CellProps = {
  value: CellValue;
  isWinning: boolean;
  onClick: () => void;
  disabled: boolean;
};

export default function Cell({ value, isWinning, onClick, disabled }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-24 h-24 rounded-xl text-5xl font-extrabold flex items-center justify-center transition-all duration-200 border-4 select-none',
        'focus:outline-none focus:ring-4 focus:ring-yellow-500',
        isWinning
          ? 'bg-yellow-400 border-yellow-600 shadow-lg scale-105'
          : 'bg-yellow-50 border-yellow-300',
        !disabled && !value
          ? 'hover:bg-yellow-100 hover:border-yellow-400 cursor-pointer active:scale-95'
          : 'cursor-default',
        value === 'X' ? 'text-yellow-700' : 'text-yellow-500'
      )}
    >
      {value}
    </button>
  );
}
