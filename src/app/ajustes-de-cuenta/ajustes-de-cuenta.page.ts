import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ajustes-de-cuenta',
  templateUrl: './ajustes-de-cuenta.page.html',
  styleUrls: ['./ajustes-de-cuenta.page.scss'],
})
export class AjustesDeCuentaPage implements OnInit {
  public uid: string;
  public nameF: string;
  public phoneF: string;
  public emailF: string;
  private emailA: string;
  private password: string;
  public pathImage: string;
  file: File;
  public statechanceImage: boolean = false;
  public im: string;
  constructor(public loadingController: LoadingController, 
              public storage: AngularFireStorage, 
              public auth: AngularFireAuth, 
              public toastController: ToastController, 
              private route: ActivatedRoute, 
              private Afauth: AuthService, 
              private router: Router, private rDB: AngularFireDatabase, private formBuilder: FormBuilder) {
    this.uid = this.route.snapshot.params.uid_user;
    this.rDB.database.ref(`App/Clientes/${this.uid}`).once('value', snap => {
      const datos = snap.val();
      this.nameF = datos.nombre;
      this.phoneF = datos.telefono;
      this.emailF = datos.email;
      this.emailA = datos.email;
      this.password = datos.password;
      if (datos.imagenPerfil === '') {
        this.im = '../../assets/icon/profile-picture1.png';
      } else {
        this.im = datos.imagenPerfil;
      }
      
    });
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
  };

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
  });
  ngOnInit() {
  }

  ionViewWillEnter() {
    /*this.uid = this.route.snapshot.params.uid_user;
    this.storage.ref(`AppImage/${this.uid}`).getDownloadURL().subscribe(url => {
      this.im = url
    }, error => {
      this.im = '../../assets/icon/profile-picture1.png';
    });*/
    this.presentLoadingWithOptions();
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando ...',
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async onSubmitRegister() {
    await this.uploadfile(this.file);
    this.rDB.database.ref(`App/Clientes/${this.uid}/nombre`).set(this.nameF)
      .then(async () => {
        this.rDB.database.ref(`App/Clientes/${this.uid}/telefono`).set(this.phoneF);
        this.rDB.database.ref(`App/Clientes/${this.uid}/email`).set(this.emailF);
        if (this.statechanceImage){
          this.im = this.pathImage
          this.rDB.database.ref(`App/Clientes/${this.uid}/imagenPerfil`).set(this.pathImage)
        }
        if (this.emailA !== this.emailF) {
          this.auth.signInWithEmailAndPassword(this.emailA,this.password)
            .then((uss)=>{
              uss.user.updateEmail(this.emailF);
            });
        }
        const toast = await this.toastController.create({
          message: 'Datos actualizados',
          duration: 1800
        });
        toast.present();
      })
      .catch((err) => {
        console.log('ocurrio un error al actualizar los datos => ', err);
      });
  }

  changeListener($event): void {
    this.file = $event.target.files;
  }

  async uploadfile(file): Promise<any> {
    if(file && file.length){ 
      this.statechanceImage = true
      const task = await this.storage.ref(`AppImage/${file[0].lastModified}`).put(file[0]);
      this.pathImage = await this.storage.ref(`AppImage/${file[0].lastModified}`).getDownloadURL().toPromise();
    }
  }
}
