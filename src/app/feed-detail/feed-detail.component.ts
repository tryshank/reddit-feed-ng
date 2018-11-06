import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.css']
})
export class FeedDetailComponent implements OnInit {
  feedEntry: Object;

  constructor(private feedService: FeedService, private location: Location) {}

  ngOnInit(): void {
    this.getFeed();
  }

  getFeed(): void {
    this.feedService.currentFeedEntry.subscribe(
      feedEntry => (this.feedEntry = feedEntry)
    );
  }

  goBack(): void {
    this.location.back();
  }
}
