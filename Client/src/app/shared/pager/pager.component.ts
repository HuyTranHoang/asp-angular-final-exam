import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Pagination } from '../../models/pagination'

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() pagination: Pagination | undefined
  @Output() pageChanged = new EventEmitter<number>()


  getMax(currentPage: number, itemsPerPage: number, totalItems: number) {
    return Math.min(currentPage * itemsPerPage, totalItems)
  }
  onPageChanged(event: any) {
    this.pageChanged.emit(event.page)
  }

}
