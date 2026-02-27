import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonInput, IonItem, IonLabel, IonButton, ModalController 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonInput, IonItem, IonLabel, IonButton]
})
export class AddTaskModalComponent {
  taskTitle: string = '';

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  create() {
    if (this.taskTitle.trim()) {
      // Devolvemos el título al componente Home
      this.modalCtrl.dismiss({ title: this.taskTitle });
    }
  }
}