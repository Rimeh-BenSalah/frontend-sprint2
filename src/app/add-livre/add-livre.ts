import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre-service';
import { Router } from '@angular/router';
import { Theme } from '../model/theme.model';
import { Image } from '../model/Image.model';

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
  uploadedImage!: File;
  imagePath: any;
  ngOnInit(): void {
    this.livreService.listeThemes().subscribe((thes) => {
      this.themes = thes._embedded.themes;
      console.log(thes);
    });
  }

  constructor(
    private livreService: LivreService,
    private router: Router,
  ) {}

  /*addLivre() {

  if (!this.uploadedImage) {
    console.error("Image non sélectionnée");
    return;
  }

  this.livreService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe({
      next: (img: Image) => {

        this.newLivre.image = img;

        const theme = this.themes.find(
          (the) => the.idThe == this.newIdThe
        );

        if (!theme) {
          console.error("Thème introuvable");
          return;
        }

        const livreToSend = {
          ...this.newLivre,
          theme: theme,
        };

        console.log('ENVOI CLEAN :', livreToSend);

        this.livreService.ajouterLivre(livreToSend).subscribe({
          next: (liv) => {
            console.log(liv);
            this.router.navigate(['livres']);
          },
          error: (err) => {
            console.error('ERREUR BACK :', err);
          }
        });

      },
      error: (err) => {
        console.error("Erreur upload image :", err);
      }
    });
}*/
  addLivre() {
    this.newLivre.theme = this.themes.find(t => t.idThe == this.newIdThe)!;
    
    this.livreService.ajouterLivre(this.newLivre).subscribe((liv) => {
        if (this.uploadedImage) {
            this.livreService
                .uploadImageLiv(this.uploadedImage, this.uploadedImage.name, liv.idLivre!)
                .subscribe(() => {
                    this.router.navigate(['livres']);
                });
        } else {
            this.router.navigate(['livres']);
        }
    });
}
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}
