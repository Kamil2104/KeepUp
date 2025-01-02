import React from 'react'

const Button: React.FC<{ text: string, onClick: () => void }> = React.memo(({text, onClick}) => {
  return (
    <button onClick={onClick} className='h-11 min-w-36 font-heading text-white font-semibold text-lg bg-brand-40 rounded-lg cursor: pointer hover:bg-brand-30 transition-all duration-200 ease-linear px-2'> {text} </button>
  )
})

export default Button