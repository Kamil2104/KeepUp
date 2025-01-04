import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { useDropdownMenu } from '../hooks/useDropdownMenu';

import { UserPreferencesTasksState } from '../../../../interfaces/TasksInterfaces';

import { setFilterType, setSortType } from '../../../../store/userPreferencesReducer';

import { getFilteredOptions } from '../utils/filterOptions';

import Button from '../../../Reusable/Button';
import DropdownMenu from '../../../Reusable/DropdownMenu';

const TasksActions: React.FC<{ handleTaskManagementOpening: (type: string) => void }> = React.memo(({ handleTaskManagementOpening }) => {
  const dispatch = useDispatch();

  const { filterType, sortType } = useSelector((state: { userPreferences: UserPreferencesTasksState }) => state.userPreferences);

  const updateFilterType = (newFilterType: string) => {
    dispatch(setFilterType(newFilterType));
  }

  const updateSortType = (newSortType: string) => {
    dispatch(setSortType([newSortType, sortType[1]]))
  }

  const toggleSortDirection = () => {
    dispatch(setSortType([sortType[0], sortType[1] === 'Ascending' ? 'Descending' : 'Ascending']))
  }

  return (
    <div className='flex flex-row gap-4 w-11/12'>
        <Button text='Add new task' onClick={() => handleTaskManagementOpening('Add')}/>
        <FilterTypeSetter filterType={filterType} updateFilterType={updateFilterType} />
        <SortTypeSetter sortType={sortType} updateSortType={updateSortType} toggleSortDirection={toggleSortDirection} />
    </div>
  )
})

const FilterTypeSetter: React.FC<{ filterType: string, updateFilterType: (type: string) => void }> = React.memo(({ filterType, updateFilterType }) => {
  const { isMenuOpen, setIsMenuOpen, menuRef } = useDropdownMenu()

  const filterTypeOptions = ['All', 'High priority', 'Medium priority', 'Low priority', 'Work', 'School', 'Home'];
  const filteredFilterTypeOptions =  getFilteredOptions(filterTypeOptions, filterType);

  return (
    <div ref={menuRef} className='relative'>
      <div onClick={() => setIsMenuOpen(!isMenuOpen)}  className='flex flex-row h-11 min-w-36 rounded-lg bg-gray-200 cursor-pointer'>
        <div className='flex justify-center items-center bg-gray-300 rounded-tl-lg rounded-bl-lg w-auto px-3'>
          <svg className='h-6 w-6 stroke-black fill-none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 5.6c0-.56 0-.84-.11-1.054a1 1 0 0 0-.436-.437C19.24 4 18.96 4 18.4 4H5.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C4 4.76 4 5.04 4 5.6v.737c0 .245 0 .367.028.482a1 1 0 0 0 .12.29c.061.1.148.187.32.36l5.063 5.062c.173.173.26.26.321.36q.083.136.12.29c.028.114.028.235.028.474v4.756c0 .857 0 1.286.18 1.544a1 1 0 0 0 .674.416c.311.046.695-.145 1.461-.529l.8-.4c.322-.16.482-.24.599-.36a1 1 0 0 0 .231-.374c.055-.158.055-.338.055-.697v-4.348c0-.245 0-.367.028-.482a1 1 0 0 1 .12-.29c.06-.1.147-.186.317-.356l.004-.004l5.063-5.062c.172-.173.258-.26.32-.36q.083-.136.12-.29C20 6.706 20 6.584 20 6.345z" /> </svg>
        </div>
        <div className='w-full px-6'>
          <p className='flex justify-center items-center h-full w-full text-lg font-medium font-heading'> {filterType} </p>
        </div>
      </div>

      {isMenuOpen && (
        <DropdownMenu options={filteredFilterTypeOptions} setIsMenuOpen={setIsMenuOpen} updateFunction={updateFilterType} />
      )}
    </div>
  )
})

const SortTypeSetter: React.FC<{ sortType: [string, string], updateSortType: (type: string) => void, toggleSortDirection: () => void }> = React.memo(({ sortType, updateSortType, toggleSortDirection }) => {
  const { isMenuOpen, setIsMenuOpen, menuRef } = useDropdownMenu()

  const sortTypeOptions = ['Category', 'Due Date', 'Priority'];
  const filteredSortTypeOptions = getFilteredOptions(sortTypeOptions, sortType[0]);

  return (
    <div className='relative' ref={menuRef}>
      <div className='flex flex-row h-11 min-w-36 rounded-lg bg-gray-200 cursor-pointer'>
        <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='flex justify-center items-center bg-gray-300 rounded-tl-lg rounded-bl-lg w-auto px-3'>
          <svg className='h-6 w-6 fill-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M3 18v-2h6v2zm0-5v-2h12v2zm0-5V6h18v2z" /> </svg>
        </div>
        <div onClick={() => { setIsMenuOpen(!isMenuOpen) }} className='flex flex-col justify-center items-start w-auto max-h-11 px-6'>
          <p className='text-lg font-medium font-heading'>{sortType[0]}</p>
        </div>
        <div onClick={toggleSortDirection} className='flex justify-center items-center rounded-tr-lg rounded-br-lg w-auto px-3 border-l-2 border-[#dfdfdf]'>
          <svg className={`h-6 w-6 fill-black ${sortType[1] === "Descending" ? 'rotate-180' : 'rotate-0'}`}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="currentColor" d="m12 4l-.707-.707l.707-.707l.707.707zm1 15a1 1 0 1 1-2 0zM5.293 9.293l6-6l1.414 1.414l-6 6zm7.414-6l6 6l-1.414 1.414l-6-6zM13 4v15h-2V4z" /> </svg>
        </div>
      </div>

      {isMenuOpen && (
        <DropdownMenu options={filteredSortTypeOptions} setIsMenuOpen={setIsMenuOpen} updateFunction={updateSortType} />
      )}
    </div>
  );
});

export default TasksActions