import { Component, OnInit } from '@angular/core';
import { MiModalComponent } from 'src/app/components/mi-modal/mi-modal.component';
import { ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  items: any; // Lista principal de productos
  searchText: string = ''; // Texto que el usuario escribe en la barra de búsqueda
  allProducts: any[] = [];   // Lista de productos completos (puedes modificar los nombres y los datos)
  filteredProducts: any[] = []; // Lista de productos filtrados según la búsqueda

  constructor(
    private modalController: ModalController,
    private ProductServicesApi: ProductsService
  ) {
    this.filteredProducts = this.allProducts; // Inicialmente mostramos todos los productos
  }

  ngOnInit(): void {
    // Obtener los productos desde el LocalStorage
    const productos = localStorage.getItem('productos');
    if (productos) {
      console.log('Productos desde el LocalStorage');
      this.items = JSON.parse(productos); // Se pasa dentro de un arreglo == ARRAY
    } else {
      this.ProductServicesApi.ApiObtenerProductos().subscribe((productos) => {
        this.items = productos;
        console.log('Productos de la Api');
        // Aqui se esta usando LocalStorage para guardar los productos
        localStorage.setItem('productos', JSON.stringify(this.items));
      });
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: MiModalComponent,
    });

    // Lo que esta haciendo es escuchar el evento cuando se cierra el modal
    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        // Si se agregó un nuevo producto, actualizar la lista
        this.actualizarProductos();
      }
    });

    return await modal.present();
  }

  // Método para actualizar la lista de productos
  private actualizarProductos() {
    this.ProductServicesApi.ApiObtenerProductos().subscribe((productos) => {
      this.items = productos;
      // Actualizar también el localStorage
      localStorage.setItem('productos', JSON.stringify(this.items));
    });
  }

  filterProducts() {
    if (!this.searchText.trim()) {
      this.filteredProducts = this.items; // Si no hay texto en la búsqueda, mostramos todos los productos
    } else {
      // Realizamos la búsqueda usando el servicio
      this.ProductServicesApi.ApiBuscarProductos(this.searchText).subscribe((productos) => {
        this.filteredProducts = productos;
        console.log('Productos encontrados:', productos);
      });
    }
  }

  ordenarProductosPorPrecio(orden: 'asc' | 'desc' | undefined) {
    if (!orden) {
      console.error('Orden no definido, utilizando ascendente por defecto.');
      orden = 'asc'; // Valor predeterminado
    }
  
    this.ProductServicesApi.ApiObtenerProductosOrdenadosPorPrecio(orden).subscribe((productos) => {
      this.filteredProducts = productos;
      console.log(`Productos ordenados por precio (${orden}):`, productos);
    });
  }
  
  
  filtrarPorCategoria(categoria: string | undefined) {
    if (!categoria || categoria === 'all') {
      this.filteredProducts = this.items; // Mostrar todos los productos
    } else {
      this.ProductServicesApi.ApiObtenerProductosPorCategoria(categoria).subscribe((productos) => {
        this.filteredProducts = productos;
        console.log(`Productos en la categoría ${categoria}:`, productos);
      });
    }
  }

  mostrarProductosMejorCalificados() {
    this.ProductServicesApi.ApiObtenerProductosMejorCalificados(4).subscribe((productos) => {
      this.filteredProducts = productos;
      console.log('Productos con calificaciones mayores o iguales a 4:', productos);
    });
  }

  // Método para optimizar rendimiento con *ngFor usando trackBy
  trackById(index: number, item: any): number {
    return item.id;
  }
}
