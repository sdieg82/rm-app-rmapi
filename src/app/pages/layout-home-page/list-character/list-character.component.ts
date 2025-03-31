import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Character } from '../../../interfaces/Character-interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-character',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './list-character.component.html',
  styleUrl: './list-character.component.css'
})
export class ListCharacterComponent implements OnInit {
  public characters: Character[] = [];  // Personajes mostrados en pantalla
  public charactersCopy: Character[] = []; // Copia del array original
  public imageUrl: string = 'https://rickandmortyapi.com/api/character/avatar/';

  constructor(
    private  readonly router:Router,
    private readonly apiService: ApiService,
  ){}

  ngOnInit(): void {
    this.getCharacters();  // Llamamos a la API en cuanto se carga el componente
  }

  editCharacter(id: number) {
    console.log('Editar personaje con ID:', id);
  }
  viewCharacter(id:number){
    console.log('Ver personaje con ID:', id);
    // Aquí podrías navegar a una página de detalles del personaje, por ejemplo:
    this.router.navigate(['/character', id], { queryParams: { id } });

  }

  deleteCharacter(id: number) {
    console.log('Eliminar personaje con ID:', id);
  }

  searchCharacter(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm.trim()) {
      this.characters = [...this.charactersCopy]; // Restaurar la lista completa si el input está vacío
      return;
    }

    this.characters = this.charactersCopy.filter((character: Character) =>
      character.name.toLowerCase().includes(searchTerm) ||
      character.species.toLowerCase().includes(searchTerm) ||
      character.status.toLowerCase().includes(searchTerm)
    );
  }

  getCharacters() {
    this.apiService.getCharacters().subscribe((response: any) => {
      this.characters = response.results;
      this.charactersCopy = [...this.characters]; // Clonamos el array después de recibir la respuesta
    });
  }
}
