import {Component, Inject} from 'angular2/core';
import {Control, Validators, FormBuilder} from 'angular2/common';
import {MediaItemService} from './media-item.service';
import {LOOKUP_LISTS} from './providers';
import {Router,RouteParams} from 'angular2/router'

@Component({
    selector: 'media-item-form',
    templateUrl: 'app/media-item-form.component.html',
    styleUrls: ['app/media-item-form.component.css']
})
export class MediaItemFormComponent {
    form;
    idMI;

    constructor(private formBuilder: FormBuilder,
        private mediaItemService: MediaItemService,
        @Inject(LOOKUP_LISTS) public lookupLists,
        private routeParams: RouteParams,
        private router:Router) {}

    ngOnInit() {
        this.idMI= this.routeParams.get('id');
        if(this.idMI==null)
        {            
        this.form = this.formBuilder.group({
            'medium': new Control('Movies'),
            'name': new Control('', Validators.compose([
                Validators.required, 
                Validators.pattern('[\\w\\-\\s\\/]+')
                ])),
            'category': new Control(''),
            'year': new Control('', this.yearValidator),
            'description': new Control(''),
        });
    }
        else
        {            
        this.mediaItemService.getmediaItem(this.routeParams.get('id'))
        .subscribe(mediaItems => {          
        this.form = this.formBuilder.group({
            'medium': new Control(mediaItems[0].medium),
            'name': new Control(mediaItems[0].name, Validators.compose([
                Validators.required, 
                Validators.pattern('[\\w\\-\\s\\/]+')
                ])),
            'category': new Control(mediaItems[0].category),
            'year': new Control(String((mediaItems[0].year==null)?'':mediaItems[0].year), this.yearValidator),
            'description': new Control(mediaItems[0].description),
        });
    });
}
    }
    
    yearValidator(control) {
        if (control.value.trim().length === 0) return null;
        var year = parseInt(control.value);
        var minYear = 1800;
        var maxYear = 2500;
        if (year >= minYear && year <= maxYear) return null;
        return {'year': { 'min': minYear, 'max': maxYear }};
    }

    onSubmit(mediaItem) {
        if(this.idMI==null)
        this.mediaItemService.add(mediaItem)
            .subscribe(() => {
                this.router.navigate(['../List',{medium:mediaItem.medium}])
            });
        else
            this.mediaItemService.edit(this.idMI,mediaItem)
            .subscribe(() => {
                this.router.navigate(['../List',{medium:mediaItem.medium}])
            });
    }
}