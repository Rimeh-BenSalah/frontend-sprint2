import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-livre',
  imports: [FormsModule],
  templateUrl: './add-livre.html',
  styleUrl: './add-livre.css',
})
export class AddLivre implements OnInit{
  newLivre = new Livre();
  message! : string;
  ngOnInit(): void {
    
  }
  
  constructor(private livreService: LivreService,private router :Router) {}
  
  addLivre(){ 
    //console.log(this.newLivre); 
    this.livreService.ajouterLivre(this.newLivre);
    this.message = "Livre "+this.newLivre.nomLivre +" ajouté avec succès !"
    this.router.navigate(['livres']);
    }

}
