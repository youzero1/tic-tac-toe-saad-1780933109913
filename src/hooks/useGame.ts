import { useState, useCallback } from 'react';
import { Board, CellValue, GameState, Player } from '@/types';
import { supabase } from '@/lib/supabase';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board: Board): { winner: Player | null; winningLine: number[] | null } {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winningLine: line };
    }
  }
  return { winner: null, winningLine: null };
}

function checkDraw(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

const initialBoard: Board = Array(9).fill(null);

const initialState: GameState = {
  board: initialBoard,
  currentPlayer: 'X',
  status: 'playing',
  winner: null,
  winningLine: null,
  scores: { X: 0, O: 0 },
};

async function saveGameResult(winner: Player | null, isDraw: boolean, board: Board): Promise<void> {
  if (!supabase) return;
  await supabase.from('games').insert([
    {
      winner: winner ?? null,
      is_draw: isDraw,
      board: JSON.stringify(board),
    },
  ]);
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const makeMove = useCallback((index: number) => {
    setGameState((prev) => {
      if (prev.status !== 'playing' || prev.board[index] !== null) {
        return prev;
      }

      const newBoard: Board = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const { winner, winningLine } = checkWinner(newBoard);

      if (winner) {
        saveGameResult(winner, false, newBoard);
        return {
          ...prev,
          board: newBoard,
          status: 'won',
          winner,
          winningLine,
          scores: {
            ...prev.scores,
            [winner]: prev.scores[winner] + 1,
          },
        };
      }

      if (checkDraw(newBoard)) {
        saveGameResult(null, true, newBoard);
        return {
          ...prev,
          board: newBoard,
          status: 'draw',
          winner: null,
          winningLine: null,
        };
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...initialState,
      scores: prev.scores,
      currentPlayer: prev.winner ? prev.winner : 'X',
    }));
  }, []);

  const resetAll = useCallback(() => {
    setGameState(initialState);
  }, []);

  return { gameState, makeMove, resetGame, resetAll };
}
