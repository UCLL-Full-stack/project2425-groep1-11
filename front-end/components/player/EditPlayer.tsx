import React, { useEffect, useState } from "react";
import { Player } from "@/types";
import { useTranslation } from "next-i18next";

interface EditPlayerProps {
  player: Player;
  onSave: (updatedPlayer: Player) => void;
  onClose: () => void;
}

const EditPlayer: React.FC<EditPlayerProps> = ({ player, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: player.name,
    position: player.position,
    number: player.number,
    birthdate: player.birthdate.toISOString().split("T")[0],
    stat: {
      id: player.stat?.id || null, // Include the stat.id
      appearances: player.stat?.appearances,
      goals: player.stat?.goals ,
      assists: player.stat?.assists,
    },
  });
  
  
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation("");

  useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10); 
      return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
    
      setFormData((prev) => ({
        ...prev,
        [name]: name === "number" ? parseInt(value, 10) || 0 : value, 
      }));
    };

  const handleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      stat: { ...prev.stat, [name]: Number(value) }, // Ensure numbers are parsed
    }));
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...player,
      ...formData,
      birthdate: new Date(formData.birthdate),
      stat: {
        id: player.stat?.id || 0, // Ensure stat ID is passed
        appearances: formData.stat.appearances,
        goals: formData.stat.goals,
        assists: formData.stat.assists,
        playerId: player.id,
      },
    });
  };
  
  
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-500 ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}>
      <div className={`bg-zinc-800 rounded-lg shadow-lg p-6 w-96 border border-yellow-500 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 font-bebas">{t('squad.player_edit')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-500">{t('squad.player_name')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t('squad.player_position')}</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="" disabled>{t('squad.player_position_select')}</option>
              <option value={t('squad.goalkeeper')}>{t('squad.goalkeeper')}</option>
              <option value={t('squad.defender')}>{t('squad.defender')}</option>
              <option value={t('squad.midfielder')}>{t('squad.midfielder')}</option>
              <option value={t('squad.forward')}>{t('squad.forward')}</option>
            </select>
          </div>
          <div>
            <label className="block text-yellow-500">{t('squad.player_number')}</label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t('squad.player_birthdate')}</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t('squad.player_apps')}</label>
            <input
              type="number"
              name="appearances"
              value={formData.stat.appearances}
              onChange={handleStatChange}
              min="0"
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t('squad.player_goals')}</label>
            <input
              type="number"
              name="goals"
              value={formData.stat.goals}
              onChange={handleStatChange}
              min="0"
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t('squad.player_assists')}</label>
            <input
              type="number"
              name="assists"
              value={formData.stat.assists}
              onChange={handleStatChange}
              min="0"
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 font-bold text-white rounded hover:bg-gray-600"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600"
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlayer;
