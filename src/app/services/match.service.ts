import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // backend adress
  matchUrl: string ="http://localhost:3000/matches";
  // httpClient est le livreur 
  constructor(private httpClient: HttpClient) { }

  getAllMatches(){
// récuperer tous les matchs
    return this.httpClient.get<{matches:any}>(this.matchUrl);
  }

  getMatchById(id:any){
// récupérer un seul objet
  return this.httpClient.get<{match:any}>(`${this.matchUrl}/${id}`);
  }

  addMatch(obj:any){
// envoyer un objet à l'adresse
console.log("here add match into service",obj);
    return this.httpClient.post<{msg:string}>(this.matchUrl,obj);
  }

  editMatch(obj:any){
    // modifier un objet
  return this.httpClient.put<{isupdated:boolean}>(this.matchUrl,obj);
  }

  deleteMatch(id:any){
    return this.httpClient.delete<{isDeleted:boolean }>(`${this.matchUrl}/ ${id}`);
  }
  
}
