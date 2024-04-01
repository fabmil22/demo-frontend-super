import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SuperhoresService } from '../../../core/services/superhores.service';
import { ToastrService } from 'ngx-toastr';
import { SuperPowersService } from '../../../core/services/super-powers.service';

import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Superhero } from '../../../core/models/superheros.interface';

@Component({
  selector: 'app-superheros-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './superheros-edit.component.html',
  styleUrl: './superheros-edit.component.scss'
})
export class SuperherosEditComponent {
  valoresSeleccionados: any[] = [];
  allSuperpowers$ = this.servicePorwers.getPowers();
  color = 'primary';
  selectedFile!: any;
  formSuper!: FormGroup;
  imagen!: any;
  submitted = false;
  imageSrc!: string;
  idEdithero: any;
  hero!: any;
  edit!: boolean;

  private destroy$ = new Subject<void>();
  fileNameImagen!: string;


ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(private service: SuperhoresService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private servicePorwers: SuperPowersService) {
  }


  ngOnInit() {
    this.createForm();
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: Params) => {
          this.edit = (!+params['get']('id')) ? false: true;
          return this.service.getHeroById(+params['get']('id'))
        },),
        takeUntil(this.destroy$)
    )
      .subscribe((hero1: any) => {
        this.hero = hero1;
        this.setDatatoEdit();
      });

  }



  createForm() {
    this.formSuper = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z\s]*$")]],
      secretIdentity: ['', [Validators.required]],
      superpowers: [],
      image: ['']
    }),

      this.formSuper.get('superpowers')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(values => {
        this.valoresSeleccionados = values;
      });

    this.formSuper.get('superpowers')?.setValidators(Validators.required);


  }

  setDatatoEdit() {

    let hero: any = {
      "name": this.hero.name,
      "secretIdentity": this.hero.secretIdentity,
      "superpowers": this.hero.superpowers,
      "image": "",
    };
    this.formSuper.setValue(hero);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formSuper.controls;
  }

  onSubmit(): void {
    this.submitted = true;
   if (this.formSuper.invalid) {
      return;
    }

   const formData = this.formSuper.getRawValue();
      if (this.edit) {
        this.editSuper(formData);
      } else {
        this.create(formData);
        }

  }

  create(formData: any) {
    this.service.create(formData , this.fileNameImagen).subscribe({
      next: value => {
        this.upload(this.imagen);
        this.showSuccess();
        this.router.navigate(['/']);
      },
      error: err => this.showError('No se ha podido crear ' ),
    });
  }

  editSuper(formData: any) {
    this.service.edit(this.hero.id ,formData).pipe(takeUntil(this.destroy$)).subscribe({
      next: value => {
        console.log('this.imagen: ', this.imagen);

        this.upload(this.imagen);
        this.showSuccess();
        this.router.navigate(['/']);
        console.log('editando');
      },
      error: err => console.error('Observable emitted an error: ' + err),
    });
  }

  upload(imagen: File) {

    if (imagen) {

      this.service.upload( imagen ).subscribe({
      next: (val: any) => console.log('imagen subida', val),
      error: (err: string) => console.error('Observable emitted an error: ' + err)
    }
    )
    }

  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      const selectedFile: File = files[0];
      console.log('selectedFile: ', selectedFile);

      this.fileNameImagen= selectedFile.name;
      this.imagen = selectedFile;

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
      const datosPersonalesGroup = this.formSuper.get('datosPersonales');
      if (datosPersonalesGroup) {
        datosPersonalesGroup.get('image')?.setValue(selectedFile.name);
      }

    }
  }

  showSuccess() {
    const message =(this.edit) ? '!Super Heroe ya ha sido editado!': '!Se ha creado con exito!'
    this.toastr.success(message);
  }

  showError(msj:string) {
    this.toastr.error(msj);
  }


}
function subscribe(arg0: { next: (val: any) => void; error: (err: string) => void; }) {
  throw new Error('Function not implemented.');
}

