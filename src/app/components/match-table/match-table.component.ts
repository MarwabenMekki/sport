import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { matchesData } from 'src/app/data/data';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-table',
  templateUrl: './match-table.component.html',
  styleUrls: ['./match-table.component.css']
})
export class MatchTableComponent implements OnInit {
 match:any={};
 matches:any=[];
  constructor(private router: Router, 
              private matchTableService:MatchService) { }

  ngOnInit(): void {
    // this.matches=matchesData;
    this.getAll();
  }
 
  goToDisplay(id:number){

    this.router.navigate([`matchInfo/${id}`]);
    alert("here match info"+ id);

  }

  goToEdit(id:number){

    this.router.navigate([`editMatch/${id}`]);
    // alert("here edit match"+ id);

  }
  delete(id:number){
    // console.log(`here object number ${id} deleted`);
    // send request to delete match by id
    this.matchTableService.deleteMatch(id).subscribe(
      (data)=>{
        console.log("here data after delete",data.isDeleted);
      // if deleted is OK, send request to get all matches
      if(data.isDeleted){
        this.getAll();
      }
 
      }
      
    );
  }

  getAll(){
    this.matchTableService.getAllMatches().subscribe(
      (response)=>{
        console.log("here response from BE",response);
        this.matches= response.matches;
      }
    );
  }

}
