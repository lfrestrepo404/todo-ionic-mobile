import {Injectable} from '@angular/core';
import {Task} from '../models/task.model';

@Injectable({
    providedIn: 'root',
})

export class TaskService {
    private STORAGE_KEY = 'tasks';

    getTasks(): Task[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];

    }

    saveTasks(tasks: Task[]):void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
}