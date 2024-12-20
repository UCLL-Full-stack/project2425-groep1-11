import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

interface DeleteCoachProps {
  coachName: string;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteCoach: React.FC<DeleteCoachProps> = ({
  coachName,
  onDelete,
  onCancel,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {t} = useTranslation('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
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
        <h2 className="text-3xl font-bebas mb-4 text-yellow-500">Delete Coach</h2>
        <p className="text-yellow-500 mb-6">
          {t('coach.fields.delete_confirm')}{" "}
          <strong className="text-red-500">{coachName}</strong>{t('?')}
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 text-white rounded font-bold hover:bg-gray-600"
          >
            {t('cancel')}
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 font-bold text-white rounded hover:bg-red-600"
          >
            {t('delete')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCoach;
