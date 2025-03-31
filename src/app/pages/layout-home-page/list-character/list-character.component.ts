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
  
constructor(
  private readonly apiService: ApiService
){}
  ngOnInit(): void {
    this.getCharacters();
  }
editCharacter(arg0: any) {
throw new Error('Method not implemented.');
}

getCharacters() {
  this.apiService.getCharacters().subscribe((response: any) => {
    this.characters = response.results;
    console.log(this.characters);
  });
}

}
