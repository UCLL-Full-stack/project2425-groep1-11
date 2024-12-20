import React, { useEffect, useState } from "react";
import { Player } from "@/types";
import MatchService from "@/services/MatchService";
import { useTranslation } from "next-i18next";

interface MatchPlayersProps {
  matchId: number;
  onClose: () => void;
}

const MatchPlayers: React.FC<MatchPlayersProps> = ({ matchId, onClose }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const matchPlayers = await MatchService.getMatchPlayers(matchId);
        setPlayers(matchPlayers);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load players.");
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [matchId]);

  const sortedPlayers = [...players].sort((a, b) => a.number - b.number);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-800 rounded-lg shadow-lg p-6 w-96 border border-yellow-500">
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 font-bebas">
        {t('table.match.player')}
        </h2>
        {isLoading ? (
          <p className="text-yellow-500">{t('table.messages.loading_players')}</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : sortedPlayers.length > 0 ? (
          <ul className="space-y-2">
            {sortedPlayers.map((player) => (
              <li
                key={player.id}
                className="px-4 py-2 bg-gray-700 rounded text-yellow-500"
              >
                <strong>#{player.number}</strong> - {player.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-yellow-500">{t('table.messages.no_players')}</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-600"
          >
            {t('table.match.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchPlayers;
