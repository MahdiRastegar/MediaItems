import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FavoriteDirective} from './favorite.directive';

@Component({
    selector: 'media-item',
    directives: [FavoriteDirective],
    templateUrl: 'app/media-item.component.html',
    styleUrls: ['app/media-item.component.css']
})
export class MediaItemComponent {
    @Input('mediaItemToWatch') mediaItem;
    @Output('deleted') delete = new EventEmitter();
    @Output('edited') edit = new EventEmitter();
    
    onDelete() {
        this.delete.emit(this.mediaItem);
    }
    onEdit() {
        this.edit.emit(this.mediaItem);
    }
}