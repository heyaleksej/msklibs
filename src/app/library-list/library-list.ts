import { Component, OnInit } from '@angular/core';
import { Library, LibraryService } from "../services/api.service";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { LibraryInfo } from "../library-info/library-info";
import { LoadingService } from "../services/loading.service";
import { HighlightDirective } from "../directives/highlight";

@Component({
  selector: 'app-library-list',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    LibraryInfo,
    HighlightDirective
  ],
  templateUrl: './library-list.html',
  styleUrl: './library-list.scss'
})
export class LibraryList implements OnInit {
  searchTerm = '';
  libraries: Library[] = [];
  filteredLibraries: Library[] = [];
  selectedLibrary: Library | null = null;
  currentPage = 0;
  pageSize = 50;
  imageUrl = 'assets/bg.webp';
  loading = false;

  constructor(private libraryService: LibraryService, private loader: LoadingService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.currentPage = 0;
    this.libraries = [];
    this.filteredLibraries = [];
    this.loadMore();
  }

  selectLibrary(library: Library) {
    this.selectedLibrary = library;
  }

  loadMore() {
    if (this.loading) return;
    this.loader.loadingOn();
    this.loading = true;
    this.libraryService.getLibraries(this.pageSize, this.currentPage, this.searchTerm).subscribe(data => {
      this.loader.loadingOff();
      this.libraries = [...this.libraries, ...data];
      this.filteredLibraries = [...data];
      this.currentPage++;
      this.loading = false;
    });
  }

  closeLibraryInfo(): void {
    this.selectedLibrary = null;
  }
}
