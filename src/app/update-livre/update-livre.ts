import { Component } from '@angular/core';
import { Livre } from '../model/livre.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../services/livre-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Theme } from '../model/theme.model';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-update-livre',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-livre.html',
  styles: ``,
})
export class UpdateLivre {
  currentLivre = new Livre();
  themes!: Theme[];
  updatedTheId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private livreService: LivreService,
  ) {}
  ngOnInit(): void {
    //console.log(this.activatedRoute.snapshot.params['id']);
    this.livreService.listeThemes().subscribe((thes) => {
      this.themes = thes._embedded.themes;
      console.log(thes);
    });
    this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).subscribe((liv) => {
      this.currentLivre = liv;
      this.updatedTheId = this.currentLivre.theme.idThe;
      /* this.livreService.loadImage(this.currentLivre.image.idImage).subscribe((img: Image) => {
        this.myImage = 'data:' + img.type + ';base64,' + img.image;
      });*/
    });
  }
  /*updateLivre()
  { 
    //console.log(this.currentLivre);
    this.currentLivre.theme = this.themes. find(the => the.idThe == this.updatedTheId)!;
    this.livreService.updateLivre(this.currentLivre).subscribe(liv => { 
    this.router.navigate(['livres']); } );
  }*/
  /*updateLivre() {
    this.currentLivre.theme = this.themes.find((the) => the.idThe == this.updatedTheId)!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.livreService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentLivre.image = img;
          this.livreService.updateLivre(this.currentLivre).subscribe((liv) => {
            this.router.navigate(['livres']);
          });
        });
    } else {
      this.livreService.updateLivre(this.currentLivre).subscribe((liv) => {
        this.router.navigate(['livres']);
      });
    }
  }*/
 updateLivre() { 
  this.currentLivre.theme = this.themes.find(the => 
    the.idThe == this.updatedTheId)!; 
    this.livreService .updateLivre(this.currentLivre) 
    .subscribe((liv) => { 
      this.router.navigate(['livres']); }); }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
  onAddImageLivre() {
    this.livreService
      .uploadImageLiv(this.uploadedImage, this.uploadedImage.name, this.currentLivre.idLivre!)
      .subscribe((img: Image) => {
        this.currentLivre.images.push(img);
      });
  }

  supprimerImage(img: Image){ 
    let conf = confirm("Etes-vous sûr ?"); 
    if (conf) this.livreService
    .supprimerImage(img.idImage)
    .subscribe(() => { 
      //supprimer image du tableau currentLivre.images 
      const index = this.currentLivre.images.indexOf(img, 0); 
      if (index > -1) { this.currentLivre.images.splice(index, 1); } }); }
}
