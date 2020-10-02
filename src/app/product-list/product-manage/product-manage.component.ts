import {Component, OnInit} from '@angular/core';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';
import {computeStartOfLinePositions} from '@angular/compiler-cli/ngcc/src/sourcemaps/source_file';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {
  nameProductKeySearch: '';
  posterKeySearch: '';
  suggestions: boolean;
  arrProductSuggest: string[];

  constructor() {
  }

  ngOnInit(): void {
  }

  search(arr: string[]): void {

  }

  searchAuto(key: string): void {

  }

  hasSuggest(sg: boolean): void {
    this.suggestions = sg;
    this.arrProductSuggest = [];
  }

  findSuggest(key: string): void {
    this.arrProductSuggest = [];
    if (key === undefined) {
      key = '';
    }
    if (key !== '') {
      const a = Math.random() * 10;
      for (let i = 0; i < a; i++) {
        this.arrProductSuggest.push('khanh nè');
      }
    }
  }
}
