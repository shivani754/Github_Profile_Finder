import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {GithubuserserviceService} from '../githubuserservice.service';
import { BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef}  from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { JsonPipe } from '@angular/common';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

 
  public search;
  public users:any;
  public userFlag=false;
  public userDetail;
  totalItems = 30;
  currentPage = 1;
  page=1;
  perPage=6;
  notEmptyPost=true;
  notscrolly=true;
  count=1;
  //public divFlag=0;
  modalRef: BsModalRef;
  constructor(private router:Router,private userservice:GithubuserserviceService,private modalService: BsModalService,private spinner : NgxSpinnerService) { }

  
  searchUser()
  {

     this.userservice.searchUser1(this.search).subscribe(
       (data:any)=>{this.users=data.items;}
       
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
  onScroll(){
    if(this.notscrolly && this.notEmptyPost){
          this.notscrolly=false;
          console.log("scrolled");
          this.spinner.show();
          this.loadNextPost();
    }
  }
 loadNextPost(){
     
     this.userservice.getnextpage(this.search,this.count).subscribe((result:any )=>{
       const newPost = result;
       console.log(newPost);
       if(newPost.length == 0 ){
         this.notEmptyPost=false;
       }
       Array.prototype.push.apply(this.users,result.items);
       console.log(this.users,newPost.items);
       this.count=this.count+1; 
       this.spinner.hide();
       this.notscrolly=true;
     });

 }
 ngOnInit(): void {
}
}
