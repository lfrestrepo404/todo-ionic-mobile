import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

/*
    Servicio encargado de gestionar la persistencia de las tareas mediante LocalStorage
    Creo métodos para obtnener, guardar, agregar eliminar y actualizar el estado de las Tasks
*/

@Injectable({
    providedIn: 'root',
})

export class TaskService {
    private STORAGE_KEY = 'tasks';

    //Obtengo el estado actual del localstorage y lo parseo a objetos Task, si no hay nada devuelvo un vacio
    getTasks(): Task[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];

    }
    //Uso el localStorage para que los datos persistan al recargar la page
    saveTasks(tasks: Task[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }

    addTask(title: string, categoryId?: string): void {
        const tasks = this.getTasks();
        const newTask: Task = {
            id: crypto.randomUUID(), //Genero un codigo id unico seguro
            title,
            completed: false,
            createdAt: Date.now(),
            categoryId: categoryId || '' 
        }
        tasks.push(newTask);
        this.saveTasks(tasks);

    }

    deleteTask(id: string): void {
        //uso filter para mantener la inmutabilidad del array originl y eliminar la tarea con el id encontrado
        const tasks = this.getTasks().filter(task => task.id !== id);
        this.saveTasks(tasks);
    }

    toggleComplete(id: string): void {
        //LOcalizo y actualizo el estado de la Task 
        const tasks = this.getTasks();
        for (let task of tasks) {
            if (task.id === id) {
                task.completed = !task.completed;
                break;
            }
        }
        this.saveTasks(tasks);
    }
}