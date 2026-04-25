import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Auth } from '../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit { 

  public user = new User(); 
  myForm!: FormGroup; 
  err: any;
  loading : boolean = false;
  constructor(private formBuilder: FormBuilder, private authSerice: Auth,private router : Router,private toastr: ToastrService) {}

  ngOnInit(): void { 
    this.myForm = this.formBuilder.group({ 
      username: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
      confirmPassword: ['', [Validators.required]]
    }); 
  } 

  onRegister() {

    if (this.myForm.invalid) return;
    this.loading=true;
    this.user.username = this.myForm.value.username;
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;

    if (this.myForm.value.password !== this.myForm.value.confirmPassword) {
      this.err = "Les mots de passe ne correspondent pas";
      return;
    }

    this.authSerice.registerUser(this.user).subscribe({ 
      next: (res) => { 
        this. authSerice.setRegistredUser(this.user); 
        //alert("veillez confirmer votre email"); 
        this.loading=true;
        this.toastr.success('veillez confirmer votre email', 'Confirmation');
        this.router.navigate(["/verifEmail"]);; 
      }, 
      error: (err: any) => { 
        console.error(err);

        
        if (err.status === 400) { 
          this.err = err.error?.message || "Erreur 400"; 
        } else {
          this.err = "Erreur serveur";
        }
      } 
    });
  }
}