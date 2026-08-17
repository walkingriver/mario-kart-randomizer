import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enum',
  standalone: true,
})
export class EnumPipe implements PipeTransform {
  transform(value: object): number[] {
    return Object.values(value).filter(
      (entry): entry is number => typeof entry === 'number'
    );
  }
}
