import { Component } from '@angular/core';
import { RelojVmService } from '../vm.service';
import { RelojListComponent } from '../reloj-list/reloj-list';
import { RelojConfigDialogComponent } from '../reloj-config-dialog/reloj-config-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RelojListComponent, RelojConfigDialogComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {
  dialogoAbierto = false;
  constructor(private relojVm: RelojVmService) {}

  abrirDialogo() { this.dialogoAbierto = true; }
  cerrarDialogo() { this.dialogoAbierto = false; }
  agregarReloj(config: any) {
    this.relojVm.addReloj(config);
    this.cerrarDialogo();
  }
}
