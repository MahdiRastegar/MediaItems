import {Component} from 'angular2/core';
import {MediaItemComponent} from './media-item.component';
import {CategoryListPipe} from './category-list.pipe';
import {MediaItemService} from './media-item.service';
import {RouteParams, ROUTER_DIRECTIVES,Router} from 'angular2/router';

@Component({
    selector: 'media-item-list',
    directives: [MediaItemComponent, ROUTER_DIRECTIVES],
    pipes: [CategoryListPipe],
    templateUrl: 'app/media-item-list.component.html',
    styleUrls: ['app/media-item-list.component.css']
})
export class MediaItemListComponent {
    medium = '';
    mediaItems = [];
    
    constructor(private mediaItemService: MediaItemService,
        private routeParams: RouteParams,
        private router:Router) {}
    
    ngOnInit() {
        this.medium = this.routeParams.get('medium');
        this.getMediaItems(this.medium);
    }

    onMediaItemDeleted(mediaItem) {
        this.mediaItemService.delete(mediaItem)
            .subscribe(() => {
                this.getMediaItems(this.medium);
            });
    }
    onMediaItemEdited(mediaItem) {
        this.router.navigate(['../EditMediaItem',{id:mediaItem.id}])
        
    }
    
    getMediaItems(medium) {
        this.medium = medium;
        this.mediaItemService.get(medium)
            .subscribe(mediaItems => {
                this.mediaItems = mediaItems;
            });
    }
}