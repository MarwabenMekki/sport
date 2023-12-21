import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  player:any={};
  players:any=[];
  constructor(private router: Router, 
    private playerService:PlayerService) { }

  ngOnInit(): void {
    this.getAll();
  }
  goToDisplay(id:number){

    this.router.navigate([`playerInfo/${id}`]);

  }

  goToEdit(id:number){

    this.router.navigate([`editPlayer/${id}`]);

  }
  delete(id:number){
    this.playerService.deletePlayer(id).subscribe(
      (data)=>{
        console.log("here data after delete",data.isDeleted);
      if(data.isDeleted){
        this.getAll();
      }
 
      }
      
    );
  }

  getAll(){
    this.playerService.getAllPlayers().subscribe(
      (response)=>{
        console.log("here response from BE",response);
        this.players= response.players;
      }
    );
  }
}
