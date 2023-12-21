import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { PlayersComponent } from './components/players/players.component';
import { WeatherComponent } from './components/weather/weather.component';
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';

const routes: Routes = [
  //http:localhost:4200: url de base
{path:"",component:HomeComponent},
//http:localhost:4200/login ==>logincomponent va s'afficher
{path:"login",component:LoginComponent},
//http:localhost:4200/subscription ==>signup component va s'afficher
{path:"subscription",component:SignupComponent},
{path:"signupAdmin",component:SignupComponent},
//http:localhost:4200/matches ==>matches component va s'afficher
{path:"matches",component:MatchesComponent},
{path:"dashboard",component:DashboardComponent},
{path:"addMatch",component:AddMatchComponent},
{path:"addPlayer",component:AddPlayerComponent},
{path:"addTeam",component:AddTeamComponent},
{path:"matchInfo/editMatch:id",component:MatchInfoComponent},
{path:"editMatch/:id",component:EditMatchComponent},
{path:"players",component:PlayersComponent},
{path:"searchWeather",component:WeatherComponent},
{path:"addStadium",component:AddStadiumComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
