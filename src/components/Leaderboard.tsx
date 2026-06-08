import { useLeaderboard } from '@/hooks/useLeaderboard';
import { Trophy, RefreshCw } from 'lucide-react';

export default function Leaderboard() {
  const { recentGames, leaderboard, loading, error, refetch } = useLeaderboard();

  return (
    <div className="w-full max-w-sm bg-yellow-100 border-4 border-yellow-300 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-yellow-800 font-extrabold text-lg flex items-center gap-2">
          <Trophy size={20} className="text-yellow-600" />
          Leaderboard
        </h2>
        <button
          onClick={refetch}
          disabled={loading}
          className="p-1 rounded-lg hover:bg-yellow-200 transition-colors text-yellow-600 disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error && (
        <p className="text-xs text-yellow-700 bg-yellow-200 rounded-lg p-2 mb-3 border border-yellow-400">
          {error}
        </p>
      )}

      {!error && (
        <>
          <div className="mb-4">
            <h3 className="text-yellow-700 font-bold text-sm mb-2 uppercase tracking-wide">All-Time Wins</h3>
            {leaderboard.length === 0 && !loading && (
              <p className="text-yellow-500 text-sm">No games recorded yet.</p>
            )}
            {leaderboard.map((entry, i) => (
              <div
                key={entry.winner}
                className="flex items-center justify-between py-1 px-2 rounded-lg mb-1 bg-yellow-50 border border-yellow-200"
              >
                <span className="text-yellow-800 font-bold text-sm">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} Player {entry.winner}
                </span>
                <span className="text-yellow-600 font-extrabold text-sm">{entry.wins}W</span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-yellow-700 font-bold text-sm mb-2 uppercase tracking-wide">Recent Games</h3>
            {recentGames.length === 0 && !loading && (
              <p className="text-yellow-500 text-sm">No recent games.</p>
            )}
            {recentGames.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between py-1 px-2 rounded-lg mb-1 bg-yellow-50 border border-yellow-200"
              >
                <span className="text-yellow-800 font-semibold text-xs">
                  {g.is_draw ? '🤝 Draw' : `🎉 Player ${g.winner} Won`}
                </span>
                <span className="text-yellow-500 text-xs">
                  {new Date(g.created_at).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
