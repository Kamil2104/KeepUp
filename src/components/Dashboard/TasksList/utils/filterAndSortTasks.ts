import { Task } from "../../../../interfaces/TasksInterfaces";

export const filterAndSortTasks = (tasks: Task[], filterType: string, sortType: [string, string]): Task[] => {
    const filteredTasks = filterTasks(tasks, filterType);
    return sortTasks(filteredTasks, sortType);
};

// Function to filter the tasks based on the provided filterType.
const filterTasks = (tasks: Task[], filterType: string): Task[] => {
  if (filterType === 'All') return tasks; // If filterType is 'All', return all tasks.

  // Filter tasks based on priority
  if (filterType === 'High priority') return tasks.filter(task => task.priority === 'High');
  if (filterType === 'Medium priority') return tasks.filter(task => task.priority === 'Medium');
  if (filterType === 'Low priority') return tasks.filter(task => task.priority === 'Low');

  // Filter tasks based on the tag name (other than priority)
  return tasks.filter(task => task.tag.name === filterType);
};

// Function to sort the tasks based on the specified sort criteria (sortBy and order).
const sortTasks = (tasks: Task[], sortType: [string, string]): Task[] => {
  const [sortBy, order] = sortType; // Extract sort criteria (sortBy: field to sort by, order: ascending/descending)

  // Comparison function for sorting tasks
  const compare = (a: number | string, b: number | string) => {
    if (a < b) return order === 'Ascending' ? -1 : 1;  // Return -1 for ascending, 1 for descending
    if (a > b) return order === 'Ascending' ? 1 : -1;
    return 0; // If equal, return 0
  };

  // Create a copy of the tasks array to avoid mutating the original
  const tasksCopy = [...tasks];

  // Sort by category (tag name)
  if (sortBy === 'Category') {
    return tasksCopy.sort((a, b) => compare(a.tag.name, b.tag.name));
  }

  // Sort by due date. Convert date to ISO format for proper comparison
  if (sortBy === 'Due date') {
    return tasksCopy.sort((a, b) => compare(convertDateToISO(a.dueDate || ''), convertDateToISO(b.dueDate || '')));
  }

  // Sort by priority using predefined priority values
  if (sortBy === 'Priority') {
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 }; // Define priority order

    // Sort based on priority using the predefined order
    return tasksCopy.sort((a, b) => compare(
      priorityOrder[a.priority as 'High' | 'Medium' | 'Low'],
      priorityOrder[b.priority as 'High' | 'Medium' | 'Low']
    ));
  }

  // If no matching sort criteria, return tasks as they are
  return tasksCopy;
};

// Function to convert date from DD.MM.YYYY format to YYYY-MM-DD format (ISO 8601)
// This ensures that the date comparison works correctly.
const convertDateToISO = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('.');
  return `${year}-${month}-${day}`;
};
