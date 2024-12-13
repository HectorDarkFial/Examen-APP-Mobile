import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MiModalComponent } from 'src/app/components/mi-modal/mi-modal.component';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
    },
  ];

  // Lista de productos dinámicos
  productos: { nombre: string; pallet: string; sku: string }[] = [
    { nombre: 'Fideo', pallet: '9995', sku: '567891' },
    { nombre: 'Aceite', pallet: '9995', sku: '567891' },
    { nombre: 'Harina', pallet: '9995', sku: '567891' },
    { nombre: 'Arroz', pallet: '9995', sku: '567891' },
  ];

  // Modelo para el nuevo producto que se agregará
  nuevoProducto = { nombre: '', pallet: '', sku: '' };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  // Método para abrir el modal
  async openModal() {
    const modal = await this.modalController.create({
      component: MiModalComponent,
    });
    return await modal.present();
  }

  // Método para agregar un nuevo producto a la lista
  ingresarProducto() {
    if (this.nuevoProducto.nombre && this.nuevoProducto.pallet && this.nuevoProducto.sku) {
      this.productos.push({ ...this.nuevoProducto });
      this.nuevoProducto = { nombre: '', pallet: '', sku: '' }; // Limpiar campos
    }
  }
}
