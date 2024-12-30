// Tasks
export interface Task {
    id: number;
    name: string;
    description: string;
    subtasks?: Subtask[];
    status: string;
    dueDate?: string;
    priority: string;
    tag: Tag;
}

interface Subtask {
    name: string;
    completed: boolean;
}

interface Tag {
    name: string;
    backgroundColor: string;
    borderColor: string;
}

// Tasks preferences
export interface UserPreferencesTasksState {
    filterType: string;
    sortType: [string, string];
}