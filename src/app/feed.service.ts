import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { FeedEntry } from './feed-entry';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private baseUrl = 'https://www.reddit.com/r';
  private feedEntrySource = new BehaviorSubject<FeedEntry>(null);
  currentFeedEntry: Observable<FeedEntry> = this.feedEntrySource.asObservable();

  constructor(private http: Http) {}

  /** GET reddit feed from the url */
  getPosts(redditFeedConfig) {
    const { category, limit, before, after } = redditFeedConfig;
    console.log(redditFeedConfig)
    if (before) {
      return this.http.get(
        `${this.baseUrl}/${category}.json?limit=${limit}&before=${before}`
      );
    } else if (after) {
      return this.http.get(
        `${this.baseUrl}/${category}.json?limit=${limit}&after=${after}`
      );
    } else {
      return this.http.get(`${this.baseUrl}/${category}.json?limit=${limit}`);
    }
  }

  setFeedEntry(feedEntry) {
    this.feedEntrySource.next(feedEntry);
  }
}
