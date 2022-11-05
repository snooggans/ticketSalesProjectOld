export interface ITour {
	id: string,
	name: string,
	description: string,
	tourOperator: string,
	price: string,
	img: string,
	type: string,
	date: string
}

export interface ITourTypeSelect {
	label?: string,
	value?: string,
	date?: string
}

export interface INearestTour extends ITour{
	locationId: string
}

export interface ITourLocation {
	name: string,
	id: string
}