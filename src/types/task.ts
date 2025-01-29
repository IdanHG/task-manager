export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    urgency: Urgency;
    createdAt: Date;
    updatedAt: Date;
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