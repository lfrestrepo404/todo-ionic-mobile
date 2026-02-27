# To-Do List App - Ionic & Firebase Remote Config

Aplicación de gestión de tareas desarrollada con **Ionic 7+** y **Angular (Standalone Components)**. Se ha integrado **Firebase Remote Config** para la gestión dinámica de funcionalidades críticas desde la nube.

---

## Tecnologías

* Ionic 7+
* Angular (Standalone Components)
* Capacitor
* Firebase Remote Config
* TypeScript
* Android Studio

---

## Arquitectura

La aplicación sigue una arquitectura modular basada en:

* Componentes Standalone de Angular para reducir complejidad estructural.
* Servicios inyectables para centralizar lógica de negocio.
* Separación de entornos (`environment.ts` y `environment.prod.ts`).
* Feature Toggle centralizado mediante Firebase Remote Config.
* Capacitor como puente entre la aplicación web y el contenedor nativo Android.

---

## Cambios Realizados

Se implementó la lógica necesaria para controlar la visibilidad de la función de "Eliminar Tarea" de forma remota:

* **Integración de Firebase SDK**: Configuración de Firebase App y Remote Config mediante proveedores standalone en `main.ts`.
* **Remote Config Service**: Implementación de lógica asíncrona en el ciclo de vida `ngOnInit` para obtener y activar parámetros globales.
* **Control de Feature Toggle**: Creación del parámetro `enable_delete_task` en la consola de Firebase, vinculado a la interfaz mediante la directiva `*ngIf`.
* **Build de Producción**: Configuración de entornos (`environment.ts` y `environment.prod.ts`) para asegurar la consistencia de las credenciales en la APK final.

---

## Cómo Ejecutar la Aplicación

### Requisitos Previos

* Node.js & npm
* Ionic CLI

```bash
npm install -g @ionic/cli
```

* Android Studio (para generar la APK)

---

### Instalación y Ejecución Local

1. Clonar el repositorio.
2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en el navegador:

```bash
ionic serve
```

---

## Generar APK (Android)

1. Realizar el build de producción:

```bash
ionic build --prod
```

2. Sincronizar con Capacitor:

```bash
npx cap sync android
```

3. Abrir en Android Studio:

```bash
npx cap open android
```

4. Generar el APK desde:
   **Build > Build APK(s)**

---

## Descarga de la APK

Puedes descargar la versión de prueba directamente desde el siguiente enlace de Google Drive:

**DESCARGAR:**
[APK AQUÍ](https://drive.google.com/file/d/1uVJlfPL853iZ88kmOUsvpxy96XZAksZZ/view?usp=sharing)

---

## Configuración de Remote Config

El botón de borrado de tareas está condicionado por el parámetro de Firebase:

* **Llave:** `enable_delete_task`
* **Tipo:** Boolean
* **Comportamiento:**
  Si se establece en `false` en la consola de Firebase y se publican los cambios, el botón desaparecerá de la aplicación sin necesidad de una nueva actualización del código.
