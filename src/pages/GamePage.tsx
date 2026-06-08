import { useGame } from '@/hooks/useGame';
import Board from '@/components/Board';
import ScoreBoard from '@/components/ScoreBoard';
import StatusBanner from '@/components/StatusBanner';
import { RefreshCw, RotateCcw } from 'lucide-react';

export default function GamePage() {
  const { gameState, makeMove, resetGame, resetAll } = useGame();
  const { board, currentPlayer, status, winner, winningLine, scores } = gameState;

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-4 py-10">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-black text-yellow-600 tracking-tight drop-shadow-sm">
          Tic Tac Toe
        </h1>
        <p className="text-yellow-500 font-semibold text-lg mt-1">Yellow Edition ⚡</p>
      </div>

      {/* Score Board */}
      <div className="mb-6 w-full max-w-sm">
        <ScoreBoard scores={scores} currentPlayer={currentPlayer} status={status} />
      </div>

      {/* Status Banner */}
      <div className="mb-6 w-full max-w-sm">
        <StatusBanner status={status} winner={winner} currentPlayer={currentPlayer} />
      </div>

      {/* Game Board */}
      <Board
        board={board}
        winningLine={winningLine}
        onCellClick={makeMove}
        disabled={status !== 'playing'}
      />

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-xl border-4 border-yellow-500 hover:border-yellow-600 shadow-md transition-all duration-200 active:scale-95 text-lg"
        >
          <RefreshCw size={20} />
          New Game
        </button>
        <button
          onClick={resetAll}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-bold rounded-xl border-4 border-yellow-300 hover:border-yellow-400 shadow-md transition-all duration-200 active:scale-95 text-lg"
        >
          <RotateCcw size={20} />
          Reset All
        </button>
      </div>

      {/* Footer */}
      <p className="mt-10 text-yellow-400 text-sm font-medium">Made with 💛 and React</p>
    </div>
  );
}
