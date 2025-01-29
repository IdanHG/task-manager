import { Task, TaskStatus, Urgency } from "../types/task";
import { v4 as uudiv4} from 'uuid';

export class TaskService  {
    private tasks: Map<string, Task>;
    
    constructor() {
        this.tasks = new Map<string, Task>;
    }

    createTask(title: string, description: string, urgency: Urgency): Task {
        const newTask: Task = {
            id : uudiv4(),
            title: title,
            description: description,
            status: TaskStatus.TODO,
            urgency: urgency,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.tasks.set(newTask.id, newTask);
        return newTask;
    }

    getAlltasks(): Task[] {
        return Array.from(this.tasks.values());
    }

    getTaskByID(id: string) : Task | undefined {
        return this.tasks.get( id );
    }

    updateTask(id: string, updates: Partial<Task>): Task | undefined {
        const task = this.getTaskByID(id);
        if (!task) return undefined;

        const updTask: Task = {
            ...task,
            ...updates,
            id: id,
            updatedAt: new Date()
        };

        this.tasks.set(id, updTask);
        return updTask;
    }

    deleteTask(id: string): Task | undefined {
        const task = this.getTaskByID(id);

        if (this.tasks.delete(id)) return task;
        return undefined;
    }

    

}