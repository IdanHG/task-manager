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

    getAll
}