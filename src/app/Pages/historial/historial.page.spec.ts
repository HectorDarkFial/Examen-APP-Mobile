import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialPage } from './historial.page';
import { ProductsService } from 'src/app/services/products.service';
import { ModalController, IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

class MockProductsService {
  ApiObtenerProductos = jasmine.createSpy('ApiObtenerProductos').and.returnValue(of([]));
  ApiBuscarProductos = jasmine.createSpy('ApiBuscarProductos').and.returnValue(of([]));
  ApiObtenerProductosPorCategoria = jasmine.createSpy('ApiObtenerProductosPorCategoria').and.returnValue(of([]));
  ApiObtenerProductosOrdenadosPorPrecio = jasmine.createSpy('ApiObtenerProductosOrdenadosPorPrecio').and.returnValue(of([]));
  ApiObtenerProductosMejorCalificados = jasmine.createSpy('ApiObtenerProductosMejorCalificados').and.returnValue(of([]));
}

class MockModalController {
  create = jasmine.createSpy('create').and.returnValue({
    present: jasmine.createSpy('present'),
    onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve({ data: null })),
  });
}

describe('HistorialPage', () => {
  let component: HistorialPage;
  let fixture: ComponentFixture<HistorialPage>;
  let productsService: MockProductsService;
  let modalController: MockModalController;

  const mockItems = [
    { id: 1, title: 'Producto 1', price: 100, category: 'electronics', rating: { rate: 4.5, count: 120 } },
    { id: 2, title: 'Producto 2', price: 200, category: 'jewelery', rating: { rate: 3.5, count: 50 } },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: ProductsService, useClass: MockProductsService },
        { provide: ModalController, useClass: MockModalController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialPage);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as unknown as MockProductsService;
    modalController = TestBed.inject(ModalController) as unknown as MockModalController;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Carga Inicial de Productos  
  it('should load products from API if localStorage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
  
    component.ngOnInit();
  
    expect(productsService.ApiObtenerProductos).toHaveBeenCalled();
  });
  
  it('should load products from localStorage if available', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockItems));
  
    component.ngOnInit();
  
    expect(component.items).toEqual(mockItems);
  });
  
  // Filtrar Productos por Categoría
  it('should filter products by category', () => {
    component.filtrarPorCategoria('electronics');
    expect(productsService.ApiObtenerProductosPorCategoria).toHaveBeenCalledWith('electronics');
  });
  
  // Ordenar Productos por Precio
  it('should order products by ascending price', () => {
    component.ordenarProductosPorPrecio('asc');
    expect(productsService.ApiObtenerProductosOrdenadosPorPrecio).toHaveBeenCalledWith('asc');
  });
  
  it('should order products by descending price', () => {
    component.ordenarProductosPorPrecio('desc');
    expect(productsService.ApiObtenerProductosOrdenadosPorPrecio).toHaveBeenCalledWith('desc');
  });
  
  // Buscar Productos
  it('should filter products by search text', () => {
    component.searchText = 'Producto';
    component.filterProducts();
  
    expect(productsService.ApiBuscarProductos).toHaveBeenCalledWith('Producto');
  });
  
  // Productos Mejor Calificados
  it('should fetch top-rated products', () => {
    component.mostrarProductosMejorCalificados();
    expect(productsService.ApiObtenerProductosMejorCalificados).toHaveBeenCalledWith(4);
  });

  // Abrir el Modal
  it('should open the modal and handle dismissal', async () => {
    await component.openModal();
    expect(modalController.create).toHaveBeenCalled();
    expect(modalController.create().present).toHaveBeenCalled();
    expect(modalController.create().onDidDismiss).toHaveBeenCalled();
  });
});

