import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {TaskService} from '../core/services/task.service';
import { Task } from '../core/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
   standalone: true,
  imports: [IonicModule, CommonModule],
})

export class HomePage implements OnInit {

  // inicializamos con un array vacío para evitar errores de renderizado en el template
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }
}