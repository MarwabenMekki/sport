import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerUrl: string ="http://localhost:3000/players";
  
  constructor(private httpClient: HttpClient) { }

  getAllPlayers(){
        return this.httpClient.get<{players:any}>(this.playerUrl);
      }
    
  getPlayerById(id:any){
      return this.httpClient.get<{player:any}>(`${this.playerUrl}/${id}`);
      }
    
  addPlayer(obj:any){
    console.log("here add player into service",obj);
        return this.httpClient.post<{msg:string}>(this.playerUrl,obj);
      }
    
  editPlayer(obj:any){
      return this.httpClient.put<{isupdated:boolean}>(this.playerUrl,obj);
      }
    
      deletePlayer(id:any){
        return this.httpClient.delete<{isDeleted:boolean }>(`${this.playerUrl}/ ${id}`);
      }
      
}
