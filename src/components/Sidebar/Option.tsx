import React from "react";

import { SidebarOption } from "../../interfaces/SidebarInterfaces";

const Option: React.FC<SidebarOption> = React.memo(({ icon, name, isActive, onClick }) => {
  return (
    <div onClick={onClick} className={`flex flex-row items-center gap-1.5 px-4 py-2 rounded-lg cursor-pointer ${isActive && name !== 'Log out' ? 'hover:bg-brand-20' : !isActive && name !== 'Log out' ? 'hover:bg-gray-200' : 'hover:bg-error-20'} transition-all duration-200`}>
        {icon}
        <p className={`text-lg font-body font-normal ${isActive ? 'text-brand-50' : ''} ${name === 'Log out' ? 'text-error-50' : ''} transition-all duration-200`}> {name} </p>
    </div>
)})

export default Option;