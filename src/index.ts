import { TaskService } from './services/taskService';
import { TaskStatus } from './types/task';

// Example usage
const taskService = new TaskService();

// Create tasks
const task1 = taskService.createTask(
    "Learn TypeScript",
    "Complete TypeScript course and build a project"
);

const task2 = taskService.createTask(
    "Learn Node.js",
    "Complete Node.js fundamentals and build a server"
);

// Update task
taskService.updateTask(task1.id, { status: TaskStatus.IN_PROGRESS });

// Get all tasks
console.log("All tasks:", taskService.getAllTasks());

// Get specific task
console.log("Task 1:", taskService.getTaskById(task1.id));

// Delete task
taskService.deleteTask(task2.id);