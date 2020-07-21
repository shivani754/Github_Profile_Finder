import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GithubuserserviceService} from '../githubuserservice.service';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

 
  public search;
  public users;
  public userFlag=false;
  public divFlag=0;
  constructor(private router:Router,private userservice:GithubuserserviceService) { }

  ngOnInit(): void {
  }
  searchUser()
  {
     this.userservice.searchUser1(this.search).subscribe(
       data=>this.users=data,error=>console.log(error)
       
     )
     this.userFlag=true;
  }
  setDivFlag()
  {
    console.log("sanya");
    this.divFlag=1;
  }
}
