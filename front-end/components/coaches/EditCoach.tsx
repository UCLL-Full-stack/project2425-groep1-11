import React, { useEffect, useState } from "react";
import { Coach } from "@/types";
import { useTranslation } from "next-i18next";

interface EditCoachProps {
  coach: Coach;
  onSave: (updatedCoach: Coach) => void;
  onClose: () => void;
}

const EditCoach: React.FC<EditCoachProps> = ({ coach, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: coach.name,
    job: coach.job,
    imageUrl: coach.imageUrl || "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const {t} = useTranslation('');

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
      ...coach,
      ...formData,
    });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-zinc-800 rounded-lg shadow-lg p-6 w-96 border border-yellow-500 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 font-bebas">{t('coach.buttons.edit')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-500">{t('coach.fields.name')}</label>
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
            <label className="block text-yellow-500">{t('coach.fields.job')}</label>
            <select
              name="job"
              value={formData.job}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="" disabled>{t('coach.jobs.select')}</option>
              <option value={t('coach.jobs.head_coach')}>{t('coach.jobs.head_coach')}</option>
              <option value={t('coach.jobs.assistant_coach')}>{t('coach.jobs.assistant_coach')}</option>
              <option value={t('coach.goalkeeper_coach')}>{t('coach.jobs.goalkeeper_coach')}</option>
              <option value={t('coach.jobs.fitness_coach')}>{t('coach.jobs.fitness_coach')}</option>
            </select>
          </div>
          <div>
            <label className="block text-yellow-500">{t('coach.fields.image_url')}</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
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

export default EditCoach;
