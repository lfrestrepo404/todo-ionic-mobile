import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskModalComponent } from '../features/add-task-modal/add-task-modal.component';
// Agregamos IonIcon y ModalController a las importaciones
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToggle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonBadge,
  ModalController
} from '@ionic/angular/standalone';

//  Importamos los iconos específicos que vamos a usar
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  ellipsisVertical,
  add,
  trashOutline,
  radioButtonOffOutline,
  checkmarkCircle,
  filterOutline
} from 'ionicons/icons';

import { TaskService } from '../core/services/task.service';
import { Task } from '../core/models/task.model';

@Component({
  selector: 'app-home',
  styleUrls: ['home.page.scss'],
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonFab,
    IonFabButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonToggle,
    IonIcon,
    IonBadge
  ],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController
  ) {
    // 3. Registramos los iconos para que sean visibles
    addIcons({
      'checkmark-circle-outline': checkmarkCircleOutline,
      'ellipsis-vertical': ellipsisVertical,
      'add': add,
      'trash-outline': trashOutline,
      'radio-button-off-outline': radioButtonOffOutline,
      'checkmark-circle': checkmarkCircle,
      'filter-outline': filterOutline
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  // Cambiamos addTask para que sea activado por el FAB button 
  async openNewTaskModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
      initialBreakpoint: 0.5, // Para que se abra hasta la mitad como en tu imagen
      breakpoints: [0, 0.5, 0.9],
      cssClass: 'custom-modal' // Opcional para retoques extra
    });

    await modal.present();

    // Escuchamos la respuesta del modal
    const { data } = await modal.onWillDismiss();
    if (data && data.title) {
      this.taskService.addTask(data.title); // Usamos tu servicio [cite: 8]
      this.loadTasks();
    }
  }

  toggleTask(id: string): void {
    this.taskService.toggleComplete(id);
    this.loadTasks();
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }
}