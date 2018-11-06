import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedDetailComponent } from './feed-detail/feed-detail.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'detail/:id', component: FeedDetailComponent },
  { path: 'feed', component: FeedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
