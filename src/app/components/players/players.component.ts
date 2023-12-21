import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  playersTab:any= [];

  constructor(private playerService:PlayerService) { }

  ngOnInit(): void {

    // this.playersTab=[
    //   {name:"Messi", position:"GK", age:36},
    //   {name:"CR", position:"DEF", age:34},
    //   {name:"Mbappé", position:"ATK", age:24}
    // ];
 // this.matches=matchesData;
 this.playerService.getAllPlayers().subscribe(
  (data)=>{
    console.log("here data from BE",data);
    this.playersTab= data.players;
  })
}
updateMatches(T:any){
this.playersTab = T;
  }

}
