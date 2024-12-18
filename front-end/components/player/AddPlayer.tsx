import React, { useState, useEffect } from "react";
import { Player } from "@/types";

interface AddPlayerProps {
  onSave: (newPlayer: Omit<Player, "id"> & {teamId: number}) => void; // Excludes id
  onClose: () => void;
}

const AddPlayer: React.FC<AddPlayerProps> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    number: "",
    birthdate: "",
    imageUrl: "",
  });

  const [isVisible, setIsVisible] = useState(false);

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
    const newPlayer = {
      ...formData,
      number: Number(formData.number),
      birthdate: new Date(formData.birthdate),
      teamId: 1, // Hardcode in Shitty gewoon
    };
    onSave(newPlayer);
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
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 font-bebas">Add New Player</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-500">Name:</label>
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
            <label className="block text-yellow-500">Position:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="" disabled>
                Select Position
              </option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>
          </div>
          <div>
            <label className="block text-yellow-500">Number:</label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-yellow-500">Birthdate:</label>
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
            <label className="block text-yellow-500">Image URL (optional):</label>
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
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600"
            >
              Add Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;
