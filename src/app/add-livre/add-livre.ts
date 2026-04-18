import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre-service';
import { Router } from '@angular/router';
import { Theme } from '../model/theme.model';

@Component({
  selector: 'app-add-livre',
  imports: [FormsModule],
  templateUrl: './add-livre.html',
  styleUrl: './add-livre.css',
})
export class AddLivre implements OnInit {
  newLivre = new Livre();
  message!: string;
  themes!: Theme[];
  newIdThe!: number;
  newTheme!: Theme;
  ngOnInit(): void {
    this.livreService.listeThemes().subscribe((thes) => {
      this.themes =  thes._embedded.themes;
      console.log(thes);
    });
  }

  constructor(
    private livreService: LivreService,
    private router: Router,
  ) {}

  addLivre() {
  const theme = this.themes.find(the => the.idThe == this.newIdThe);

  if (!theme) return;

  const livreToSend = {
    ...this.newLivre,
    theme: theme
  };

  console.log("ENVOI CLEAN :", livreToSend);

  this.livreService.ajouterLivre(livreToSend).subscribe({
    next: (liv) => {
      console.log(liv);
      this.router.navigate(['livres']);
    },
    error: (err) => {
      console.error("ERREUR BACK :", err);
    }
  });
}
}
