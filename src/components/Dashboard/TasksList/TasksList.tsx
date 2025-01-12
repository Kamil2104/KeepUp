import React, { useState, useMemo, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { Task } from '../../../interfaces/TasksInterfaces';

import TaskManagement from './components/TaskManagement';
import TasksActions from './components/TasksActions';
import TaskCard from './components/TaskCard';

import { filterAndSortTasks } from './utils/filterAndSortTasks';
import { groupTasksByTag } from './utils/groupTasksByTag';
import Button from '../../Reusable/Button';

const TasksList: React.FC = React.memo(() => {
  const userTasks: Task[] = useSelector((state: { userTasks: Task[] }) => state.userTasks);

  const [isTaskManagementOpen, setIsTaskManagementOpen] = useState<boolean>(false);
  const [taskManagementType, setTaskManagementType] = useState<string>('');

  const [filterType, setFilterType] = useState<string>('All')
  const [sortType, setSortType] = useState<[string, string]>(['Category', 'Descending'])

  const handleTaskManagementOpening = useCallback((type: string) => { setIsTaskManagementOpen(true); setTaskManagementType(type) }, [setIsTaskManagementOpen, setTaskManagementType])

  const updateFilterType = useCallback((newFilterType: string) => setFilterType(newFilterType), []);
  const updateSortType = useCallback((newSortType: string) => setSortType([newSortType, sortType[1]]), [sortType]);
  const toggleSortDirection = useCallback(() => setSortType([sortType[0], sortType[1] === 'Ascending' ? 'Descending' : 'Ascending']), [sortType]);

  return (
    <div className="flex flex-col justify-start items-center gap-8 min-w-full mt-2 overflow-y-scroll max-h-full min-h-[90%]">
      {userTasks.length > 0
      ?
        <>
          <TasksActions handleTaskManagementOpening={handleTaskManagementOpening} filterType={filterType} sortType={sortType}  updateFilterType={updateFilterType} updateSortType={updateSortType} toggleSortDirection={toggleSortDirection} />
          <Tasks userTasks={userTasks} filterType={filterType} sortType={sortType} handleTaskManagementOpening={handleTaskManagementOpening}/>
        </>
      : <NoTasksAvailable handleTaskManagementOpening={handleTaskManagementOpening} />
      }
      {isTaskManagementOpen && <TaskManagement taskManagementType={taskManagementType} setIsTaskManagementOpen={setIsTaskManagementOpen} />}
    </div>
  );
});

const Tasks: React.FC<{ userTasks: Task[], filterType: string, sortType: [string, string], handleTaskManagementOpening: (type: string) => void }> = React.memo(({ userTasks, filterType, sortType, handleTaskManagementOpening }) => {
  const filteredAndSortedTasks = useMemo(() => filterAndSortTasks(userTasks, filterType, sortType), [userTasks, filterType, sortType])
  const displayedTasks = useMemo(() => groupTasksByTag(filteredAndSortedTasks), [filteredAndSortedTasks])

  if (filteredAndSortedTasks.length == 0) return <NoTasksAvailable className="-translate-y-8" handleTaskManagementOpening={handleTaskManagementOpening}/>

  return (
    <>
      {Object.entries(displayedTasks).map(([tagName, { tasks, backgroundColor, borderColor }]) => (
        <div key={tagName} className="w-11/12">
          <h2 className={`w-full text-2xl font-heading font-semibold text-black py-2 pl-4 rounded-tl-md rounded-tr-md ${backgroundColor}`}> {tagName} </h2>
          <div className="flex flex-col">
            {tasks.map((task) => (
              <TaskCard key={task.name} task={task} borderColor={borderColor} />
            ))}
          </div>
        </div>
      ))}
    </>
)})

const NoTasksAvailable: React.FC<{ className?: string, handleTaskManagementOpening: (type: string) => void }> = React.memo(({ className, handleTaskManagementOpening }) => {
  return (
    <div className={`flex flex-col justify-center items-center gap-6 h-full w-full ${className ? className : ''}`}>
      <h3 className='text-3xl text-gray-700 font-heading font-medium'> You don't have any unfinished tasks. </h3>
      <Button text='Add new task' onClick={() => handleTaskManagementOpening('Add')} />
    </div>
  )
})

export default TasksList;
