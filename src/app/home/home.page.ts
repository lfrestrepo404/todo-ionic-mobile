import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskModalComponent } from '../features/add-task-modal/add-task-modal.component';
import { CategoriesModalComponent } from '../features/categories-modal/categories-modal.component';

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
  IonSelect,
  IonSelectOption,
  ModalController
} from '@ionic/angular/standalone';


import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  ellipsisVertical,
  add,
  trashOutline,
  radioButtonOffOutline,
  checkmarkCircle,
  filterOutline,
  gridOutline 
} from 'ionicons/icons';

import { TaskService } from '../core/services/task.service';
import { Task } from '../core/models/task.model';

import { CategoryService } from '../core/services/category.service';

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
    IonSelect,       
    IonSelectOption,  
    IonBadge
  ],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  selectedFilterCategory: string = 'all';
  constructor(
    private taskService: TaskService,
    public categoryService: CategoryService,
    private modalCtrl: ModalController
  ) {

    addIcons({
      'checkmark-circle-outline': checkmarkCircleOutline,
      'ellipsis-vertical': ellipsisVertical,
      'add': add,
      'trash-outline': trashOutline,
      'radio-button-off-outline': radioButtonOffOutline,
      'checkmark-circle': checkmarkCircle,
      'filter-outline': filterOutline,
      'grid-outline': gridOutline
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    let rawTasks = this.taskService.getTasks();
    if (this.selectedFilterCategory && this.selectedFilterCategory !== 'all') {
      rawTasks = rawTasks.filter(t => t.categoryId === this.selectedFilterCategory);
    }
    this.tasks = this.sortTasks(rawTasks);
  }

  private sortTasks(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {

      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      return 0;
    });
  }

  // Cambiamos addTask para que sea activado por el FAB button 
  async openNewTaskModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 0.9],
      cssClass: 'custom-modal'
    });

    await modal.present();

    // Escuchamos la respuesta del modal
    const { data } = await modal.onWillDismiss();
    if (data && data.title) {
      this.taskService.addTask(data.title, data.categoryId);
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


  async openCategoriesModal() {
    const modal = await this.modalCtrl.create({
      component: CategoriesModalComponent,
      initialBreakpoint: 0.7,
      breakpoints: [0, 0.7, 0.9],
      cssClass: 'custom-modal'
    });

    await modal.present();


    await modal.onWillDismiss();
    this.loadTasks();
  }

  getCategoryName(categoryId?: string): string {
    if (!categoryId) return '';
    const categories = this.categoryService.getCategories();
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }


}

