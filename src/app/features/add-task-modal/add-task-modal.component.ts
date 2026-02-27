import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonButton, 
  ModalController, 
  IonSelect, 
  IonSelectOption,
  IonIcon
} from '@ionic/angular/standalone';

// add-task-modal.component.ts
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { addIcons } from 'ionicons';
import { filterOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonButton,
    IonSelect,
    IonSelectOption,
    IonIcon]
})
export class AddTaskModalComponent implements OnInit {
  taskTitle: string = '';
  selectedCategoryId: string = '';
  categories: Category[] = [];
  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryService 
  ) {}
  //Carga las categorías al iniciar
  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  create() {
    if (this.taskTitle.trim()) {
      // Devolvemos el título al componente Home
      this.modalCtrl.dismiss({
        title: this.taskTitle,
        categoryId: this.selectedCategoryId
      });
    }
  }
}