import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor() {
  }

  async ngOnInit() {
    await this.initializeApp();
  }
  async initializeApp() {
    if (Capacitor.isNativePlatform()) {
      try {
        // 1. Ponemos el fondo de la barra en BLANCO
        await StatusBar.setBackgroundColor({ color: '#FFFFFF' });

        // 2. Style.Light pone los iconos (hora/batería) en color OSCURO
        // (Nota: Style.Dark los pone blancos, por eso se perdían en tu fondo azul)
        await StatusBar.setStyle({ style: Style.Light });

      } catch (error) {
        console.error('Error con StatusBar:', error);
      }
    }
  }
}
