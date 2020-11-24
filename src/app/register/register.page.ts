import { Component, OnInit } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public emailF: string;
  public passwordF: string;
  public nameF: string;
  public dateF: string;
  public phoneF: string;
  public pathImage: string;
  file: File;
  constructor(
    public toastController: ToastController,
    private Afauth: AuthService,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private rDB: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {
    this.pathImage = '../../assets/icon/user.png';
  }

  get name() {
    return this.registrationForm.get('name');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get date() {
    return this.registrationForm.get('date');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'El nombre es requerido' },
      { type: 'maxlength', message: 'EL nombre solo puede tener 100 caracteres.' },
      { type: 'pattern', message: 'El nombre unicamente debe contener letras' },
    ],
    email: [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'Ingrese una direccion de email valida.' },
    ],
    phone: [
      { type: 'required', message: 'El celular es requerido.' },
      { type: 'pattern', message: 'Ingrese un número de celular correcto.' },
    ],
    date: [{ type: 'required', message: 'La fecha es requerida.' }],
    password: [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'El tamaño es muy pequeño.' },
      { type: 'maxlength', message: 'password length.' },
    ],
    confirpassword: [
      { type: 'required', message: 'La contraseña es requerida.' },
      { type: 'minlength', message: 'El tamaño es muy pequeño..' },
      { type: 'maxlength', message: 'password length.' },
    ],
  };

  registrationForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$') /*('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')*/]],
      date: ['', [Validators.required]],
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])),
      confirmpassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])),
    },
    {
      validators: this.password.bind(this),
    }
  );
  ngOnInit() {}

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  onSubmitRegister() {
    this.fireAuth
      .createUserWithEmailAndPassword(this.emailF, this.passwordF)
      .then(async (user) => {
        this.rDB.database.ref(`App/Clientes/${user.user.uid}`).set({
          nombre: this.nameF,
          telefono: this.phoneF,
          email: this.emailF,
          date: this.dateF,
          password: this.passwordF,
          imagenPerfil: this.pathImage,
        });
        this.rDB.database.ref(`Clientes/${user.user.uid}`).set({
          nombre: this.nameF,
          telefono: this.phoneF,
          email: this.emailF,
          date: this.dateF,
          password: this.passwordF,
          imagenPerfil: this.pathImage
        });
        this.registrationForm.reset();
        const toast = await this.toastController.create({
          message: 'Usuario Creado',
          duration: 1800,
        });
        toast.present();
      })
      .catch(async () => {
        console.log('Ha ocurrido un error al registrar este usuario');
        const toast = await this.toastController.create({
          message: 'Error al crear la cuenta',
          duration: 1600,
        });
        toast.present();
      });
    this.router.navigate(['/login']);
  }

  alerta() {
    alert('listo');
  }

 changeListener($event): void {
    this.file = $event.target.files;
    this.uploadfile(this.file);
  }

  async uploadfile(file): Promise<any> {
    if(file && file.length){
      const task = await this.storage.ref(`AppImage/${file[0].lastModified}`).put(file[0]);
      this.pathImage = await this.storage.ref(`AppImage/${file[0].lastModified}`).getDownloadURL().toPromise();
    }
  }
}
