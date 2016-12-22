class Collection {

	constructor(elements, meta = {}) {
		this.elements = elements;
		this.meta = meta;
	}

	totalPages() {
		return this.meta.pagination['total-pages'];
	}

	totalItems() {
		return this.meta.pagination['total-items'];
	}

}

export default Collection;
