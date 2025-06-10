import { Component, Input } from '@angular/core';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-loader',
    imports: [
        NgIf
    ],
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader {
   @Input() showLoader: boolean = false
}
