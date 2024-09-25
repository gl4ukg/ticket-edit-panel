/**
 * SvgIconComponent dynamically loads an SVG icon, allowing customization of color, width, and height.
 * Sanitizes the SVG content to ensure safe HTML rendering.
 */
import { Component, Input, OnInit } from '@angular/core';
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
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.iconPath) {
      this.loadSvg();
    }
  }

  private loadSvg(): void {
    this.httpClient.get(this.iconPath, { responseType: 'text' }).subscribe(
      (svgContent) => {
        const modifiedSvg = this.updateSvgAttributes(svgContent, this.color, this.width, this.height);  // Modify the SVG with provided color and size
        this.safeSvgIcon = this.sanitizer.bypassSecurityTrustHtml(modifiedSvg);
      },
      (error) => {
        console.error('Could not load SVG icon:', error);
      }
    );
  }

  private updateSvgAttributes(svgContent: string, color: string, width: string, height: string): string {
    // Update or add width and height to the SVG tag
    svgContent = svgContent.replace(/<svg[^>]*>/, (svg_tag) => {
      let new_tag = svg_tag;

      if (width) {
        new_tag = new_tag.includes('width=') ? new_tag.replace(/width=".*?"/, `width="${width}"`) : `${new_tag.slice(0, -1)} width="${width}"`;
      }
      if (height) {
        new_tag = new_tag.includes('height=') ? new_tag.replace(/height=".*?"/, `height="${height}"`) : `${new_tag.slice(0, -1)} height="${height}"`;
      }
      return new_tag;
    });

    // Apply stroke color to all elements that can have a stroke within the SVG
    if (color) {
      svgContent = svgContent.replace(/<(circle|rect|line|polyline|polygon|path|ellipse|g)([^>]*)>/g, (match, element, existing_attributes) => {
        if (existing_attributes.includes('stroke=')) {
          return match.replace(/stroke=".*?"/, `stroke="${color}"`);
        } else {
          return `<${element} stroke="${color}"${existing_attributes}>`;
        }
      });
    }

    return svgContent;
  }
}
