import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/Model/product.model';
import { CartService } from 'src/app/Service/cart.service';
import { ProductListService } from 'src/app/Service/product-list.service';
import { SearchService } from 'src/app/Service/search.service';
import { environment } from 'src/environments/environment';
import { ProductCartService } from './../../Service/productCart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input()
  productItem!: Product;
  imagUrlProduct = environment.imagUrlProduct;
  item_hearted = false;
  closeResult = '';
  constructor(
    private modalService: NgbModal,
    private CartService: CartService,
    private router: Router,
    private searchService: SearchService,
    private productCartService: ProductCartService
  ) {}
  ngOnInit(): void {}
  onItemAdded() {
    // this.CartService.addToCart(this.productItem);
    this.productCartService.addProduct(this.productItem);
  }
  addToCart(item: Product) {
    this.productCartService.addProduct(item);
  }
  goTodetails(productItem: any) {
    this.router.navigate(['/product-details', productItem.id]); // send id to url
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
