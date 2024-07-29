// capitalize.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    // Capitalize the first character and convert the rest to lowercase
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
