import clsx from 'clsx';
import { Board as BoardType, CellValue } from '@/types';
import Cell from '@/components/Cell';

type BoardProps = {
  board: BoardType;
  winningLine: number[] | null;
  onCellClick: (index: number) => void;
  disabled: boolean;
};

export default function Board({ board, winningLine, onCellClick, disabled }: BoardProps) {
  return (
    <div
      className={clsx(
        'grid grid-cols-3 gap-3 p-4 rounded-2xl bg-yellow-200 shadow-xl border-4 border-yellow-400',
        disabled && 'opacity-80'
      )}
    >
      {board.map((cell: CellValue, index: number) => (
        <Cell
          key={index}
          value={cell}
          isWinning={winningLine ? winningLine.includes(index) : false}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
        />
      ))}
    </div>
  );
}
