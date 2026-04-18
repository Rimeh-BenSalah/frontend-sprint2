import { Component } from '@angular/core';
import { Livre } from '../model/livre.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../services/livre-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Theme } from '../model/theme.model';

@Component({
  selector: 'app-update-livre',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-livre.html',
  styles: ``,
})
export class UpdateLivre {
   currentLivre  = new Livre(); 
   themes! : Theme[]; 
   updatedTheId! : number;
   constructor(private activatedRoute: ActivatedRoute,
              private router :Router, 
              private livreService: LivreService) { } 
  ngOnInit(): void {
    //console.log(this.activatedRoute.snapshot.params['id']);
    this.livreService.listeThemes(). subscribe(thes => {
      this.themes = thes._embedded.themes;
      console.log(thes); 
    });
    this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']). subscribe( 
      liv =>{ this.currentLivre = liv; 
        this.updatedTheId = this.currentLivre.theme.idThe;
      } ) ;
  }
  updateLivre()
  { 
    //console.log(this.currentLivre);
    this.currentLivre.theme = this.themes. find(the => the.idThe == this.updatedTheId)!;
    this.livreService.updateLivre(this.currentLivre).subscribe(liv => { 
    this.router.navigate(['livres']); } );
  }
}
