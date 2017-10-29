import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MediaItemService {
    constructor(private http: Http) {}
    
    get(medium) {
        var searchParams = new URLSearchParams();
        searchParams.append('medium', medium);
        return this.http.get('mediaitems', {search: searchParams})
            .map(response => {
                return response.json().mediaItems;
            });
    }
    
    add(mediaItem) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('mediaitems', JSON.stringify(mediaItem), { headers: headers })
            .map(response => {});
    }
    
    delete(mediaItem) {
        return this.http.delete(`mediaitems/${mediaItem.id}`)
            .map(response => {});
    }
}