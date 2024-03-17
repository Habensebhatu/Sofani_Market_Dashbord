import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(file: File) {
    const url = URL.createObjectURL(file);
    return this.sanitizer.sanitize(SecurityContext.URL, url);
  }
}
