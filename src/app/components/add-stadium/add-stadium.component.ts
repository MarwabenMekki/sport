import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StadiumService } from 'src/app/services/stadium.service';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {
  stadiumForm!:FormGroup;
  stadium:any={};
  constructor(private stadiumService: StadiumService) { }

  ngOnInit(): void {
  }
  addStadium(){
    console.log("here stadium object",this.stadium);
    this.stadiumService.addStadium(this.stadium).subscribe();
    
  }
}
