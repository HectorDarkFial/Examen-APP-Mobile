import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DespachoPage } from './despacho.page';

describe('DespachoPage', () => {
  let component: DespachoPage;
  let fixture: ComponentFixture<DespachoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DespachoPage],
      imports: [IonicModule.forRoot(), FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DespachoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default products', () => {
    expect(component.productos.length).toBe(3);
    expect(component.productos[0].nombre).toBe('Aceite');
    expect(component.productos[1].nombre).toBe('Fideo');
    expect(component.productos[2].nombre).toBe('Harina');
  });

  it('should remove a product when despacharProducto is called with matching data', () => {
    component.nuevoProducto = { nombre: 'Aceite', pallet: '9995', sku: '567891' };
    component.despacharProducto();
    expect(component.productos.length).toBe(2);
    expect(component.productos.find((p) => p.nombre === 'Aceite')).toBeUndefined();
  });

  it('should not remove any product if data does not match', () => {
    component.nuevoProducto = { nombre: 'Azúcar', pallet: '9998', sku: '567894' };
    component.despacharProducto();
    expect(component.productos.length).toBe(3);
  });

  it('should clear the form after despacharProducto is called', () => {
    component.nuevoProducto = { nombre: 'Fideo', pallet: '9996', sku: '567892' };
    component.despacharProducto();
    expect(component.nuevoProducto.nombre).toBe('');
    expect(component.nuevoProducto.pallet).toBe('');
    expect(component.nuevoProducto.sku).toBe('');
  });
});
