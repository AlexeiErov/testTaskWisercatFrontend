import { CommonDAO } from './CommonDAO';
import { FilterCollection } from 'src/app/model/filter-collection.model';
import { Observable } from 'rxjs';
import { FilterCollectionSearchValues } from '../search/SearchObjects';

export interface FilterCollectionDAO extends CommonDAO<FilterCollection> {

    findFilterCollections(filterCollectionSearchValues: FilterCollectionSearchValues): Observable<any>;
}