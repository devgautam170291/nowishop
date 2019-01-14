import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-breedcrumb',
  templateUrl: './breedcrumb.component.html',
  styleUrls: ['./breedcrumb.component.css']
})
export class BreedcrumbComponent implements OnInit {

  constructor() { }
  @Input() breedcrumb;

  ngOnInit() {
  }

}
