import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') content = '';
  @Input() highlightText = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const query = this.highlightText.trim();

    if (!query) {
      this.updateContent(this.content);
      return;
    }

    const escapedQuery = this.escapeRegExp(query);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const highlighted = this.content.replace(regex, '<span class="highlight">$1</span>');

    this.updateContent(highlighted);
  }

  private updateContent(html: string): void {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', html);
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
