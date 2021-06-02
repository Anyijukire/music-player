let now=document.querySelector(".now");
let track_art=document.querySelector(".track-art");
let namee=document.querySelector(".name");
let artiste=document.querySelector(".artist");

let pauseBtn=document.querySelector(".pause")
let nextBtn=document.querySelector(".next")
let prevBtn=document.querySelector(".previous")

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".time");
let total_duration = document.querySelector(".total-duration");
 
let track_index =0;
let isPlaying=false;
let updateTimer;

let curr_track=document.createElement('audio');

let track_list = [
    {
        name:"fresh_wind",
        artist:"Hilsong",
        image:"Image URL",
        path: "fresh_wind.mp3"
    },
    {
        name: "new_wine",
        artist: "Hilsong",
        image: "Image URL",
        path: "new_wine.mp3"
    },
    {
        name: "oceans",
        artist: "Hilsong",
        image: "Image URL",
        path: "oceans.mp3",
      },
];

function loadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage =
     "url(" + track_list[track_index].image + ")";
  namee.textContent = track_list[track_index].name;
  artiste.textContent = track_list[track_index].artist;
  now.textContent =
     "PLAYING " + (track_index + 1) + " OF " + track_list.length;
   
   updateTimer=setInterval(seekUpdate, 1000);
   
   curr_track.addEventListener("ended", nextTrack);

   random_bg_color();
}

function random_bg_color(){
    let red= Math.floor(Math.random()*256) + 64;
    let green= Math.floor(Math.random()* 256) +64;
    let blue= Math.floor(Math.random()* 256) +64;

    let bgcolor= "rgb(" +red + ", " +green + ", " + blue + ")";
    document.body.style.background= bgcolor;
}

function resetValues(){
    curr_time.textContent="00:00";
    total_duration.textContent="00:00"
    seek_slider.value=0;
}

function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
   
  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
   
    // Replace icon with the pause icon
    pauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
   
  function pauseTrack() {
   curr_track.pause();
    isPlaying = false;  
  
    pauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
   
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
   
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
   
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length;
     
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
function seekTo(){
    seekto=curr_track.duration* (seek_slider.value /100);
    curr_track.currentTime=seekto
}
function setVolume(){
curr_track.volume= volume_slider.value/100;
}
function seekUpdate(){
    let seekPosition =0;

    if(!isNaN(curr_track.duration)) {
        seekPosition=curr_track.currentTime* (100/curr_track.duration);
        seek_slider.value=seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
loadTrack(track_index);
