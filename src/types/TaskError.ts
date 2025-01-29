export class TaskError extends Error {
    constructor (
        msg: string,
        error: "TASK_NOT_FOUND" | "INVALID_TASK_DATA" | "INVALID_UPDATE") {
        super(msg);
        this.name = "Error";
    }
}