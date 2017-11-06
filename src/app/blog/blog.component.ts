import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  message;
  messageClass;
  newPost = false;
  loadingBlogs = false;

  constructor() { }

  newBlogForm(){
    this.newPost = true;
  }

  reloadBlogs(){
    this.loadingBlogs = true;
    // Get all blogs
    setTimeout(()=>{
      this.loadingBlogs = false;
    },4000);
  }

  draftComment(){
    
  }

  ngOnInit() {
  }

}