import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.css']
})
export class SectionTitleComponent implements OnInit {

  constructor() { }

  @Input() titleColor;
  @Input() titleBg;
  @Input() value;
  @Input() dimention;

  ngOnInit() {
  }

}
