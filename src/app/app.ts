import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { LibraryList } from "./library-list/library-list";
import { LoadingService } from "./services/loading.service";
import { Loader } from "./loader/loader";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LibraryList, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected title = 'Библиотеки Москвы';
  loader = inject(LoadingService);
}
