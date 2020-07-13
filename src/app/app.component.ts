import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.isFetching = true; 
    // Send Http reques
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false; 
      this.loadedPosts = posts;
    })
  }

  onCreatePost(postData: Post) {
    console.log(postData);
    // Send Http reques
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true; 
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false; 
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
