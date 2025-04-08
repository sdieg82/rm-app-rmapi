import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  
  @Input() page: number = 1; // Página actual

  constructor(
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.page = Number(params['page']) || 1; // Convierte a número para evitar errores
    });
  }

  goToPage(page: number) {
    this.router.navigate(['/character'], { queryParams: { page } }); // Navega a la página específica
  }

  nextPage() {
    this.goToPage(this.page + 1); // Incrementa la página y navega
  }

  previousPage() {
    if (this.page > 1) {
      this.goToPage(this.page - 1); // Decrementa la página y navega
    }
  }
}
