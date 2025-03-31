import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Character } from '../../interfaces/Character-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit {
  constructor(
    private readonly apiService:ApiService,
    private route: ActivatedRoute,
  ){
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getCharacter(id); // Llamar a la función para obtener el personaje
      } else {
        console.error('ID no proporcionado en los parámetros de la URL');
      }
    })
  }
  ngOnInit(): void {
   
  }

  getCharacter(id:number){
    this.apiService.getCharacter(id);
    this.apiService.getCharacter(id).subscribe((character:Character)=>{
      console.log('Personaje:', character);
    }
  )}

}
