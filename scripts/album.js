 // Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var albumMuse = {
     title: 'Supermassive Blackhole',
     artist: 'Muse',
     label: 'Warner Bros.',
     year: '2006',
     albumArtUrl: 'assets/images/album_covers/18.png',
     songs: [
         { title: 'Take a Bow', duration: '4:35' },
         { title: 'Starlight', duration: '4:00' },
         { title: 'Supermassive Black Hole', duration: '3:29'},
         { title: 'Knights of Cydonia', duration: '6:07' },
         { title: 'Glorious', duration: '4:41'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
    
     var clickHandler = function(){
         var songNumber = $(this).attr('data-song-number');
         
         if(currentlyPlayingSong !== null) {
             //Revert to song number for currently playing song because user started playing new song.
             var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
             currentlyPlayingCell.html(currentlyPlayingSong);
         }
         
         if(currentlyPlayingSong !== songNumber){
             //Switch from Play -> Pause button to indicate new song is playing
             $(this).html(pauseButtonTemplate);
             currentlyPlayingSong = songNumber;
         } else if (currentlyPlayingSong === songNumber){
             //Switch from Pause -> Play to pause currently playing song.
             $(this).html(playButtonTemplate);
             currentlyPlayingSong = null;
         }
     };
    
     var onHover = function(event){
         var songNumberCell = $(this).find('.song-item-number');
         //why is data-song-number not selected as a class?
         var songNumber = songNumberCell.attr('data-song-number')
         
         if(songNumber !== currentlyPlayingSong) {
             songNumberCell.html(playButtonTemplate);
         }
     };
     
     var offHover = function(event){
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
     };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    
    return $row;
 };

     // Select elements that we want to populate with text dynamically

     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

 var setCurrentAlbum = function(album) {

     // Assign values to each part of the album (text,images)
     
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // Clear contents of the album song list container
     
     $albumSongList.empty();
 
     // Build list of songs from album javascript object
     
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration)
         $albumSongList.append($newRow);
     }
 };


// Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
 var currentlyPlayingSong = null;

 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     
     var albums = [albumPicasso, albumMarconi,albumMuse];
     var index = 1;
     albumImage.addEventListener("click", function(event) {
         setCurrentAlbum(albums[index]);
         index++;
         if(index == albums.length) {
             index = 0;
         };
     });

 });

