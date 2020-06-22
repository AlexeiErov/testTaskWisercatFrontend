import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterCollectionSearchValues } from '../search/SearchObjects';
import { FilterCollection } from 'src/app/model/filter-collection.model';
import { Observable } from 'rxjs';
import { FilterCollectionDAO } from '../interface/FilterCollectionDAO';

@Injectable({
  providedIn: 'root'
})
export class FilterCollectionService implements FilterCollectionDAO{

  url = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  findFilterCollections(filterCollectionSearchValues: FilterCollectionSearchValues) {
    return this.httpClient.post<FilterCollection[]>(this.url + '/search', filterCollectionSearchValues);
  }

  add(t: FilterCollection): Observable<FilterCollection> {
    return this.httpClient.post<FilterCollection>(this.url + '/add', {title: t.title, filters: JSON.stringify(t.filters)});
  }

  delete(id: number): Observable<FilterCollection> {
    return this.httpClient.delete<FilterCollection>(this.url + '/delete/' + id);
  }

  get(id: number): Observable<FilterCollection> {
    return this.httpClient.get<FilterCollection>(this.url + '/id/' + id);
  }

  getAll(): Observable<FilterCollection[]> {
    return this.httpClient.get<FilterCollection[]>(this.url + '/all');
  }
  update(t: FilterCollection): Observable<FilterCollection> {
    return this.httpClient.put<FilterCollection>(this.url + '/update', {title: t.title, filters: JSON.stringify(t.filters), id: t.id});
  }

}
