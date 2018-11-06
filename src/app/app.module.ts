import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FeedComponent } from './feed/feed.component';
import { FeedDetailComponent } from './feed-detail/feed-detail.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    FeedComponent,
    FeedDetailComponent,
    CommentsComponent
  ],
  exports: [
    HttpModule,
    HttpClientModule
  ],
  providers: [HttpModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
