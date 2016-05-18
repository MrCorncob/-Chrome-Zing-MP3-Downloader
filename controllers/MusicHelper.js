var MusicHelper = function(){
  this.name = 'Music Helper Class';
  return this;
}

MusicHelper.prototype.getSongData = function(songID){
  console.log('Get song data from API');
}

MusicHelper.prototype.getAlbumData = function(albumID){
  console.log('Get album data from API');
}
