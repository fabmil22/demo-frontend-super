import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { } from '@angular/core/testing';
import { SuperherosEditComponent } from './superheros-edit.component';
import { Superhero } from '../../../core/models/superheros.interface';
import { SuperhoresService } from '../../../core/services/superhores.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SuperPowersService } from '../../../core/services/super-powers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('SuperherosEditComponent', () => {
  let component: SuperherosEditComponent;
  let fixture: ComponentFixture<SuperherosEditComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let service: SuperhoresService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    const superPowersServiceSpy = jasmine.createSpyObj('SuperPowersService', ['getPowers']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    mockActivatedRoute = {
      paramMap: of({
        get: (param: string) => param === 'id' ? '1' : null
      })
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };



    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }, // Usar el objeto mockRouter aquí
        { provide: ToastrService, useValue: toastrSpy },
        { provide: SuperhoresService, useClass: SuperheroesServiceMock },
        { provide: SuperPowersService, useValue: superPowersServiceSpy },
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperherosEditComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    const fb = TestBed.inject(FormBuilder);
    component.submitted = true;
    service = TestBed.inject(SuperhoresService);
    const mockRouter = { navigate: jasmine.createSpy('navigate') };
    component.formSuper = fb.group({
      name: ['Superman'],
      secretIdentity: ['Clark Kent'],
      superpowers: ['volar'],
      image: ['superman.jpg']
    });


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set data to form correctly', () => {
    // Datos de ejemplo para simular el héroe
    const heroData = {
      name: 'Spiderman',
      secretIdentity: 'Peter Parker',
      superpowers: ['Wall-crawling', 'Spider-sense'],
      image: ''
    };

    component.hero = heroData;
    component.setDatatoEdit();

    // Se comprueba si los valores del formulario son correctos
    expect(component.formSuper.value).toEqual(heroData);
  });

  it('should return form controls correctly', () => {
    // Creamos un formulario de ejemplo con controles
    const heroData = {
      name: 'Batman',
      secretIdentity: 'Bruce Wayne',
      superpowers: ['inteligente', 'agil']
    };

    component.hero = heroData;

    component.createForm();
    component.setDatatoEdit();
    expect(component.formSuper).toBeDefined();

    const formControls = component.f;

    // Comprobamos que los controles devueltos sean los correctos
    expect(formControls['name']).toBeDefined();
    expect(formControls['secretIdentity']).toBeDefined();
    expect(formControls['superpowers']).toBeDefined();

    // Comprobamos que los valores iniciales de los controles sean correctos
    expect(formControls['name'].value).toEqual('Batman');
    expect(formControls['secretIdentity'].value).toEqual('Bruce Wayne');
    expect(formControls['superpowers'].value).toEqual(['inteligente', 'agil']);
  });


  it('should call create if not in edit mode and form is valid', () => {
    component.edit = false;
    spyOn(component, 'create').and.callThrough();
    spyOn(component, 'editSuper');
    //
    // Llamamos a onSubmit
    component.onSubmit();
    // Verificamos que submitted es true
    expect(component.submitted).toBeTrue();
    // Verificamos que se haya llamado a la función create con los datos del formulario
    expect(component.create).toHaveBeenCalledOnceWith(component.formSuper.getRawValue());
    // Verificamos que no se haya llamado a editSuper
    expect(component.editSuper).not.toHaveBeenCalled();
  });

  it('should call create if  in edit mode and form is valid', () => {
    component.edit = true;
    component.hero = hero;
    spyOn(component, 'create');
    spyOn(component, 'editSuper').and.callThrough();

    component.onSubmit();

    expect(component.submitted).toBeTrue();

    expect(component.editSuper).toHaveBeenCalled();

    expect(component.create).not.toHaveBeenCalled();
  });

  it('should subscribe to value changes of superpowers control and update valoresSeleccionados', () => {
    component.createForm();
    const superpowersControl = component.formSuper.get('superpowers');
    superpowersControl?.setValue(['volar', 'supervelocidad']);
    expect(component.valoresSeleccionados).toEqual(['volar', 'supervelocidad']);
  });

  it('should create a superhero with image file name', () => {

    const formDataTest = {
      name: 'Superman',
      secretIdentity: 'Clark Kent',
      superpowers: ['Flight', 'Super strength', 'Heat vision'],
      image: 'superman.jpg'
    };
const fileNameImagen = 'superman.jpg';
spyOn(service, 'create').and.returnValue(of({}));
component.create(formDataTest);
expect(service.create).toHaveBeenCalled();
  });



  it('should upload image successfully', () => {

    const imagen = new File(['imagen'], 'test.png', { type: 'image/png' });

    spyOn(service, 'upload').and.returnValue(of('Image uploaded successfully'));
    spyOn(console, 'log');
    spyOn(console, 'error');
    // Llamamos a la función upload con un archivo de imagen
    component.upload(imagen);
    expect(service.upload).toHaveBeenCalledOnceWith(imagen );

    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('imagen subida', 'Image uploaded successfully');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should handle error when uploading image', () => {
    const mockImageFile = new File(['imagen'], 'test.png', { type: 'image/png' });
    const errorMessage = 'Error uploading image';
    spyOn(console, 'log');
    spyOn(console, 'error');
    spyOn(service, 'upload').and.returnValue(throwError(errorMessage));

    component.upload(mockImageFile);
    expect(service.upload).toHaveBeenCalledOnceWith(mockImageFile);
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalledWith('Observable emitted an error: ' + errorMessage);
    expect(console.log).not.toHaveBeenCalled();
  });

