import { Task } from "../../../../interfaces/TasksInterfaces";

// Main function that filters and sorts tasks
export const filterAndSortTasks = (tasks: Task[], filterType: string, sortType: [string, string]): Task[] => {
    const filteredTasks = filterTasks(tasks, filterType); // First filter tasks based on the filterType
    return sortTasks(filteredTasks, sortType); // Then sort the filtered tasks based on the sortType
};

// Function to filter tasks based on the provided filterType
const filterTasks = (tasks: Task[], filterType: string): Task[] => {
  if (filterType === 'All') return tasks; // If the filterType is 'All', return all tasks

  // If filterType is priority, filter tasks by priority
  if (['High priority', 'Medium priority', 'Low priority'].includes(filterType)) {
    return filterByPriority(tasks, filterType);
  }

  return filterByTag(tasks, filterType); // If filterType is a tag, filter tasks by the tag name
};

// Function to filter tasks by priority
const filterByPriority = (tasks: Task[], filterType: string): Task[] => {
  return tasks.filter(task => task.priority === filterType.split(' ')[0]); // Split filterType and match the priority
};

// Function to filter tasks by tag
const filterByTag = (tasks: Task[], filterType: string): Task[] => {
  return tasks.filter(task => task.tag.name === filterType); // Match tasks by tag name
};

// Function to sort tasks based on the provided sortType
const sortTasks = (tasks: Task[], sortType: [string, string]): Task[] => {
  const [sortBy, order] = sortType; // Extract the sorting criteria (sortBy and order)

  const tasksCopy = [...tasks]; // Create a copy of the tasks array to avoid mutating the original

  // Sort by category (tag name)
  if (sortBy === 'Category') {
    return sortByCategory(tasksCopy, order);
  }

  // Sort by due date
  if (sortBy === 'Due date') {
    return sortByDueDate(tasksCopy, order);
  }

  // Sort by priority
  if (sortBy === 'Priority') {
    return sortByPriority(tasksCopy, order);
  }

  return tasksCopy; // If no valid sort criteria is provided, return tasks as they are
};

// Function to sort tasks by category (tag name)
const sortByCategory = (tasks: Task[], order: string): Task[] => {
  return tasks.sort((a, b) => compare(a.tag.name, b.tag.name, order)); // Compare tasks by their tag name
};

// Function to sort tasks by due date
const sortByDueDate = (tasks: Task[], order: string): Task[] => {
  return tasks.sort((a, b) => compare(convertDateToISO(a.dueDate || ''), convertDateToISO(b.dueDate || ''), order)); // Convert dates to ISO format for accurate comparison
};

// Function to sort tasks by priority
const sortByPriority = (tasks: Task[], order: string): Task[] => {
  const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 }; // Define the order of priority

  return tasks.sort((a, b) => compare(
    priorityOrder[a.priority as 'High' | 'Medium' | 'Low'],
    priorityOrder[b.priority as 'High' | 'Medium' | 'Low'],
    order
  )); // Compare tasks by their priority order
};

// Comparison function that compares two values (either numbers or strings) based on the sorting order
const compare = (a: number | string, b: number | string, order: string): number => {
  if (a < b) return order === 'Ascending' ? -1 : 1; // If 'Ascending', return -1 for smaller values, 1 for larger ones
  if (a > b) return order === 'Ascending' ? 1 : -1; // If 'Descending', reverse the comparison
  return 0; // If both are equal, return 0
};

// Function to convert date from DD.MM.YYYY format to ISO format (YYYY-MM-DD)
const convertDateToISO = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('.'); // Split the date string into day, month, and year
  return `${year}-${month}-${day}`; // Return the date in ISO format
};
