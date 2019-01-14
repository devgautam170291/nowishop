import { Component, OnInit } from '@angular/core';
declare let AmCharts: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./../admin.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }


  ngOnInit() {
  	this.showTopCategories();
  	this.showTopCountries();
  }

  showTopCategories(){
  	var chart = AmCharts.makeChart( "top-cat", {
	  "type": "serial",
	  "theme": "light",
	  "backgroundColor": "#ffffff",
	  "dataProvider": [ {
	    "category": "Mobiles",
	    "sold": 2025
	  }, {
	    "category": "Men's Grooming",
	    "sold": 1882
	  }, {
	    "category": "Men's Inner Wears",
	    "sold": 1809
	  }, {
	    "category": "Camera",
	    "sold": 1322
	  }, {
	    "category": "Kids Clothing",
	    "sold": 1122
	  }, {
	    "category": "Men's Shoes",
	    "sold": 1114
	  }, {
	    "category": "Home Decor",
	    "sold": 984
	  }, {
	    "category": "Furnishing",
	    "sold": 711
	  }, {
	    "category": "Women's Shoes",
	    "sold": 665
	  }, {
	    "category": "Refrigerator",
	    "sold": 580
	  } ],
	  "valueAxes": [ {
	    "gridColor": "#FFFFFF",
	    "gridAlpha": 0.2,
	    "dashLength": 0
	  } ],
	  "gridAboveGraphs": true,
	  "startDuration": 1,
	  "graphs": [ {
	    "balloonText": "[[category]]: <b>[[value]]</b>",
	    "fillAlphas": 1,
	    "lineAlpha": 0.1,
	    "type": "column",
	    "valueField": "sold"
	  } ],
	  "depth3D": 20,
	  "angle": 30,
	  "chartCursor": {
	    "categoryBalloonEnabled": false,
	    "cursorAlpha": 0,
	    "zoomable": false
	  },
	  "categoryField": "category",
	  "categoryAxis": {
	    "gridPosition": "start",
	    "gridAlpha": 0,
	    "labelRotation": 90,
	    "tickPosition": "start",
	    "tickLength": 20
	  },
	  "export": {
	    "enabled": true
	  }

	} );
  }

  showTopCountries(){
  	var chart = AmCharts.makeChart( "top-countries", {
  "type": "pie",
  "theme": "light",
  "dataProvider": [ {
    "country": "India",
    "value": 260
  }, {
    "country": "Thailand",
    "value": 201
  }, {
    "country": "Germany",
    "value": 65
  }, {
    "country": "Australia",
    "value": 39
  }, {
    "country": "UK",
    "value": 19
  }, {
    "country": "Latvia",
    "value": 10
  } ],
  "valueField": "value",
  "titleField": "country",
  "outlineAlpha": 0.4,
  "depth3D": 15,
  "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
  "angle": 30,
  "export": {
    "enabled": true
  }
} );
  }

}
