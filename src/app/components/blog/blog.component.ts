import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  articles: any= [];
  a: any={};
  constructor() { }

  ngOnInit(): void {

    this.articles=[
      {id:"1", date:"May 20, 2020",title:"titre 1",description:"description 1"},
      {id:"2", date:"May 20, 2020",title:"titre 2",description:"description2"}
     ];
 
  }

}
