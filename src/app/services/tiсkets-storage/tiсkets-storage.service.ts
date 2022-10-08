import { Injectable } from '@angular/core';
import {ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {

	private ticketStorage: ITour[]

  constructor() { }
}
