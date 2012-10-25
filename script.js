(function(document, navigator){

    function getCamera() {
        
        navigator.webkitGetUserMedia(   {video: true}
        , function(stream) {
            var video = document.getElementById("stream");                    
            video.src = webkitURL.createObjectURL(stream);
            var btn = document.getElementById("takesnap");
            btn.disabled = false;
            btn.onclick = function() {
                snapShot();
            };
        }
        , function(err) { alert("there was an error " + err)});
    };
    
    function snapShot() {
        
        var video = document.getElementById("stream");    
        var image = document.getElementById("canvasStream");
        var snapImage = document.getElementById("snapshot");
                            
        image.width = video.clientWidth;
        image.height = video.clientHeight;

        var ctx = image.getContext('2d').drawImage(video,0,0, image.width, image.height); 
        snapImage.src = image.toDataURL("image/png");   
        localStorage.setItem('imgSnap', snapImage.src); 
        
    };
    
    function handleFileSelect(evt) {
        
        var imgTarget = document.getElementById('localimagefile');
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          // Only process image files.
          if (!f.type.match('image.*')) {
            continue;
          }

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              imgTarget.src = e.target.result;
              localStorage.setItem('imgFile', e.target.result);
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        }
    };
        
    document.querySelector('#enablecam').addEventListener('click', function (e) {
        console.info("enablecam");
       getCamera();
    });
    
    document.getElementById("stream").addEventListener('click', function (e) {
        console.info("takesnap");
        snapShot();
                
    });
                
    document.querySelector('#loadfromlocalstoragesnap').addEventListener('click', function (e) {
        console.info("loadfromlocalstoragesnap");
        var imgTarget = document.getElementById('localstoragesnapshot');
        imgTarget.src = localStorage.getItem('imgSnap');
    });
    
    document.querySelector('#loadfromlocalstoragefile').addEventListener('click', function (e) {
        console.info("loadfromlocalstoragefile");
        var imgTarget = document.getElementById('localstoragesnapshot');
        imgTarget.src = localStorage.getItem('imgFile');
    });
    
    document.querySelector('#loadfromlocalfile').addEventListener('change', handleFileSelect, false);

    
    document.getElementById('deletefromlocalstorage').addEventListener('click', function(){ 
        localStorage.removeItem('img');
        localStorage.clear();

        var storageImage = document.getElementById('localstoragesnapshot');
        var snapImage = document.getElementById('snapshot');
        var fileImage = document.getElementById('localimagefile');
        storageImage.src =snapImage.src = fileImage.src = "deleted Yo";
    });

    getCamera();

  })(document, navigator);