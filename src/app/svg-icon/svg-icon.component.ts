import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  template: `<div [innerHTML]="safeSvgIcon" class="svg-icon"></div>`,
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {
  @Input() iconPath!: string;
  @Input() color!: string;  // Add color input
  @Input() width!: string;  // Width input
  @Input() height!: string; // Height input

  safeSvgIcon: SafeHtml | null = null;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.iconPath) {
      this.loadSvg();
    }
  }

  private loadSvg(): void {
    this.httpClient.get(this.iconPath, { responseType: 'text' }).subscribe(
      (svgContent) => {
        let modifiedSvg = this.updateSvgAttributes(svgContent, this.color, this.width, this.height);  // Modify the SVG with provided color and size
        this.safeSvgIcon = this.sanitizer.bypassSecurityTrustHtml(modifiedSvg);
      },
      (error) => {
        console.error('Could not load SVG icon:', error);
      }
    );
  }

  private updateSvgAttributes(svgContent: string, color: string, width: string, height: string): string {
    // Modify the stroke color
    if (color) {
      svgContent = svgContent.replace(/stroke=".*?"/g, `stroke="${color}"`);
    }
    // In case width and height attributes don't exist, we insert them into the <svg> tag
    if (!svgContent.includes('width=')) {
      svgContent = svgContent.replace('<svg', `<svg width="${width}"`);
    }
    if (!svgContent.includes('height=')) {
      svgContent = svgContent.replace('<svg', `<svg height="${height}"`);
    }

    return svgContent;
  }
}
