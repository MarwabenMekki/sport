import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
// object
 match:any={};
 // id form
 addMatchForm!:FormGroup;
  constructor(private matchService:MatchService,
    private router:Router ) { }

  ngOnInit(): void {

  }

  //function will be executed when button is clicked
  addMatch(){
 this.matchService.addMatch(this.match).subscribe(
  (data)=>{
    console.log("here data from BE",data.msg);
    this.router.navigate(['dashboard']);
});

  }
}
