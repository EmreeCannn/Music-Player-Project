const audio=document.querySelector("audio");
const play=document.querySelector("#play");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
const progres=document.getElementById("progres");
const current_time=document.getElementById("current_time");
const img=document.querySelector("img");
const title=document.querySelector(".title");
const creator=document.getElementById("creator");
const total_time=document.getElementById("total_time");
const progres_div=document.getElementById("progres_div");
let current_song_index=1;

const songs=[{
    name:"bloke3",
    title:"Naptığını Bilmesemde",
    creator:"Bloke3",
},
{
    name:"çakal",
    title:"Cuma Official Music",
    creator:"Çakal",
},
{
    name:"aleynatilki",
    title:"Başıma Belasın",
    creator:"Aleyna Tilki",
}
];

function loadSong(song){
    title.textContent=song.title;
    creator.textContent=song.creator;
    audio.src=`${song.name}.mp3`;
    img.src=`${song.name}.jpg`;
}

loadSong(songs[current_song_index]);

let is_playing=false;

function playsong(){
    is_playing=true;
    if(audio.canPlayType){
        // canPlayType ile  broweserim video veya mp3 oyntabiliyor mu bana true veya false değer döndürür
        audio.play();       
    }
}

// audio.loop=true;
// müzik bitince tekrar baştan çalmasını sağlar 



function pausesong(){
    is_playing=false;
    audio.pause();
}


function prevSong(){
    play.classList.replace("fa-play","fa-pause");
    current_song_index--;
    if(current_song_index<0){
        current_song_index=songs.length-1;
    }
    loadSong(songs[current_song_index]);
     playsong();
}
function nextSong(){
    play.classList.replace("fa-play","fa-pause");
    current_song_index++;
    if(current_song_index>songs.length-1){
        current_song_index=0;
    }
    loadSong(songs[current_song_index]);
     playsong();
}
function update_progres(e){
    if(is_playing){
        console.log(audio.duration);
      progres.style.width=`${(audio.currentTime/audio.duration)*100}%`
      const duration_second=Math.floor(audio.duration%60);
      const duration_minute=Math.floor(audio.duration/60);
      if(duration_second<10){
        total_time.textContent=`${duration_minute}:0${duration_second}`
      }
      if(duration_minute){
        // ilk başta NaN değerini almamak için bunu yaptım 
        total_time.textContent=`${Math.floor(audio.duration/60)}:${duration_second}`
      }

      const currentMinutes=Math.floor(audio.currentTime/60);
      let currentSecond=Math.floor(audio.currentTime%60);
      if(currentSecond<10){
        currentSecond=`0${currentSecond}`;
      }
      if(currentSecond){
        current_time.textContent=`${currentMinutes}:${currentSecond}`
      }
    }
}
function setprogres(e){
    // console.log(e);
    const width=e.srcElement.clientWidth;
    // ana genişliğine clientWidth ile  erişebilirim
    const clickX=e.offsetX;
    console.log(width);
    console.log(clickX);
    // tıkladığım yeri toplam genişliğe bölüp duration ile çarpmam gerekli
    audio.currentTime=(clickX/width)*audio.duration
}


next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
audio.addEventListener("timeupdate",update_progres);
// time update direkt çalışır
progres_div.addEventListener("click",setprogres);

play.addEventListener("click",()=>{
    if(is_playing){
        pausesong()
        play.classList.replace("fa-pause","fa-play");
    }
    else{
        playsong()
        play.classList.replace("fa-play","fa-pause");
    }
});

// eğer müziğim bittiğinde bir sonraki müziğe geçmesini istiyorsam 
// ve şarkının ne zaman bittiğini anlamak istersem  ended eventini kullanmam gerek 
audio.addEventListener("ended",nextSong);