/*   it('should handle file selection correctly', () => {
 const mockFile = new File(['imagen'], 'test.png', { type: 'image/png' });
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    };
    component.onFileSelected(mockEvent);
    expect(component.fileComplety).toEqual(mockFile);
    expect(component.imagen).toEqual(mockFile);

    // Verificamos que imageSrc se haya actualizado correctamente
    const reader = new FileReader();
    reader.onload = () => {
      expect(component.imageSrc).toEqual(reader.result as string);
    };
    reader.readAsDataURL(mockFile);

    // Verificamos que se haya actualizado el valor del control 'image' en el FormGroup 'datosPersonales'
    const datosPersonalesGroup = component.formSuper.get('datosPersonales');
    if (datosPersonalesGroup) {
      expect(datosPersonalesGroup.get('image')?.value).toEqual(mockFile.name);
    }

  }); */

  it('should show error message using ToastrService', () => {
    const errorMessage = 'Error message';


    component.showError(errorMessage);

    // Verificamos que la función error del ToastrService haya sido llamada con el mensaje proporcionado
    expect(toastrService.error).toHaveBeenCalledWith(errorMessage);
  });

  //fileupdate

  it('should set imageSrc and fileNameImagen when onFileSelected is called with valid file', () => {
    // Arrange
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const event = {
      target: {
        files: {
          0: file,
          length: 1
        }
      }
    };

    // Act
    component.onFileSelected(event);

    // Assert
    expect(component.fileNameImagen).toEqual(file.name);
    expect(component.imagen).toEqual(file);

  });

  it('should not set imageSrc and fileNameImagen when onFileSelected is called with invalid file', () => {
    // Arrange
    const event = {
      target: {
        files: null
      }
    };

    // Act
    component.onFileSelected(event);

    // Assert
    expect(component.fileNameImagen).toBeUndefined();
    expect(component.imagen).toBeUndefined();
    expect(component.imageSrc).toBeUndefined();
  });



});



const mockActivatedRoute = {
  paramMap: of({ get: () => '1' }),
};
const mockRouter = { navigate: () => { } };

class SuperheroesServiceMock {
  create(hero: any) {
    return of({});
  }
  getHeroById(id: any) {
    return of({});
  }

  edit(id: any) {
    return of({});
  }
  upload(image: any) {
    return of({});
  }

}

class RouterMock {
  navigate(commands: any[]) { }
}


const heroformMock: any = { name: 'Superman', secretIdentity: 'Clark Kent', superpowers: ['Flight', 'Super strength', 'Heat vision'], image: 'superman.jpg' };
const hero: any = { id: 1, name: 'Superman', secretIdentity: 'Clark Kent', superpowers: ['Flight', 'Super strength', 'Heat vision'], image: 'superman.jpg' };
