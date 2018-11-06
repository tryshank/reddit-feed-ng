import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Comment } from './comment';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private baseUrl = 'https://www.reddit.com';
  comments: Comment[] = [];

  constructor(private http: Http) {}

  /** GET comments for entry */
  public getComments(feedEntryCommentsUrl) {
    const url = `${this.baseUrl}${feedEntryCommentsUrl}`;
    this.http
      .get(`${url.slice(0, -1)}.json`)
      .subscribe(res =>
        res
          .json()[1]
          .data.children.map(comment =>
            this.comments.push({
              author: comment.data.author,
              text: comment.data.body
            })
          )
      );
  }
}
