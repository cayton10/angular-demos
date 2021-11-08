import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{pageTitle}}</a>
    <ul class='nav navbar-nav'>
      <li><a class='btn btn-primary mx-2' routerLink='/welcome'>Home</a></li>
      <li><a class='btn btn-primary mx-2' routerLink='/products'>Product List</a></li>
    </ul>
  </nav>
  <div class='container'>
    <router-outlet></router-outlet>
  <div>
  `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Mangement'
}