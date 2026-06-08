import { useState, useEffect, useCallback } from 'react';
import { supabase, GameRecord } from '@/lib/supabase';

export type LeaderboardEntry = {
  winner: string;
  wins: number;
};

export function useLeaderboard() {
  const [recentGames, setRecentGames] = useState<GameRecord[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!supabase) {
      setError('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: games, error: gamesError } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (gamesError) throw gamesError;

      const records = (games ?? []) as GameRecord[];
      setRecentGames(records);

      const wins: Record<string, number> = {};
      for (const g of records) {
        if (g.winner) {
          wins[g.winner] = (wins[g.winner] ?? 0) + 1;
        }
      }
      const lb: LeaderboardEntry[] = Object.entries(wins)
        .map(([winner, w]) => ({ winner, wins: w }))
        .sort((a, b) => b.wins - a.wins);
      setLeaderboard(lb);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { recentGames, leaderboard, loading, error, refetch: fetchData };
}
