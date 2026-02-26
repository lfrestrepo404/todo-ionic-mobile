import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import {IonToggle} from '@ionic/angular/standalone'

import { TaskService } from '../core/services/task.service';
import { Task } from '../core/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonToggle
  ],
})

export class HomePage implements OnInit {

  // inicializamos con un array vacío para evitar errores de renderizado en el template
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {

    const title = this.newTaskTitle.trim();

    if (title.length > 0) {
      this.taskService.addTask(title);
      this.newTaskTitle = '';
      this.loadTasks();
    }
    
  }

  toggleTask(id: string): void {
    this.taskService.toggleComplete(id);
    this.loadTasks();
  }

  deleteTask(id: string): void{
    this.taskService.deleteTask(id);
    this.loadTasks(); 
  }

}