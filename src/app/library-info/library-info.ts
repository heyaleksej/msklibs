import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Library } from "../services/api.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-library-info',
  imports: [
    NgIf
  ],
  templateUrl: './library-info.html',
  styleUrl: './library-info.scss'
})
export class LibraryInfo {
  @Input() library: Library | null = null;
  @Output() close  = new EventEmitter<boolean>()
}
