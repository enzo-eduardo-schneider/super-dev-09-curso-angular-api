import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TarefaModel } from '../../models/tarefa.model';
import { Router } from '@angular/router';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-tarefa-cadastrar',
  imports: [FormsModule],
  templateUrl: './tarefa-cadastrar.html',
  styleUrl: './tarefa-cadastrar.scss',
})
export class TarefaCadastrar {
  tarefa = signal<TarefaModel>({
    private readonly tarefaService = inject(tarefaService),
    private readonly router= inject(Router)

    id: crypto.randomUUID(),
    descricao: "",
    prioridade: null,
    horasEstimadas: null
  })

  salvar(): void {
   
    this.tarefaService.cadastrar(this.tarefa()).subscribe({
      next: () => {
        alert("Tarefa cadastrada com sucesso");
        this.router.navigate(["/tarefas"]);
      },
  error: erro => {
    console.error("Erro ap cadastrar tarefas: " + erro)
    alert("ocorreu um erro ao cadastrar a tarefa")
  }
    })
  }
}
