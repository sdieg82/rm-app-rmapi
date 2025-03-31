import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Character } from '../../interfaces/Character-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-character',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './list-character.component.html',
  styleUrl: './list-character.component.css'
})
export class ListCharacterComponent implements OnInit {
public characters: Character[] = []; 
public imageUrl:string='https://rickandmortyapi.com/api/character/avatar/';

constructor(
  private readonly apiService: ApiService
){}

ngOnInit(): void {
    this.getCharacters();
  }


editCharacter(arg0: any) {
throw new Error('Method not implemented.');
}

searchCharacter(event:any) {
  const searchTerm=event.target.value.toLowerCase();
  this.characters=this.characters.filter((character:Character) => {
    return character.name.toLowerCase().includes(searchTerm) || character.species.toLowerCase().includes(searchTerm) || character.status.toLowerCase().includes(searchTerm);
  }
  );
}

getCharacters() {
  this.apiService.getCharacters().subscribe((response: any) => {
    this.characters = response.results;
    console.log(this.characters);
  });
}

}
