import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.page.html',
  styleUrls: ['./despacho.page.scss'],
})
export class DespachoPage implements OnInit {
  public alertButtons = [
    {
      text: 'No', // Texto del botón de cancelar
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si', // Texto del botón de confirmar
      cssClass: 'alert-button-confirm',
    },
  ];

  productos: { nombre: string; pallet: string; sku: string }[] = [
    { nombre: 'Aceite', pallet: '9995', sku: '567891' },
    { nombre: 'Fideo', pallet: '9996', sku: '567892' },
    { nombre: 'Harina', pallet: '9997', sku: '567893' },
  ];
  nuevoProducto = { nombre: '', pallet: '', sku: '' };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async despacharProducto() {
    if (this.nuevoProducto.nombre && this.nuevoProducto.pallet && this.nuevoProducto.sku) {
      this.productos = this.productos.filter(
        (producto) =>
          producto.nombre !== this.nuevoProducto.nombre ||
          producto.pallet !== this.nuevoProducto.pallet ||
          producto.sku !== this.nuevoProducto.sku
      );
      this.nuevoProducto = { nombre: '', pallet: '', sku: '' }; // Limpiar formulario
    }
  }
}
