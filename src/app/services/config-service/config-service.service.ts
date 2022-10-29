import {Injectable} from '@angular/core';
import {IConfig} from "../../models/config";

@Injectable({
	providedIn: 'root'
})
export class ConfigServiceService {

	config: IConfig;

	constructor() {
	}

	// configLoad(): void {
	// 	const jsonFile = `assets/config/config.json`;
	// 	this.http.get(jsonFile).subscribe((data) => {
	// 		if (data && typeof (data) === 'object') {
	// 			ConfigService.config = data;
	// 		}
	// 	})
	// }
}
