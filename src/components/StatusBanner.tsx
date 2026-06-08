import { GameStatus, Player } from '@/types';

type StatusBannerProps = {
  status: GameStatus;
  winner: Player | null;
  currentPlayer: Player;
};

export default function StatusBanner({ status, winner, currentPlayer }: StatusBannerProps) {
  let message = '';
  let emoji = '';

  if (status === 'won' && winner) {
    message = `Player ${winner} Wins!`;
    emoji = '🎉';
  } else if (status === 'draw') {
    message = "It's a Draw!";
    emoji = '🤝';
  } else {
    message = `Player ${currentPlayer}'s Turn`;
    emoji = currentPlayer === 'X' ? '✏️' : '⭕';
  }

  return (
    <div
      className={`px-8 py-4 rounded-2xl text-center font-extrabold text-2xl border-4 shadow-md transition-all duration-300 ${
        status === 'won'
          ? 'bg-yellow-400 border-yellow-600 text-yellow-900 animate-bounce'
          : status === 'draw'
          ? 'bg-yellow-200 border-yellow-400 text-yellow-800'
          : 'bg-yellow-50 border-yellow-300 text-yellow-700'
      }`}
    >
      <span className="mr-2">{emoji}</span>
      {message}
    </div>
  );
}
