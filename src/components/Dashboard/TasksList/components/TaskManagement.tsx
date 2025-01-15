import React, { SetStateAction, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Task, SubtaskDisplayType, InputType, SubtasksType, SelectType } from '../../../../interfaces/TasksInterfaces'
import { UserPreferencesType } from '../../../../store/userPreferencesReducer';

import { addNewTask, updateTask } from '../../../../store/userTasksReducer';

import Button from '../../../Reusable/Button';

const TaskManagement: React.FC<{ taskManagementType: string, setIsTaskManagementOpen: React.Dispatch<SetStateAction<boolean>>, editedTask: Task | null, setEditedTask: (task: Task | null) => void }> = React.memo(({ taskManagementType, setIsTaskManagementOpen, editedTask, setEditedTask }) => {
  const dispatch = useDispatch();

  const userTags = useSelector((state: { userPreferences: UserPreferencesType }) => state.userPreferences.tags)

  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0] // YYYY-MM-DD

  const taskStatusOptions = ['To do', 'In progress', 'Done']
  const taskPriorityOptions = ['Low', 'Medium', 'High']
  const tagOptions = useMemo(() => userTags.map(tag => tag.name), [userTags])

  const [taskData, setTaskData] = useState<Task>(
    editedTask === null
      ? { name: '', description: '', subtasks: [], status: 'To do', dueDate: formattedDate, priority: 'Low', tag: { name: userTags[0].name, backgroundColor: userTags[0].backgroundColor, borderColor: userTags[0].borderColor } }
      : editedTask
  )

  const handleTagChange = (tagName: string) => {
    const selectedTag = userTags.find(tag => tag.name === tagName);
    if (selectedTag) {
      setTaskData({
        ...taskData,
        tag: {
          name: selectedTag.name,
          backgroundColor: selectedTag.backgroundColor,
          borderColor: selectedTag.borderColor,
        },
      });
    }
  };

  const handleTaskButtonAction = () => {
    if (taskManagementType === 'Add') {
      dispatch(addNewTask(taskData))
    } else {
      dispatch(updateTask(taskData))
    }

    setEditedTask(null)
    setIsTaskManagementOpen(false)
  }

  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
      <div onClick={() => { setIsTaskManagementOpen(false); setEditedTask(null) }} className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"> </div>
      <div className="relative flex flex-col gap-6 bg-white rounded-2xl shadow-2xl w-8/12 mx-4 p-6 z-20">
        <div className='flex flex-row justify-between items-center'>
          <h2 className="text-3xl text-dark font-heading font-bold"> {taskManagementType} </h2>
          <svg  className='h-8 w-8 cursor-pointer fill-dark hover:fill-red-700 transition-colors duration-200' onClick={() => { setIsTaskManagementOpen(false); setEditedTask(null) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" /> </svg>
        </div>
        <div className='flex flex-col gap-5 w-full'>
          <Input id='Name' type='text' placeholder='Name' value={taskData.name} onChange={(value) => setTaskData({ ...taskData, name: value })} readOnly={taskManagementType === 'Edit' ? true : false}/>
          <Input id='Description' type='text' placeholder='Description' value={taskData.description} onChange={(value) => setTaskData({ ...taskData, description: value })} readOnly={false}/>
          <Subtasks id='Subtasks' value={taskData.subtasks || []} onUpdate={(updatedSubtasks) => setTaskData({ ...taskData, subtasks: updatedSubtasks })} />
          <Select id='Status' options={taskStatusOptions} value={taskData.status} onChange={(value) => setTaskData({...taskData, status: value })} />
          <Input id='Due date' type='date' placeholder='Due date:' value={taskData.dueDate || ''} onChange={(value) => setTaskData({...taskData, dueDate: value})} readOnly={false}/>
          <Select id='Priority' options={taskPriorityOptions} value={taskData.priority} onChange={(value) => setTaskData({...taskData, priority: value })} />
          <Select id='Tag' options={tagOptions} value={taskData.tag.name} onChange={(value) => handleTagChange(value)} />
          <Button text={taskManagementType === 'Add' ? 'Add' : 'Save changes'} onClick={() => handleTaskButtonAction()} />
        </div>
      </div>
    </div>
  )
})

const Input: React.FC<InputType> = React.memo(({ id, type, placeholder, value, onChange, readOnly }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={readOnly}
      required
      className={`w-full border border-gray-300 rounded-lg p-2 ${readOnly ? 'cursor-not-allowed bg-gray-100' : 'text-dark outline-none focus:border-blue-400 transition-colors duration-200'}`}
    />
  )
})

const Select: React.FC<SelectType> = React.memo(({ id, options, value, onChange }) => {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} required className="w-full cursor-pointer border border-gray-300 text-dark rounded-lg p-2 focus:outline-none focus:border-blue-400 transition-colors duration-200">
      {options.map((option) => <option key={option}> {option} </option>)}
    </select>
  )
})

const Subtasks: React.FC<SubtasksType> = React.memo(({ id, value, onUpdate }) => {
  const [newSubtask, setNewSubtask] = useState<string>('')

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      onUpdate([...value, { name: newSubtask, completed: false }]);
      setNewSubtask('');
    }
  }

  const handleRemoveSubtask = (name: string) => {
    const updatedSubtasks = value.filter(subtask => subtask.name !== name);
    onUpdate(updatedSubtasks);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSubtask();
    }
  }

  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='flex flex-row items-center gap-3'>
        <input
          id={id}
          type='text'
          placeholder='Create a subtask'
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border border-gray-300 text-dark rounded-lg p-2 focus:outline-none focus:border-blue-400 transition-colors duration-200"
        />
        <svg onClick={handleAddSubtask} className='h-6 w-6 fill-dark cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"> <path d="M17 7v3h-5v5H9v-5H4V7h5V2h3v5z" /> </svg>
      </div>
      {value.map((subtask, index) => (<Subtask key={index} name={subtask.name} completed={subtask.completed} value={value} onUpdate={onUpdate} handleRemoveSubtask={handleRemoveSubtask} />))}
    </div>
  )
})

const Subtask: React.FC<SubtaskDisplayType> = React.memo(({ name, completed, value, onUpdate, handleRemoveSubtask }) => {
  const [subtaskName, setSubtaskName] = useState(name)

  const handleSubtaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtaskName(e.target.value)
    onUpdate(value.map(subtask => subtask.name === name ? { ...subtask, name: e.target.value } : subtask))
  }

  return (
    <div className='flex flex-row justify-between items-center w-full hover:bg-slate-200 cursor-default'>
      <div className='flex flex-row items-center gap-2 ml-4'>
        <input
          type='checkbox'
          defaultChecked={completed}
          onChange={() => onUpdate(value.map(subtask => subtask.name === subtaskName ? { ...subtask, completed: !completed } : subtask))}
          className='h-4 w-4 cursor-pointer text-dark'
        />
        <input className='bg-transparent outline-none cursor-pointer hover:underline w-full' value={subtaskName} onChange={(e) => handleSubtaskNameChange(e)} />
      </div>
      <svg className='h-5 w-5 stroke-dark fill-none cursor-pointer' onClick={() => handleRemoveSubtask(name)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75" /> </svg>
    </div>
  )
})

export default TaskManagement