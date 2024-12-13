import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MiModalComponent } from './mi-modal.component';
import { IonicModule, ModalController } from '@ionic/angular';

class MockModalController {
  dismiss = jasmine.createSpy('dismiss');
}

describe('MiModalComponent', () => {
  let component: MiModalComponent;
  let fixture: ComponentFixture<MiModalComponent>;
  let modalController: MockModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: ModalController, useClass: MockModalController }],
    }).compileComponents();

    fixture = TestBed.createComponent(MiModalComponent);
    component = fixture.componentInstance;
    modalController = TestBed.inject(ModalController) as unknown as MockModalController;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal automatically after 1 second', fakeAsync(() => {
    component.ngOnInit();

    tick(1000); // Simula que ha pasado 1 segundo
    expect(modalController.dismiss).toHaveBeenCalled();
  }));
});
