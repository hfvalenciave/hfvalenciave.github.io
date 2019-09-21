import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'H/F Valencia';
  todos: Observable<any[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.todos = this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos');
  }
}
