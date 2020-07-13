import { PostService } from './post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  // Subject error from post service
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })
    this.isFetching = true;
    // Send Http reques
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false; 
      this.loadedPosts = posts;
    }, error => {
      this.error = error.error.error;
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
    }, error => {
      this.error = error.message;
      console.log(error);
      
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

}
