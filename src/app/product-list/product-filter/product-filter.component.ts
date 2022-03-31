import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { SearchService } from 'src/app/Service/search.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  @Output() changeColorEvent = new EventEmitter<any>();
  @Output() changePriceEvent = new EventEmitter<any>();
  @Output() changeCategoryEvent = new EventEmitter<any>();
  @Output() changeSubCatEvent = new EventEmitter<any>();
  @Output() getAllProductsEvent = new EventEmitter<any>();

  colors: string[] = ['white', 'blue', 'orange','beige','gray','brown','black','green'];
  prices: string[] = [
    'Lowest To Highest Price',
    'Highest To Lowest Price',
  ];
  categoryArray:any[]=[];
  subcategoryArray: any[] = [];
  colorInitial='';
  categoryInitial='';
  priceInitial='';
  subcatInitial='';
  constructor(private searchService:SearchService,private adminService:AdminService) {}
  onColorChange(event: any) {
    this.changeColorEvent.emit({ colorname: event.value, eventType: 'color' });
  }
  onPriceChange(event:any){
    this.changePriceEvent.emit({ priceorder:event.value, eventType:'price'});
  }
  onCategoryChange(event: any) {
    if(event.value==""){ this.subcategoryArray=[];}
    this.changeCategoryEvent.emit({ category_id: event.value, eventType: 'category_id' });
  }
  getSubCategorybyCatID(category_id:any){
    this.adminService.getAllSubCategoriesbyCat(category_id).subscribe(
      (res) => {
        this.subcategoryArray=res.subcategories;
        console.log(this.subcategoryArray);
      },
      (err:any) => {
        console.log(err);
      }
    );
  }
  onSubCategoryChange(event: any) {
    console.log(event.value);
    this.changeSubCatEvent.emit({
      subcategory_id: event.value,
      eventType: 'sub_category_id',
    });
  }
  resetFilters(){
    this.colorInitial='';
    this.categoryInitial='';
    this.priceInitial='';
    this.subcatInitial='';
    this.getAllProductsEvent.emit();
  }

  ngOnInit(): void {
    this.searchService.getAllCategories().subscribe(
      (res) => {
        this.categoryArray = res.category;
      },
      (err: any) => {
        console.log(err);
      }
    );
    // this.searchService.getAllSubCategories().subscribe(
    //   (res) => {
    //     this.subcategoryArray = res.category;
    //   },
    //   (err: any) => {
    //     console.log(err);
    //   }
    // );
  }

}
