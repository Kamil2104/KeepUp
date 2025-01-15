import React, { SetStateAction, useState } from 'react'

import { useDispatch } from 'react-redux';

import { removeSubtask, updateSubtask } from '../../../../store/userTasksReducer';

import { Task } from '../../../../interfaces/TasksInterfaces'

const TaskCard: React.FC<{ task: Task, borderColor: string, handleTaskManagementOpening: (type: string) => void, setEditedTask: (task: Task) => void }> = React.memo(({ task, borderColor, handleTaskManagementOpening, setEditedTask }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className={`flex flex-col justify-start items-start w-full h-auto bg-slate-50 last:rounded-bl-md last:rounded-br-md p-4 border-l-4 ${borderColor}`}>
        <div className='flex flex-row justify-between items-center w-full border-b-2 border-slate-200 pb-4'>
          <HeadingAndStatus text={task.name} status={task.status} />
          <div className='flex flex-row justify-start gap-3'>
            {task.dueDate && <DueDateIcon dueDate={task.dueDate} />}
            <PriorityIcon priority={task.priority} />
            <EditIcon task={task} setEditedTask={setEditedTask} handleTaskManagementOpening={handleTaskManagementOpening} />
          </div>
        </div>

        <p onClick={() => setIsPopupOpen(true)} className='flex flex-row justify-center items-center gap-1 font-body mt-4 cursor-pointer hover:underline text-dark hover:text-brand-40'> Show more </p>
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
      <h3 className='font-heading font-medium text-dark text-xl leading-none'> {text} </h3>
      <p className={`font-body text-dark px-3 py-0.5 rounded-xl ${statusBackgroundColor}`}> {status} </p>
    </div>
  )
})

const DueDateIcon: React.FC<{ dueDate: string }> = React.memo(({ dueDate }) => {
  const [isHovered, setIsHovered] = useState(false);

  const convertISOtoDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <svg className='h-5 w-5 fill-dark cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z" /> </svg>
      {isHovered && (
        <div className="font-body absolute left-1/2 -translate-x-1/2 top-8 bg-dark text-white text-sm p-2 rounded shadow">
          {convertISOtoDate(dueDate)}
        </div>
      )}
    </div>
  )
})

const PriorityIcon: React.FC<{ priority: string }> = React.memo(({ priority }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <svg className='h-5 w-5 stroke-dark cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.576 1.424a.6.6 0 0 1 .848 0l10.152 10.152a.6.6 0 0 1 0 .848L12.424 22.576a.6.6 0 0 1-.848 0L1.424 12.424a.6.6 0 0 1 0-.848zM12 8v4m0 4.01l.01-.011" /> </svg>
      {isHovered && (
        <div className="font-body absolute left-1/2 -translate-x-1/2 top-8 bg-dark text-white text-sm p-2 rounded shadow">
          {priority}
        </div>
      )}
    </div>
  )
})

const EditIcon: React.FC<{ task: Task, setEditedTask: (task: Task) => void, handleTaskManagementOpening: (type: string) => void }> = React.memo(({ task, setEditedTask, handleTaskManagementOpening }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <svg onClick={() => { handleTaskManagementOpening('Edit'); setEditedTask(task) }} className='h-5 w-5 stroke-dark fill-none cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7"> <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /> <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /> </g> </svg>      
      {isHovered && (
        <div  className="font-body absolute left-1/2 -translate-x-1/2 top-8 bg-dark text-white text-sm p-2 rounded shadow">
          Edit
        </div>
      )}
    </div>
  )
})

const Subtask: React.FC<{ taskName: string, subtaskName: string, completed: boolean }> = React.memo(({ taskName, subtaskName, completed }) => {
  const dispatch = useDispatch()

  const [isChecked, setIsChecked] = useState(completed);
  const [newSubtaskName, setNewSubtaskName] = useState(subtaskName)

  const handleSubtaskDeletion = (taskNameParam: string, subtaskNameParam: string) => dispatch(removeSubtask({ taskName: taskNameParam, subtaskName: subtaskNameParam }))

  const handleSubtaskValueUpdate = (completedParam: boolean, nameParam: string) => {
    dispatch(updateSubtask(
      { taskName: taskName,
        subtaskName: subtaskName,
        updatedSubtask: {name: nameParam, completed: completedParam}
      }))
  };

  const handleCompletitionValueChange = () => {
    setIsChecked(!isChecked)
    handleSubtaskValueUpdate(!isChecked, newSubtaskName);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubtaskValueUpdate(isChecked, newSubtaskName)
    }
  }

  return (
    <div className='flex flex-row justify-between items-center cursor-default hover:bg-slate-200'>
      <p className='flex flex-row items-center gap-1 w-3/4 text-lg text-dark'>
      <input
          type='checkbox'
          onClick={() => { handleCompletitionValueChange()}}
          defaultChecked={completed}
          className='h-4 w-4 cursor-pointer text-dark'
        />
        <input className='bg-transparent outline-none cursor-pointer hover:underline w-full' value={newSubtaskName} onChange={(e) => setNewSubtaskName(e.target.value)} onBlur={() => handleSubtaskValueUpdate(isChecked, newSubtaskName)} onKeyDown={handleKeyDown} />
      </p>
      <svg className='h-5 w-5 stroke-dark fill-none cursor-pointer' onClick={() => handleSubtaskDeletion(taskName, subtaskName)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75" /> </svg>
    </div>
  )
})

const TaskCardPopup: React.FC<{ task: Task, setIsPopupOpen: React.Dispatch<SetStateAction<boolean>> }> = React.memo(({ task, setIsPopupOpen }) => {
  return (
    <div className=" fixed inset-0 flex justify-center items-center z-10">
    <div onClick={() => setIsPopupOpen(false)} className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"> </div>
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 z-20">
      <div className='flex flex-row justify-between items-center mb-6'>
        <h2 className="text-3xl text-dark font-heading font-bold"> {task.name} </h2>
        <svg  className='h-8 w-8 cursor-pointer fill-dark hover:fill-red-700 transition-colors duration-200' onClick={() => setIsPopupOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" /> </svg>
      </div>

      <div className='space-y-4'>
        <p className='text-lg text-dark font-body'> <span className="font-semibold"> Description: </span>{task.description} </p>
        {task.dueDate && <p className='text-lg text-dark font-body'> <span className="font-semibold">Due date: </span>{task.dueDate} </p>}
        <p className='text-lg text-dark font-body'> <span className="font-semibold"> Priority: </span> {task.priority} </p>
        {task.subtasks && (
          <>
            <p className='text-lg text-dark font-semibold'> Subtasks: </p>
            <div className='space-y-2'>
              {task.subtasks.map((subtask) => (
                <Subtask key={subtask.name} taskName={task.name} subtaskName={subtask.name} completed={subtask.completed} />
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