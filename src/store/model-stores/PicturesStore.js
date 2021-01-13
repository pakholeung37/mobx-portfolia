import { observable, action } from "mobx";

class PicturesStore {
  @observable
  selectedPicture = {};

  @observable
  picturesRegistry = [];

  constructor() {
    console.log(this.picturesRegistry);
  }
  @action
  makeFavorite(pictureId) {
    this.picturesRegistry.forEach((p) => {
      if (p.id === pictureId) p.isFavorite = true;
    });
  }

  @action
  makeUnfavorite(pictureId) {
    this.picturesRegistry.forEach((p) => {
      if (p.id === pictureId) p.isFavorite = false;
    });
  }
}

export default PicturesStore;
