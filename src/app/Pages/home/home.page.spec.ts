import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { CameraService } from 'src/app/services/camera.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let cameraServiceSpy: jasmine.SpyObj<CameraService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CameraService', ['addNewPhoto'], {
      photos: ['photo1.jpg', 'photo2.jpg'], // Simular fotos iniciales
    });

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: CameraService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    cameraServiceSpy = TestBed.inject(CameraService) as jasmine.SpyObj<CameraService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sync photos on init', () => {
    // Verifica que las fotos iniciales estén sincronizadas
    expect(component.photos).toEqual(cameraServiceSpy.photos);
  });

  it('should call takePhoto and update photos', async () => {
    cameraServiceSpy.addNewPhoto.and.callFake(async () => {
      cameraServiceSpy.photos.push('newPhoto.jpg'); // Simula agregar una nueva foto
    });

    await component.takePhoto(); // Llamar a la función
    expect(cameraServiceSpy.addNewPhoto).toHaveBeenCalled();
    expect(component.photos).toContain('newPhoto.jpg'); // Verificar la actualización
  });
});

