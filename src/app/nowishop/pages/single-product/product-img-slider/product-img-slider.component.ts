import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-img-slider',
  templateUrl: './product-img-slider.component.html',
  styleUrls: ['./product-img-slider.component.css']
})
export class ProductImgSliderComponent implements OnInit {

  constructor() { }

  @Input() variationImages;

  ngOnInit() {
    
  }

}
