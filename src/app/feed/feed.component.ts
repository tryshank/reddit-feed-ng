import { Component, OnInit, Input } from '@angular/core';

import { FeedService } from '../feed.service';
import { CommentsService } from '../comments.service';
import { FeedEntry } from '../feed-entry';
import { Router } from '@angular/router';

import { format } from 'date-fns';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  dataSource: any[];
  feedEntry: FeedEntry;
  @Input()
  category: String = 'ElonMusk';
  @Input()
  limit: number = 10;
  after: String;
  before: String;
  count: number = 0;

  constructor(private feedService: FeedService, private commentsService: CommentsService, private router: Router) { }

  ngOnInit() {
    this.count += this.limit;

    this.getFeed();
    this.feedService.currentFeedEntry.subscribe(
      feedEntry => (this.feedEntry = feedEntry)
    );
  }

  getFeed(): void {
    const redditFeedConfig = {
      category: this.category,
      limit: this.limit,
      after: this.after,
      before: this.before
    };
    this.feedService.getPosts(redditFeedConfig).subscribe(res => {
      this.dataSource = res.json().data.children.map(elem => ({
        id: elem.data.name,
        thumbnail: elem.data.thumbnail,
        created: format(elem.data.created * 1000, 'DD.MM.YYYY'),
        num_comments: elem.data.num_comments,
        author: elem.data.author,
        score: elem.data.score,
        permalink: elem.data.permalink,
        selftext: elem.data.selftext,
      }));
    });
  }

  getFeedEntry(feedEntry: FeedEntry): void {
    this.feedService.setFeedEntry(feedEntry);
    this.commentsService.getComments(feedEntry.permalink);
    this.router.navigate([`/detail/${feedEntry.id}`]);
  }

  goPrev(): void {
    this.count -= this.limit;
    this.after = undefined;
    this.before = this.dataSource[0].id;

    this.getFeed();
  }

  goNext(): void {
    this.count += this.limit;
    this.before = undefined;
    this.after = this.dataSource[this.dataSource.length - 1].id;

    this.getFeed();
  }

  updateLimit(): void {
    this.count = this.limit;
    this.getFeed();
  }

}
