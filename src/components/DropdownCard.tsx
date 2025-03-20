// DropdownCard.tsx
import { useNavigate } from "react-router-dom";
import { Post } from "../types";

type DropdownCardProps = {
  result: Post;
  closeDropdown: () => void;
};

const DropdownCard: React.FC<DropdownCardProps> = ({
  result,
  closeDropdown,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${result.id}`);
    closeDropdown();
  };

  return (
    <li
      onClick={handleClick}
      className="group p-4 hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
    >
      <div className="flex flex-col space-y-1">
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600">
          {result.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{result.body}</p>
      </div>
    </li>
  );
};

export default DropdownCard;
