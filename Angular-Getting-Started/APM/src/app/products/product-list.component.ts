import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;


    constructor(
      private productService: ProductService
    ) {
    }
  

    /**
     * Private backing variables
     */

    private _listFilter: string = '';

    /**
     * Getter / Setter logic for pvt backing variables
     */
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    /**
     * Component methods:
     */
    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }

    ngOnInit(): void {
      /**
       * Async operation to subscribe to IProduct observable via http
       */
      this.sub = this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      })
    }

    ngOnDestroy(): void {
      //Unsubscribe from the http observable when we navigate away from the componenet
      this.sub.unsubscribe();
    }
}