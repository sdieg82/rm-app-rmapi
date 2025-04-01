import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

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
