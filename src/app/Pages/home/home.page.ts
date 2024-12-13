import { Component } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  photos: string[] = []; // Copia local para sincronización con la vista

  constructor(private photosService: CameraService) {}

  async ngOnInit(): Promise<void> {
    // Cargar las fotos guardadas al inicializar
    this.photos = this.photosService.photos; // Sincronizar la copia local con el servicio
  }

  async takePhoto(): Promise<void> {
    await this.photosService.addNewPhoto(); // Agregar nueva foto
    this.photos = [...this.photosService.photos]; // Forzar la actualización de la vista
    console.log('Foto capturada y añadida a la galería.');
  }
}
