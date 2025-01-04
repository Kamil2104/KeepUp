import React, { useState, SetStateAction } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Task, SubtaskDisplayType, InputType, SubtasksType, SelectType } from '../../../../interfaces/TasksInterfaces'
import { UserPreferencesType } from '../../../../store/userPreferencesReducer';

import { addNewTask } from '../../../../store/userTasksReducer';

import Button from '../../../Reusable/Button';

const TaskManagement: React.FC<{ taskManagementType: string, setIsTaskManagementOpen: React.Dispatch<SetStateAction<boolean>> }> = React.memo(({ taskManagementType, setIsTaskManagementOpen }) => {
  const dispatch = useDispatch();

  const userTags = useSelector((state: { userPreferences: UserPreferencesType }) => state.userPreferences.tags)

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

  const taskStatusOptions = ['To do', 'In progress', 'Done']
  const taskPriorityOptions = ['Low', 'Medium', 'High']
  const tagOptions = userTags.map(tag => tag.name)

  const [newUserTaskData, setNewUserTaskData] = useState<Task>({
    name: '',
    description: '',
    subtasks: [],
    status: 'To do',
    dueDate: formattedDate,
    priority: 'Low',
    tag: { name: '', backgroundColor: '', borderColor: '' }
  })

  const handleTagChange = (tagName: string) => {
    const selectedTag = userTags.find(tag => tag.name === tagName);
    if (selectedTag) {
      setNewUserTaskData({
        ...newUserTaskData,
        tag: {
          name: selectedTag.name,
          backgroundColor: selectedTag.backgroundColor,
          borderColor: selectedTag.borderColor,
        },
      });
    }
  };

  const handleTaskCreation = () => {
    dispatch(addNewTask(newUserTaskData))
    setIsTaskManagementOpen(false)
  }

  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
      <div onClick={() => setIsTaskManagementOpen(false)} className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"> </div>
      <div className="relative flex flex-col gap-6 bg-white rounded-2xl shadow-2xl w-8/12 mx-4 p-6 z-20">
        <div className='flex flex-row justify-between items-center'>
          <h2 className="text-3xl font-heading font-bold"> {taskManagementType} </h2>
          <svg  className='h-8 w-8 cursor-pointer fill-black hover:fill-red-700 transition-colors duration-200' onClick={() => setIsTaskManagementOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" /> </svg>
        </div>
        <div className='flex flex-col gap-5 w-full'>
          <Input id='Name' type='text' placeholder='Name' value={newUserTaskData.name} onChange={(value) => setNewUserTaskData({ ...newUserTaskData, name: value })} />
          <Input id='Description' type='text' placeholder='Description' value={newUserTaskData.description} onChange={(value) => setNewUserTaskData({ ...newUserTaskData, description: value })} />
          <Subtasks id='Subtasks' value={newUserTaskData.subtasks || []} onUpdate={(updatedSubtasks) => setNewUserTaskData({ ...newUserTaskData, subtasks: updatedSubtasks })} />
          <Select id='Status' options={taskStatusOptions} value={newUserTaskData.status} onChange={(value) => setNewUserTaskData({...newUserTaskData, status: value })} />
          <Input id='Due date'  type='date' placeholder='Due date:' value={newUserTaskData.dueDate || ''} onChange={(value) => setNewUserTaskData({...newUserTaskData, dueDate: value})} />
          <Select id='Priority' options={taskPriorityOptions} value={newUserTaskData.priority} onChange={(value) => setNewUserTaskData({...newUserTaskData, priority: value })} />
          <Select id='Tag' options={tagOptions} value={newUserTaskData.tag.name} onChange={(value) => handleTagChange(value)} />
          <Button text='Add' onClick={() => handleTaskCreation()} />
        </div>
      </div>
    </div>
  )
})

const Input: React.FC<InputType> = React.memo(({ id, type, placeholder, value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 transition-colors duration-200"
    />
  )
})

const Select: React.FC<SelectType> = React.memo(({ id, options, value, onChange }) => {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} required className="w-full cursor-pointer border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 transition-colors duration-200">
      {options.map((option) => <option key={option}> {option} </option>)}
    </select>
  )
})

const Subtasks: React.FC<SubtasksType> = React.memo(({ id, value, onUpdate }) => {
  const [newSubtask, setNewSubtask] = useState<string>('')

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      onUpdate([...value, { name: newSubtask, completed: false }])
      setNewSubtask('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSubtask()
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 transition-colors duration-200"
        />
        <svg onClick={handleAddSubtask} className='h-6 w-6 fill-black cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"> <path d="M17 7v3h-5v5H9v-5H4V7h5V2h3v5z" /> </svg>
      </div>
      {value.map((subtask) => (<Subtask key={subtask.name} name={subtask.name} completed={subtask.completed} value={value} onUpdate={onUpdate} />))}
    </div>
  )
})

const Subtask: React.FC<SubtaskDisplayType> = React.memo(({ name, completed, value, onUpdate }) => {
  return (
    <div className='flex flex-row items-center gap-2 ml-4'>
      <input
        type='checkbox'
        onClick={() => onUpdate(value.map(subtask => subtask.name === name ? { ...subtask, completed: !completed } : subtask))}
        checked={completed} className='h-4 w-4 cursor-pointer'
      />
      <p> {name} </p>
    </div>
  )
})

export default TaskManagement