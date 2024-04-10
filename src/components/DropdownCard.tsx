// * card component which shows indivisual items in dropdown menu when searching in search bar
import { useNavigate } from "react-router-dom";

const DropdownCard = ({ result, closeDropdown }) => {
  const navigate = useNavigate();
  const { id, body, title } = result;
  const goToPost = () => {
    navigate(`/posts/${title}`);
  };
  return (
    <li
      key={id}
      onClick={() => {
        goToPost();
        // closeDropdown(false);
      }}
      className="px-4 py-2 border rounded-md hover:bg-zinc-100 cursor-pointer"
    >
      {body}
    </li>
  );
};

export default DropdownCard;
