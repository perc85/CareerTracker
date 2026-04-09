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
      className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 cursor-pointer relative group"
    >
      <button
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
               rounded-lg bg-white/90 shadow-md
               text-red-500 hover:bg-red-500 hover:text-white
               transition-all duration-200 z-10
               opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(id);
        }}
      >
        <i className="fas fa-trash text-sm"></i>
      </button>

      <div className="card-body">
        <div>
          <h2 className="card-title text-lg">{title}</h2>
          <p className="text-sm opacity-60">{name}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="badge badge-outline">{status}</span>
          <span className="badge badge-outline">{type}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="opacity-60">Location</p>
            <p>{location}</p>
          </div>

          <div>
            <p className="opacity-60">Salary</p>
            <p>{salary}</p>
          </div>

          <div>
            <p className="opacity-60">Applied</p>
            <p>{date}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="opacity-60 text-sm">Notes</p>
          <p className="text-sm mt-1 line-clamp-2">{notes}</p>
        </div>
      </div>
    </div>
  );
}
