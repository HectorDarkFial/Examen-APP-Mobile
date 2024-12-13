import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

// Interfaz que define la estructura de un Producto
interface Productos {
  id: number;          // Identificador único del producto
  title: string;       // Título o nombre del producto
  price: number;       // Precio del producto
  description: string; // Descripción del producto
  category: string;    // Categoría a la que pertenece
  image: string;       // URL de la imagen del producto
  rating: Rating;      // Objeto con la información de valoración
}

// Interfaz que define la estructura de la valoración de un producto
export interface Rating {
  rate: number;  // Puntuación promedio
  count: number; // Número total de valoraciones del producto
}

@Injectable({
  providedIn: 'root'
})

// Clase de servicio para manejar las operaciones con productos
export class ProductsService {
   // URL privada del API que proporciona los datos de productos
  private url = 'https://fakestoreapi.com/products'
  photos: string [] = [];
  productos: { nombre: string; pallet: string; sku: string; seleccionado: boolean }[] = [];
  
  // Constructor que inyecta el cliente HTTP
  constructor(
    private http: HttpClient
  ) { }

   // Método que obtiene la lista de productos del API
   // Retorna un Observable con un array de Productos
  ApiObtenerProductos():Observable <Productos[]>{
    return this.http.get<Productos[]>(this.url);
  }

  
  // Obtener productos con mejor calificación
  
  ApiObtenerProductosMejorCalificados(umbral: number): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url).pipe(map((productos) => productos.filter((producto) => producto.rating.rate >= umbral))
    );
  }

  
  // Buscar productos por texto en título o descripción
  
  ApiBuscarProductos(termino: string): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url).pipe(
      map((productos) =>productos.filter((producto) => producto.title.toLowerCase().includes(termino.toLowerCase()) 
      ||
      producto.description.toLowerCase().includes(termino.toLowerCase()))
      )
    );
  }

    // Ordenar productos por precio
  
  ApiObtenerProductosOrdenadosPorPrecio(orden: 'asc' | 'desc'): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url).pipe(
      map((productos) =>
        productos.sort((a, b) =>
          orden === 'asc' ? a.price - b.price : b.price - a.price
        )
      )
    );
  }

  
  // Obtener productos más vendido

  ApiObtenerProductosMasVendidos(umbral: number): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url).pipe(
      map((productos) =>
        productos.filter((producto) => producto.rating.count >= umbral)
      )
    );
    
  }
    
  // Filtrar productos por categoría.
  
    ApiObtenerProductosPorCategoria(categoria: string): Observable<Productos[]> {
      const endpoint = `${this.url}/category/${encodeURIComponent(categoria)}`;
      return this.http.get<Productos[]>(endpoint);
    }
}
  

