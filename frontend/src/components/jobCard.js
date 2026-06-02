import { useNavigate } from "react-router-dom";

export default function JobCard({
  id,
  name,
  title,
  date,
  type,
  location,
  status,
  salary,
  notes,
  onDeleteClick,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/jobdetail/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative group cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <button
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-red-500 opacity-0 shadow-md transition-all duration-200 hover:bg-red-500 hover:text-white group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(id);
        }}
      >
        <i className="fas fa-trash text-sm"></i>
      </button>

      <div className="p-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{name}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700">
            {status}
          </span>

          <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700">
            {type}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Location</p>
            <p className="font-medium text-gray-900">{location}</p>
          </div>

          <div>
            <p className="text-gray-500">Salary</p>
            <p className="font-medium text-gray-900">{salary}</p>
          </div>

          <div>
            <p className="text-gray-500">Applied</p>
            <p className="font-medium text-gray-900">{date}</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm text-gray-500">Notes</p>
          <p className="mt-1 line-clamp-2 text-sm text-gray-800">
            {notes}
          </p>
        </div>
      </div>
    </div>
  );
}