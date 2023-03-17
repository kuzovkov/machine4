(function (red5prosdk) {
    var btn = document.getElementById('btn-start');
    var input_server = document.querySelector('input[name="server"]');
    var input_port = document.querySelector('input[name="port"]');
    var input_stream = document.querySelector('input[name="stream"]');
    var div_events = document.querySelector('div[class="events"]');
    var div_stat = document.querySelector('div[class="stat"]');
    var video_el = document.querySelector('video[id="red5pro-publisher"]');
    var publisher = null;
    btn.addEventListener('click', startStop);
    var mediastream = null;
    var events = [];
    var timeInt = null;
    var fetch = new Fetch();

    var mediaConstraints = {
        audio: true,
        video: {
            width: {
                exact: 640
            },
            height: {
                exact: 480
            },
            frameRate: {
                min: 8,
                max: 24
            }
        }
    };

    var mediaConstraintsLocal = {
        audio: true,
        video: true
    };

    function publish(){
        // Initialize
      var options = {
          protocol: 'wss',
          port: input_port.value,
          host: input_server.value,
          app: 'live',
          streamName: input_stream.value,
          rtcConfiguration: {
            iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
            iceCandidatePoolSize: 2,
            bundlePolicy: 'max-bundle'
          }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
          streamMode: 'append',
          mediaElementId: 'red5pro-publisher',
          bandwidth: {
            audio: 56,
            video: 512
          },
          mediaConstraints: mediaConstraints
        };
        options = options;
        if (!mediastream){
            alert('Mediastream not found!');
            return;
        }
        // Create a new instance of the WebRTC publisher
        publisher = new red5prosdk.RTCPublisher();
        publisher.initWithStream(options, mediastream)
        .then(function() {
          // Invoke the publish action.
          return publisher.publish();
        }).
        then(function (publisher) {
            publisher.on('*', handlePublisherEvent);
            btn.innerHTML = 'unpublish';
            timeInt = setInterval(function(){
                    getStat().then(function(data){
                        div_stat.innerHTML = '<pre>' + JSON.stringify(data, null, 4) + '</pre>';
                    }).catch(function (e) {
                        console.log('error fetch stat: ', e);
                    })
                }, 2000);
        })
        .catch(function(error) {
          // A fault occurred while trying to initialize and publish the stream.
          console.error(error);
        });
    }

    function unpublish(){
        if (publisher && publisher instanceof red5prosdk.RTCPublisher){
            publisher.off('*', handlePublisherEvent);
            return publisher.unpublish();
        }
    }

    function handlePublisherEvent (event) {
        // The name of the event:
        const { type } = event
        // if (['Subscribe.Time.Update'].indexOf(type) !== -1)
        //   return false;
        // The dispatching publisher instance:
        const { publisher } = event
        // Optional data releated to the event (not available on all events):
        let { data } = event
        //console.log('handlePublisherEvent:', type, publisher, data)
        try {
            data = JSON.stringify(data, null, 2);
        }catch (e){
            //none
        }
        if (data){
            events.push(`<li>${type}: <br> ${data.toString()}</li>`);
        }
        if (events.length > 1000){
           events = events.slice(-1000);
        }
        div_events.innerHTML = `<ul style="list-style: none">${events.join('')}</ul>`;
    }

    function startStop(){
        if (btn.innerHTML === 'publish'){
            if (mediastream){
                publish(mediastream);
            }
        } else {
            unpublish().
            then(function (pub) {
                publisher = null;
                btn.innerHTML = 'publish';
                if (timeInt){
                    clearInterval(timeInt);
                    timeInt = null;
                }
            }).catch(function (e) {
                console.log(e);
                alert(e);
            });
        }
    }

    function getStat() {
        var server = publisher.getOptions().host;
        var stream = publisher.getOptions().streamName;
        var accessToken = 'jkaltwC8bcfwJDILfWX7LVw1se48up41';
        var url = `/api/v1/applications/live/streams/${stream}?accessToken=${accessToken}`
        //console.log(url);
        return fetch.get(url, {});
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    navigator.getUserMedia(mediaConstraintsLocal, function(stream){
        mediastream = stream;
        var myURL = window.URL || window.webkitURL;
            if (!myURL) {
                video_el.src = stream;
            } else {
                video_el.srcObject = stream;
            }
    }, function(error){
        console.log(error);
        alert(error);
    });

})(window.red5prosdk);
