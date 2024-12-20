import React, { useState, useEffect } from "react";
import { Match, Team } from "@/types";
import TeamService from "@/services/TeamService";
import { useTranslation } from "next-i18next";

interface AddMatchProps {
  onSave: (newMatch: Omit<Match, "id">) => void;
  onClose: () => void;
  onCancel: () => void;
}

const AddMatch: React.FC<AddMatchProps> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    homeTeamName: "",
    awayTeamName: "",
    homeScore: "",
    awayScore: "",
  });

  const [teams, setTeams] = useState<Team[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTeamData = async () => {
      const teamData = await TeamService.getAllTeams();
      setTeams(teamData);
    };
    fetchTeamData();

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMatch = {
      ...formData,
      homeScore: formData.homeScore !== "" ? Number(formData.homeScore) : null,
      awayScore: formData.awayScore !== "" ? Number(formData.awayScore) : null,
      date: new Date(formData.date),
    };
    onSave(newMatch);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-zinc-800 h-max rounded-lg shadow-lg p-6 w-full max-w-md sm:w-96 border border-yellow-500 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 font-bebas text-center sm:text-left">
          {t("table.match.add.title")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-500">{t("table.match.location")}</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="" disabled>
                {t("table.match.add.select_location")}
              </option>
              {/* Locations */}
              <option value="Heilig Hart Heverlee">Heilig Hart Heverlee</option>
              <option value="Sportschuur Wilsele">Sportschuur Wilsele</option>
              <option value="Sportcomplex Kessel-Lo">Sportcomplex Kessel-Lo</option>
              <option value="Sportoase Philipssite">Sportoase Philipssite</option>
              <option value="Redingenhof Leuven">Redingenhof Leuven</option>
              <option value="Sportcomplex Heverlee">Sportcomplex Heverlee</option>
              <option value="UCLL Heverlee">UCLL Heverlee</option>
              <option value="Wijnpers Leuven">Wijnpers Leuven</option>
            </select>
          </div>
          <div>
            <label className="block text-yellow-500">{t("table.match.date")}</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t("table.match.home")}</label>
            <select
              name="homeTeamName"
              value={formData.homeTeamName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">{t("table.match.add.select_home")}</option>
              {teams
                .filter((team) => team.name !== formData.awayTeamName)
                .map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-yellow-500">{t("table.match.away")}</label>
            <select
              name="awayTeamName"
              value={formData.awayTeamName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">{t("table.match.add.select_away")}</option>
              {teams
                .filter((team) => team.name !== formData.homeTeamName)
                .map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-yellow-500">{t("table.match.add.home_score")}</label>
            <input
              type="number"
              name="homeScore"
              value={formData.homeScore}
              min="0"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t("table.match.add.away_score")}</label>
            <input
              type="number"
              name="awayScore"
              value={formData.awayScore}
              min="0"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-gray-700 font-bold text-white rounded hover:bg-gray-600"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600"
            >
              {t("table.buttons.plan")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMatch;
