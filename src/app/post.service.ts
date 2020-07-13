import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/Operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {

    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        this.http
        .post<{name: string}>(
            'https://ng-complete-guide-a5737.firebaseio.com/posts.json',
            postData
            )
            .subscribe(
                responseData => {
                  console.log(responseData);
                }, error => {
                    this.error.next(error.message);
                },
            );
        }
        
        fetchPost() {
            return this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-a5737.firebaseio.com/posts.json'
                )
                .pipe(
                    map(responseData => {
                        const postsArray: Post[] = [];
                        for (const key in responseData) {
                            if (responseData.hasOwnProperty(key)) {
                                // add new field named id with have value of key
                                postsArray.push({ ...responseData[key], id: key })
                            }
                        }
                        return postsArray;
                    }))
                    // ,
                // catchError(errorRes => {
                //     // Send to analytics server
                //     return throwError(errorRes);
                // })
                    
        }
                
                
    deletePosts() {
        return this.http.delete('https://ng-complete-guide-a5737.firebaseio.com/posts.json');
    }

}
            
            