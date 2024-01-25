import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeDesk';
  constructor() {
  }

  snorlaxDex(): void {
    document.querySelectorAll('*').forEach((tag) => {
      if(tag.classList.contains('snorlax')){
        tag.classList.remove('snorlax')
      }else{
        tag.classList.add('snorlax')
      }
    });
  }
}
