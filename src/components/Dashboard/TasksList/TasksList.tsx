import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { Task, UserPreferencesTasksState } from '../../../interfaces/TasksInterfaces';

import TaskManagement from './components/TaskManagement';
import TasksActions from './components/TasksActions';
import TaskCard from './components/TaskCard';

import { filterAndSortTasks } from './utils/filterAndSortTasks';
import { groupTasksByTag } from './utils/groupTasksByTag';

const TasksList: React.FC = React.memo(() => {
  const [isTaskManagementOpen, setIsTaskManagementOpen] = useState<boolean>(false);
  const [taskManagementType, setTaskManagementType] = useState<string>('');

  const handleTaskManagementOpening = (type: string) => {
    setIsTaskManagementOpen(true)
    setTaskManagementType(type)
  }

  return (
    <div className="flex flex-col justify-start items-center gap-8 w-full h-full mt-2">
      <TasksActions handleTaskManagementOpening={handleTaskManagementOpening} />
      <Tasks />
      {isTaskManagementOpen && <TaskManagement taskManagementType={taskManagementType} setIsTaskManagementOpen={setIsTaskManagementOpen} />}
    </div>
  );
});

const Tasks: React.FC = React.memo(() => {
  const { filterType, sortType } = useSelector((state: { userPreferences: UserPreferencesTasksState }) => state.userPreferences);

  const userTasks: Task[] = useSelector((state: { userTasks: Task[] }) => state.userTasks);

  const filteredAndSortedTasks = filterAndSortTasks(userTasks, filterType, sortType);
  const displayedTasks = groupTasksByTag(filteredAndSortedTasks);

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

export default TasksList;
