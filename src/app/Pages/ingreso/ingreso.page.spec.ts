import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IngresoPage } from './ingreso.page';

describe('IngresoPage', () => {
  let component: IngresoPage;
  let fixture: ComponentFixture<IngresoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresoPage],
      imports: [IonicModule.forRoot(), FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productos array', () => {
    expect(component.productos.length).toBe(4); // Basado en los productos iniciales
    expect(component.productos[0].nombre).toBe('Fideo'); // Verificar el primer producto
  });

  it('should add a new producto to the list', () => {
    // Valores del nuevo producto
    component.nuevoProducto = { nombre: 'Azúcar', pallet: '9998', sku: '567894' };

    // Llamar al método para agregar el producto
    component.ingresarProducto();

    // Verificar que el producto fue agregado
    expect(component.productos.length).toBe(5);
    expect(component.productos[4].nombre).toBe('Azúcar'); // Último producto agregado
  });

  it('should not add producto if fields are empty', () => {
    // Valores vacíos
    component.nuevoProducto = { nombre: '', pallet: '', sku: '' };

    // Llamar al método para intentar agregar
    component.ingresarProducto();

    // Verificar que el producto no fue agregado
    expect(component.productos.length).toBe(4); // Mantener el número original
  });

  it('should clear nuevoProducto after adding', () => {
    // Asignar un producto nuevo
    component.nuevoProducto = { nombre: 'Arroz', pallet: '9999', sku: '567895' };

    // Llamar al método para agregar
    component.ingresarProducto();

    // Verificar que el formulario se limpió
    expect(component.nuevoProducto).toEqual({ nombre: '', pallet: '', sku: '' });
  });
});
