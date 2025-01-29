export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    urgency: Urgency;
    createdAt: Date;
    updatedAt: Date;
    dueDate: Date;
}

export interface TaskStats {
    total: number,
    byStatus: Record<TaskStatus, number>;
    byUrgency: Record<Urgency, number>
    overDue: number,
}

export enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export enum Urgency {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}