export interface CatsArgs {
	limit?: number;
	page?: number;
	order?: 'ASC' | 'DESC' | 'RAND';
	has_breeds?: 1 | 0;
	breed_ids?: string;
	category_ids?: string;
	sub_id?: string;
}

export interface Cat {
	id: string;
	url: string;
	width: number;
	height: number;
}
