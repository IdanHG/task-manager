import { Task, TaskStatus, Urgency, TaskStats } from "../types/task";
import { v4 as uudiv4 } from 'uuid';
import { TaskError } from "../types/TaskError";

export class TaskService  {
    private tasks: Map<string, Task>;
    
    constructor() {
        this.tasks = new Map<string, Task>;
    }

    createTask(title: string, description: string, urgency: Urgency, due: Date): Task {
        const taskData = { title: title, description: description };
        if (!this.validateTask(taskData)) {
            throw new TaskError(`Invalid task data`, "INVALID_TASK_DATA");
        }

        const newTask: Task = {
            id : uudiv4(),
            title: title,
            description: description,
            status: TaskStatus.TODO,
            urgency: urgency,
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: due
        };

        this.tasks.set(newTask.id, newTask);
        return newTask;
    }

    getAlltasks(): Task[] {
        return Array.from(this.tasks.values());
    }

    getTaskByID(id: string) : Task  {
        const task = this.tasks.get(id);
        if (!task) {
            throw new TaskError(`Task with ID ${id} not found`, "TASK_NOT_FOUND")
        }
        return task;
    }

    updateTask(id: string, updates: Partial<Task>): Task  {
        if (!this.validateTask(updates)) {
            throw new TaskError(`Invalid task data`, "INVALID_UPDATE");
        }
        
        const task = this.getTaskByID(id);
        if (!task) {
            throw new TaskError(`Task with ID ${id} not found`, "TASK_NOT_FOUND")
        }

        const updTask: Task = {
            ...task,
            ...updates,
            id: id,
            updatedAt: new Date()
        };

        this.tasks.set(id, updTask);
        return updTask;
    }

    deleteTask(id: string): Task {
        const task = this.getTaskByID(id); 
        if (!task) {
            throw new TaskError(`Task with ID ${id} not found`, "TASK_NOT_FOUND")
        }
        this.tasks.delete(id);
        return task;
    }

    searchTasks(query: {
        status?: TaskStatus,
        urgency?: Urgency,
        text?: string,
        dueDate?: Date;
    }): Task[] {
        return Array.from(this.tasks.values()).filter((task) => {
            const checkStatus = (!query.status || task.status === query.status);
            const checkUrg = (!query.urgency || task.urgency === query.urgency);
            const checkText = (!query.text || task.title.toLowerCase().includes(query.text.toLowerCase()));
            const checkDate = (!query.dueDate || task.dueDate < query.dueDate) // give all tasks with dueDate before query.dueDate

            return checkStatus && checkUrg && checkText && checkDate;
        });
    }

    getOverDues(): Task[] {
        return Array.from(this.tasks.values()).filter(task => {
            return task.dueDate < this.StartoffDay();
        })
    }

    getStatistics(): TaskStats {
        const tasksArr = this.getAlltasks();
        return {
            total: tasksArr.length,
            byStatus: {
                [TaskStatus.TODO]: tasksArr.filter(task => task.status === TaskStatus.TODO ).length,
                [TaskStatus.IN_PROGRESS]: tasksArr.filter(task =>  task.status === TaskStatus.IN_PROGRESS ).length,
                [TaskStatus.COMPLETED]: tasksArr.filter(task =>  task.status === TaskStatus.COMPLETED ).length
            },
            byUrgency: {
                [Urgency.HIGH]: tasksArr.filter(task =>  task.urgency === Urgency.HIGH ).length,
                [Urgency.MEDIUM]: tasksArr.filter(task => task.urgency === Urgency.MEDIUM ).length,
                [Urgency.LOW]: tasksArr.filter(task => task.urgency === Urgency.LOW ).length,
            },
            overDue: this.getOverDues().length
        };
    }

    private validateTask(task: Partial<Task>): boolean {
        if (task.title && task.title.length < 3) { return false; }
        if (task.description && task.description.length < 10) { return false; }
        if (task.dueDate && task.dueDate < this.StartoffDay()) return false;
        return true;
    }

    private StartoffDay() {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    

}