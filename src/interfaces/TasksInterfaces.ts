// Tasks
export interface Task {
    name: string;
    description: string;
    subtasks?: SubtaskType[];
    status: string;
    dueDate?: string;
    priority: string;
    tag: TagType;
}

export interface SubtaskType {
    name: string;
    completed: boolean;
}

export interface TagType {
    name: string;
    backgroundColor: string;
    borderColor: string;
}

// Tasks actions
export interface TasksActionsProps {
    handleTaskManagementOpening: (type: string) => void;
    filterType: string;
    sortType: [string, string];
    updateFilterType: (newFilterType: string) => void;
    updateSortType: (newSortType: string) => void;
    toggleSortDirection: () => void;
}

// Tasks management
export interface InputType {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: string) => void;
}

export interface SubtasksType {
    id: string;
    value: SubtaskType[];
    onUpdate: (updatedSubtasks: SubtaskType[]) => void;
}

export interface SubtaskDisplayType extends SubtaskType {
    value: SubtaskType[];
    onUpdate: (updatedSubtasks: SubtaskType[]) => void;
}

export interface SelectType {
    id: string;
    options: string[];
    value: string;
    onChange: (e: string) => void;
}