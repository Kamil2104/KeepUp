import { Task } from "../../../../interfaces/TasksInterfaces";

export const groupTasksByTag = (filteredAndSortedTasks: Task[]): Record<string, { tasks: Task[], backgroundColor: string, borderColor: string }> => {
  return filteredAndSortedTasks.reduce<Record<string, { tasks: Task[], backgroundColor: string, borderColor: string }>>((acc, task) => {
    const tagName = task.tag.name;

    // Create a new group if it doesn't exist
    if (!acc[tagName]) {
      acc[tagName] = {
        tasks: [],
        backgroundColor: task.tag.backgroundColor,
        borderColor: task.tag.borderColor
      };
    }

    // Adding a task to the appropriate group
    acc[tagName].tasks.push(task);
    return acc;
  }, {});
};

/* HOW groupTasksByTag WORKS:

1. Example of filteredAndSortedTasks:
const tasks = [
  { id: 1, tag: { name: 'Work', backgroundColor: 'bg-blue-500', borderColor: 'border-blue-700' } },
  { id: 2, tag: { name: 'Home', backgroundColor: 'bg-green-500', borderColor: 'border-green-700' } },
  { id: 3, tag: { name: 'Work', backgroundColor: 'bg-blue-500', borderColor: 'border-blue-700' } },
  { id: 4, tag: { name: 'Personal', backgroundColor: 'bg-red-500', borderColor: 'border-red-700' } }
];

2. Using groupTasksByTag function:
const grouped = groupTasksByTag(tasks);
console.log(grouped);

3. The output value of grouped tasks will be:
{
  Work: {
    tasks: [
      { id: 1, tag: { name: 'Work', backgroundColor: 'bg-blue-500', borderColor: 'border-blue-700' } },
      { id: 3, tag: { name: 'Work', backgroundColor: 'bg-blue-500', borderColor: 'border-blue-700' } }
    ],
    backgroundColor: 'bg-blue-500',
    borderColor: 'border-blue-700'
  },
  Home: {
    tasks: [
      { id: 2, tag: { name: 'Home', backgroundColor: 'bg-green-500', borderColor: 'border-green-700' } }
    ],
    backgroundColor: 'bg-green-500',
    borderColor: 'border-green-700'
  },
  Personal: {
    tasks: [
      { id: 4, tag: { name: 'Personal', backgroundColor: 'bg-red-500', borderColor: 'border-red-700' } }
    ],
    backgroundColor: 'bg-red-500',
    borderColor: 'border-red-700'
  }
}

*/