export default class BaseRepository {
  constructor() {
    this.data = [];
  }

  find(id) {
    const result = this.data.find((entity) => entity.id === id);
    if (!result) {
      throw new Error('Entity not found');
    }
    return result;
  }

  save(entity) {
    this.data.push(entity);
  }
}
