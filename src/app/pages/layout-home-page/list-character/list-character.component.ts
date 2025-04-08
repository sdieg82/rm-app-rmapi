import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Character } from '../../../interfaces/Character-interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import { Subscription } from 'rxjs';
import { PaginationComponent } from "../shared/pagination/pagination.component";

@Component({
  selector: 'app-list-character',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavBarComponent,
    PaginationComponent
],
  templateUrl: './list-character.component.html',
  styleUrl: './list-character.component.css'
})
export class ListCharacterComponent implements OnInit, OnDestroy {
  public characters: Character[] = [];  // Personajes mostrados en pantalla
  public charactersCopy: Character[] = []; // Copia del array original
  public imageUrl: string = 'https://rickandmortyapi.com/api/character/avatar/';
  public page: number = 1; // Página actual 
  private querySubscription?: Subscription; // Variable para manejar la suscripción y evitar fugas de memoria

  constructor(
    private  readonly router:Router,
    private readonly apiService: ApiService,
    private readonly activateRoute: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef  // 📌 Agregar ChangeDetectorRef
  ){}

  ngOnInit(): void {
    // Suscribirse a los cambios en los query params
    this.getCharacters(this.page);
    this.activateRoute.queryParams.subscribe(params => {
      const newPage = Number(params['page']) || 1;
      
      // Solo recargar datos si la página realmente cambió
      if (newPage !== this.page) {
        this.page = newPage;
        this.getCharacters(this.page);
      }
    });
  }

  editCharacter(id: number) {
    console.log('Editar personaje con ID:', id);
  }
  viewCharacter(id:number){
    console.log('Ver personaje con ID:', id);
    // Aquí podrías navegar a una página de detalles del personaje, por ejemplo:
    this.router.navigate(['/character', id],
       { 
        queryParams:  {
          id,
        },
      }
    );
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
  //funcion para paginación

  getCharacters(page: number) {
    this.apiService.getCharacters(page).subscribe((response: any) => {
      console.log('Personajes cargados para la página:', page, response);
      this.characters = response.results;
      this.charactersCopy = [...this.characters];
      this.cdr.detectChanges(); // 📌 Forzar actualización de la vista
    });
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe(); // Limpiar la suscripción al destruir el componente
  }

}
