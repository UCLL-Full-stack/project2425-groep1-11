import React, { useState, useEffect } from "react";
import useSWR from "swr";
import PlayerService from "@/services/PlayerService";
import { Player } from "@/types";
import { useTranslation } from "next-i18next";

interface AddPlayerToMatchProps {
  matchId: number;
  onAddPlayers: (selectedPlayers: Player[]) => void;
  onClose: () => void;
}

const AddPlayerToMatch: React.FC<AddPlayerToMatchProps> = ({
  matchId,
  onAddPlayers,
  onClose,
}) => {
  const { data: allPlayers, error } = useSWR("/players", PlayerService.getAllPlayers);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const players = allPlayers || [];
  const { t } = useTranslation();

  useEffect(() => {
    if (allPlayers) {
      console.log("Fetched all players:", allPlayers);
    }
    if (error) {
      console.error("Error fetching players:", error);
    }
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, [allPlayers, error]);

  const handleSelectPlayer = (playerId: number) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleSubmit = () => {
    const selected = players.filter((player) =>
      selectedPlayers.includes(player.id!)
    );
    console.log("Selected players to add:", selected);
    onAddPlayers(selected);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (error) {
    return <div className="text-yellow-500">{t('table.messages.fail_players')}</div>;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-zinc-800 rounded-lg shadow-lg p-6 w-96 border border-yellow-500 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 font-bebas">{t('table.match.add_to_game')}</h2>
        <div className="space-y-4">
          {players.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto space-y-2">
              {players.map((player) => (
                <li
                  key={player.id}
                  className={`flex items-center justify-between px-4 py-2 border rounded text-yellow-500 cursor-pointer hover:bg-yellow-500 hover:text-black ${
                    selectedPlayers.includes(player.id!) ? "bg-yellow-500 text-black" : "bg-zinc-700"
                  }`}
                  onClick={() => handleSelectPlayer(player.id!)}
                >
                  <span>{player.name}</span>
                  {selectedPlayers.includes(player.id!) && <span>✓</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-yellow-500">{t('table.messages.fr_no_players')}.</p>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 font-bold text-white rounded hover:bg-gray-600"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600"
          >
            {t('table.match.add_player')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerToMatch;
