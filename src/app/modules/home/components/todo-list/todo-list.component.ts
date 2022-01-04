import { Component, DoCheck } from '@angular/core';
//Interface
import { TescKList } from '../../model/tesc-klist';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements  DoCheck {

  public taskList: Array<TescKList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorate();
  }


  public setEmitTaksList(event: string){
   this.taskList.push({task: event, checked: false });
  }

  public deleteItemTaksList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTasksList() {
    const confirm = window.confirm("Voce deseja realmente excluir tudo?")

    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Sua coluna de texto esta vazia deseja deletar?");

      if(confirm){
        this.deleteItemTaksList(index);
      }
    }
  }

  public setLocalStorate(){
    if(this.taskList){
      this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
