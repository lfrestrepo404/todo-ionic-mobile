import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonInput, IonItem, IonLabel, IonButton, 
  IonList, IonIcon, ModalController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonInput, 
    IonItem, IonLabel, IonButton, IonList, IonIcon
  ]
})
export class CategoriesModalComponent implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';

  constructor(
    private categoryService: CategoryService,
    private modalCtrl: ModalController
  ) {
    addIcons({ pencilOutline, trashOutline });
  }

  ngOnInit() {
    this.refreshCategories();
  }

  refreshCategories() {
    this.categories = this.categoryService.getCategories();
  }

  add() {
    if (this.newCategoryName.trim()) {
      this.categoryService.addCategory(this.newCategoryName.trim());
      this.newCategoryName = '';
      this.refreshCategories();
    }
  }

  update(category: Category) {
    if (category.name.trim()) {
      this.categoryService.updateCategory(category.id, category.name.trim());
    }
  }

  delete(id: string) {
    this.categoryService.deleteCategory(id);
    this.refreshCategories();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}