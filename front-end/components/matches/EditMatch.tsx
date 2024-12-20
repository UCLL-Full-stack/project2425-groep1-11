import React, { useState, useEffect } from "react";
import { Match } from "@/types";
import { useTranslation } from "next-i18next";

interface EditMatchProps {
  match: Match;
  onSave: (updatedMatch: Match) => void;
  onClose: () => void;
  onCancel: () => void;
}

const EditMatch: React.FC<EditMatchProps> = ({ match, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    location: match.location,
    date: match.date ? new Date(match.date).toISOString().slice(0, -1) : "", // Safely handle the date
    homeTeamName: match.homeTeamName,
    awayTeamName: match.awayTeamName,
    homeScore: match.homeScore?.toString() || "",
    awayScore: match.awayScore?.toString() || "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
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
    onSave({
      ...match,
      ...formData,
      homeScore: formData.homeScore !== "" ? Number(formData.homeScore) : null,
      awayScore: formData.awayScore !== "" ? Number(formData.awayScore) : null,
      date: new Date(formData.date), // Convert back to Date object
    });
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
        className={`bg-zinc-800 rounded-lg shadow-lg p-6 w-96 border border-yellow-500 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 font-bebas">{t('table.match.edit')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-500">{t('table.match.location')}</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t('table.match.date')}</label>
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
            <label className="block text-yellow-500">{t('table.match.home')}</label>
            <input
              type="text"
              name="homeTeamName"
              value={formData.homeTeamName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t('table.match.away')}</label>
            <input
              type="text"
              name="awayTeamName"
              value={formData.awayTeamName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">{t('table.match.home_score')}</label>
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
            <label className="block text-yellow-500">{t('table.match.away_score')}</label>
            <input
              type="number"
              name="awayScore"
              value={formData.awayScore}
              min="0"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

export default EditMatch;
