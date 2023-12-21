import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
teamsTab: any=[];
  constructor(private teamServices:TeamService) { }

  ngOnInit(): void {
    this.teamServices.getAllTeams().subscribe((response)=>{
      console.log("here response after adding",response);
      this.teamsTab=response.teams;
    });
  }

}
