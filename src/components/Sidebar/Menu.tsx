import React from 'react'

import { SidebarOption, MenuProps } from '../../interfaces/SidebarInterfaces'

const Menu: React.FC<MenuProps> = React.memo(({ data }) => {
  return (
    <div className='flex flex-col gap-2 h-auto w-full'>
        {data.map((obj: SidebarOption) => (
            <Option
                key={obj.name}
                icon={obj.icon}
                name={obj.name}
                isActive={obj.isActive}
                onClick={obj.onClick}
            />
        ))}
    </div>
  )
})

const Option: React.FC<SidebarOption> = React.memo(({ icon, name, isActive, onClick }) => {
  return (
    <div onClick={onClick} className={`flex flex-row items-center gap-1.5 px-4 py-2 rounded-lg cursor-pointer ${isActive && name !== 'Log out' ? 'hover:bg-brand-20' : !isActive && name !== 'Log out' ? 'hover:bg-gray-200' : 'hover:bg-error-20'} transition-all duration-200`}>
        {icon}
        <p className={`text-lg font-body font-normal text-dark ${isActive ? 'text-brand-50' : ''} ${name === 'Log out' ? 'text-error-50' : ''} transition-all duration-200`}> {name} </p>
    </div>
)})

export default Menu