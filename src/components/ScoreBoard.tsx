import { Player } from '@/types';

type ScoreBoardProps = {
  scores: Record<Player, number>;
  currentPlayer: Player;
  status: string;
};

export default function ScoreBoard({ scores, currentPlayer, status }: ScoreBoardProps) {
  return (
    <div className="flex gap-6 justify-center">
      <div
        className={`flex flex-col items-center px-6 py-3 rounded-xl border-4 transition-all duration-200 ${
          currentPlayer === 'X' && status === 'playing'
            ? 'bg-yellow-400 border-yellow-600 shadow-md scale-105'
            : 'bg-yellow-100 border-yellow-300'
        }`}
      >
        <span className="text-yellow-800 font-extrabold text-xl">Player X</span>
        <span className="text-yellow-700 font-bold text-3xl">{scores.X}</span>
      </div>
      <div className="flex items-center">
        <span className="text-yellow-500 font-extrabold text-2xl">VS</span>
      </div>
      <div
        className={`flex flex-col items-center px-6 py-3 rounded-xl border-4 transition-all duration-200 ${
          currentPlayer === 'O' && status === 'playing'
            ? 'bg-yellow-400 border-yellow-600 shadow-md scale-105'
            : 'bg-yellow-100 border-yellow-300'
        }`}
      >
        <span className="text-yellow-800 font-extrabold text-xl">Player O</span>
        <span className="text-yellow-700 font-bold text-3xl">{scores.O}</span>
      </div>
    </div>
  );
}
