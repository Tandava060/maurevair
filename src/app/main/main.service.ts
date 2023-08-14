import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainService{
  flight = this.httpClient.get('api/flight')
  constructor(private httpClient: HttpClient) {

  }

}
