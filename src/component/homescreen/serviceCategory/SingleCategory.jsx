import { BASE_URL_IMAGE } from "../../../utils";
import hiring from "../../../assets/Images/ServicePanel/hiring.svg";

const SingleCategory = ({ category, onClick }) => {
  return (
    <div
      className="
        bg-gray-200 
        flex flex-col 
        gap-2.5 
        p-2
        md:p-[10px_12px] 
        hover:bg-[#5bcbec] 
        hover:cursor-pointer 
        transition-transform transition-colors duration-300 ease-in-out 
        justify-evenly 
        md:whitespace-nowrap
        md:w-[170px]
      "
      onClick={() => onClick(category.name)}
      style={{ cursor: "pointer" }}
    >
      <div className="h-5 w-5 sm:h-[38px] sm:w-[38px] m-auto">
        <img
          src={
            category.category_icon
              ? `${BASE_URL_IMAGE}${category.category_icon}`
              : hiring
          }
          alt={category.name}
        />
      </div>
      <div className=" font-medium leading-[20px] tracking-normal text-center text-[var(--text-color)] text-3.5 md:text-[16px] sm:leading-[15px]">
        {category.name}
      </div>
    </div>
  );
};

export default SingleCategory;
