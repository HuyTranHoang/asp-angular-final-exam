import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss']
})
export class FilterSortComponent {

  @Input() selectedItem : any
  @Input() listItems : any
  @Input() title : string | undefined
  @Output() itemSelected = new EventEmitter()

  constructor() { }

  onSelected(item: any) {
    this.itemSelected.emit(item)
  }

}
