import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResumeCard({ resume, onDeleteClick }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/resume/${resume.id}`);
  };

  return (
    <div className="h-full w-full px-6" onClick={handleClick}>
      <div className="group relative border rounded-2xl px-6 py-4 cursor-pointer">
        <div className="flex justify-between pb-3">
          <p className="font-semibold text-xs opacity-70">RESUME</p>
          <button
            className="
              absolute top-2 right-2
              p-2 rounded-2xl
              shadow
              text-red-500
              opacity-0 group-hover:opacity-100
              transition-all duration-200
              hover:bg-red-500 hover:text-white
            "
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(resume.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
        <h2 className="font-bold pb-2 truncate">{resume.name}</h2>
        <div className="w-full h-40 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 overflow-hidden relative">
          <iframe
            src={resume.fileUrl}
            title={resume.name || resume.original_filename}
            className="absolute -top-4 -left-2 w-[calc(100%+30px)] h-[calc(100%+30px)] border-0 pointer-events-none"
          />
        </div>
        <p className="text-xs truncate pb-2 pt-2 text-center">{resume.original_filename}</p>
        <p className="text-xs text-center">Click to view full resume</p>
      </div>
    </div>
  );
}
