import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {GithubuserserviceService} from '../githubuserservice.service';
import { BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef}  from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

 
  public search;
  public users;
  public userFlag=false;
  public userDetail;
  totalItems = 30;
  currentPage = 1;
  page=1;
  perPage=6;
  //public divFlag=0;
  modalRef: BsModalRef;
  constructor(private router:Router,private userservice:GithubuserserviceService,private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  searchUser()
  {

     this.userservice.searchUser1(this.search).subscribe(
       data=>{this.users=data;}
       
     )
     this.userFlag=true;
  }
  highToLow()
  {
    this.userservice.highToLow(this.search);
  }
  openModal(template: TemplateRef<any>,username)
  {
   // console.log(username);
    this.modalRef = this.modalService.show(template);
    this.userservice.userDetail(username).subscribe(
       data=>{this.userDetail=data;
        console.log(this.userDetail);
      })
  }

  setPage(event)
  {
    this.page=event;
  }
}
