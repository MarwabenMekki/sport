import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
// object
player:any={};
teamsTab: any=[];
teamId:any;
// id form
addPlayerForm!:FormGroup;

  constructor(private playerService: PlayerService,
    private teamService: TeamService,
    private router:Router) { }

  ngOnInit(): void {
this.teamService.getAllTeams().subscribe((data)=>{
  this.teamsTab= data.teams;
})
  }

  //function will be executed when button is clicked
  addPlayer(){
    console.log("here add player",this.player);
    this.player.idTeam= this.teamId;
    this.playerService.addPlayer(this.player).subscribe(
      (data)=>{
        console.log("here data from BE",data.msg);
        this.router.navigate(["dashboard"]);
      }
    )
  }

selectTeam(evt:any){
  console.log("here event",evt.target.value);
  this.teamId= evt.target.value;
}
}
