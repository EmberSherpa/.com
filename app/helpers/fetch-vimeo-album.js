import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Helper.extend({
  vimeo: inject.service(),
  compute(params) {
    let videos = this.get('videos');
    if (videos) {
      return videos;
    }

    const vimeo = this.get('vimeo');
    let [ albumName ] = params;
    vimeo.fetchVideosFromAlbum(albumName)
      .then((videos)=>{
        this.set('videos', videos);
        this.recompute();
      });
  }
});
