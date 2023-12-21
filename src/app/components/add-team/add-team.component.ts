import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
// object
team:any={};
// id form
addTeamForm!:FormGroup;
  constructor(private teamService: TeamService,
    private router:Router) { }

  ngOnInit(): void {
  }

  //function will be executed when button is clicked
  addTeam(){
    // console.log("here add team",this.team);
    this.teamService.addTeam(this.team).subscribe(
      (data)=>{
        console.log("here data from BE",data.msg);
        this.router.navigate(['dashboard']);
      });
  }

}
