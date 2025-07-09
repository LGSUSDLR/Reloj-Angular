import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelojVmService } from '../vm.service';
import { RelojItemComponent } from '../reloj-item/reloj-item';
import { RelojConfigDialogComponent } from '../reloj-config-dialog/reloj-config-dialog';
import { Reloj } from '../model';

@Component({
  selector: 'app-reloj-list',
  standalone: true,
  imports: [CommonModule, RelojItemComponent, RelojConfigDialogComponent],
  template: `
    <div *ngIf="vm.relojes$ | async as relojes" class="reloj-list">
      <app-reloj-item
        *ngFor="let reloj of relojes; trackBy: trackByRelojId"
        [reloj]="reloj"
        (onEditar)="abrirEditarReloj($event)">
      </app-reloj-item>
    </div>

    <app-reloj-config-dialog
      *ngIf="editDialogOpen"
      [config]="selectedReloj"
      [relojId]="selectedReloj?.id || null"
      (configurado)="guardarEdicion($event)"
      (cancelar)="editDialogOpen = false">
    </app-reloj-config-dialog>
  `,
  styleUrls: ['./reloj-list.css'],
})
export class RelojListComponent {
  selectedReloj: Reloj | null = null;
  editDialogOpen = false;

  constructor(public vm: RelojVmService) {}

  trackByRelojId(index: number, reloj: Reloj) {
    return reloj.id;
  }

  abrirEditarReloj(reloj: Reloj) {
    this.selectedReloj = { ...reloj }; // Clonar para edición
    this.editDialogOpen = true;
  }

  guardarEdicion(config: any) {
    if (this.selectedReloj) {
      this.vm.editarReloj(this.selectedReloj.id, config);
    }
    this.editDialogOpen = false;
    this.selectedReloj = null;
  }
}
