import React from "react";

interface DropdownMenuProps {
    options: string[];
    setIsMenuOpen: (isOpen: boolean) => void;
    updateFunction: (type: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = React.memo(({ options, setIsMenuOpen, updateFunction }) => {
    return (
      <div className="absolute top-full left-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-10">
      {options.map((option: string) => (
        <div key={option} onClick={() => { setIsMenuOpen(false); updateFunction(option)}} className='flex justify-center items-center h-9 w-full text-md font-medium font-heading hover:bg-gray-200 cursor-pointer first:rounded-t-lg last:rounded-b-lg px-2'>
          {option}
        </div>
      ))}
    </div>
    )
})

export default DropdownMenu;