import { Component } from '@angular/core';
import { Livre } from '../../model/livre.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../livre-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-livre',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-livre.html',
  styles: ``,
})
export class UpdateLivre {
   currentLivre  = new Livre(); 
   constructor(private activatedRoute: ActivatedRoute,
              private router :Router, 
              private livreService: LivreService) { } 
  ngOnInit(): void {
    //console.log(this.activatedRoute.snapshot.params['id']);
    this.currentLivre = this.livreService.consulterLivre(this.activatedRoute.snapshot. params['id']);
    console.log(this.currentLivre); 
  }
  updateLivre()
  { 
    //console.log(this.currentLivre);
    this.livreService.updateLivre(this.currentLivre);
    this.router.navigate(['livres']);
  }
}
