import React, { SetStateAction, useState } from 'react'

import { Task } from '../../../../interfaces/TasksInterfaces'

const TaskCard: React.FC<{ task: Task, borderColor: string }> = React.memo(({ task, borderColor }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className={`flex flex-col justify-start items-start w-full h-auto bg-slate-50 last:rounded-bl-md last:rounded-br-md p-4 border-l-4 ${borderColor}`}>
        <div className='flex flex-row justify-between items-center w-full border-b-2 border-slate-200 pb-4'>
          <HeadingAndStatus text={task.name} status={task.status} />
          <div className='flex flex-row justify-start gap-3'>
            {task.dueDate && <DueDateIcon dueDate={task.dueDate} />}
            <PriorityIcon priority={task.priority} />
          </div>
        </div>

        <p onClick={() => setIsPopupOpen(true)} className='flex flex-row justify-center items-center gap-1 font-body mt-4 cursor-pointer hover:underline hover:text-brand-40'> Show more </p>
      </div>

      {isPopupOpen && (
        <TaskCardPopup task={task} setIsPopupOpen={setIsPopupOpen} />
      )}
    </>
  );
});

const HeadingAndStatus: React.FC<{ text: string, status: string }> = React.memo(({ text, status }) => {
  const statusBackgroundColor = status === 'To do' ? 'bg-blue-200' : status === 'In progress' ? 'bg-orange-200' : 'bg-green-200'

  return (
    <div className='flex flex-row justify-center items-center gap-5'>
      <h3 className='font-heading font-medium text-xl leading-none'> {text} </h3>
      <p className={`font-body px-3 py-0.5 rounded-xl ${statusBackgroundColor}`}> {status} </p>
    </div>
  )
})

const DueDateIcon: React.FC<{ dueDate: string }> = React.memo(({ dueDate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <svg className='h-5 w-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="currentColor" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z" /> </svg>
      {isHovered && (
        <div className="font-body absolute left-1/2 -translate-x-1/2 top-8 bg-gray-800 text-white text-sm p-2 rounded shadow">
          {dueDate}
        </div>
      )}
    </div>
  )
})

const PriorityIcon: React.FC<{ priority: string }> = React.memo(({ priority }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <svg className='h-5 w-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.576 1.424a.6.6 0 0 1 .848 0l10.152 10.152a.6.6 0 0 1 0 .848L12.424 22.576a.6.6 0 0 1-.848 0L1.424 12.424a.6.6 0 0 1 0-.848zM12 8v4m0 4.01l.01-.011" /> </svg>
      {isHovered && (
        <div className="font-body absolute left-1/2 -translate-x-1/2 top-8 bg-gray-800 text-white text-sm p-2 rounded shadow">
          {priority}
        </div>
      )}
    </div>
  )
})

const Subtask: React.FC<{ name: string, completed: boolean }> = React.memo(({ name, completed }) => {
  const [isChecked, setIsChecked] = useState(completed);

  const icon = isChecked
    ? <svg className='h-5 w-5 fill-brand-40 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M400 48H112a64.07 64.07 0 0 0-64 64v288a64.07 64.07 0 0 0 64 64h288a64.07 64.07 0 0 0 64-64V112a64.07 64.07 0 0 0-64-64m-35.75 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58" /> </svg>
    : <svg className='h-5 w-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M352 176L217.6 336L160 272" /> <rect width="384" height="384" x="64" y="64" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" rx="48" ry="48" /> </svg>

  return (
    <p className='flex flex-row items-center gap-1 text-lg' onClick={() => setIsChecked(!isChecked)}> {icon} {name} </p>
  )
})

const TaskCardPopup: React.FC<{ task: Task, setIsPopupOpen: React.Dispatch<SetStateAction<boolean>> }> = React.memo(({ task, setIsPopupOpen }) => {
  return (
    <div className=" fixed inset-0 flex justify-center items-center z-10">
    <div onClick={() => setIsPopupOpen(false)} className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"> </div>
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 z-20">
      <div className='flex flex-row justify-between items-center mb-6'>
        <h2 className="text-3xl font-heading font-bold"> {task.name} </h2>
        <svg  className='h-8 w-8 cursor-pointer fill-black hover:fill-red-700 transition-colors duration-200' onClick={() => setIsPopupOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" /> </svg>
      </div>

      <div className='space-y-4'>
        <p className='text-lg font-body'> <span className="font-semibold"> Description: </span>{task.description} </p>
        {task.dueDate && <p className='text-lg font-body'> <span className="font-semibold">Due date: </span>{task.dueDate} </p>}
        <p className='text-lg font-body'> <span className="font-semibold"> Priority: </span> {task.priority} </p>
        {task.subtasks && (
          <>
            <p className='text-lg font-semibold'> Subtasks: </p>
            <div className='space-y-2'>
              {task.subtasks.map((subtask) => (
                <Subtask key={subtask.name} name={subtask.name} completed={subtask.completed} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
  )
})

export default TaskCard