import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'foodFilter' })
export class FilterPipe implements PipeTransform {
  transform(items: string[], value: string): string[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    value = value.toLocaleLowerCase();

    return items.filter(element => {
      return element.toLocaleLowerCase().includes(value);
    });
  }
}
