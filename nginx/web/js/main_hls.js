(function (red5prosdk) {

  // Create a new instance of the HLS subcriber.
  var subscriber = new red5prosdk.HLSSubscriber();
  console.log('subscriber:', subscriber)
  // Initialize
  subscriber.init({
    protocol: 'https',
    port: 443,
    app: 'live',
    host: 'sm.loghic.com',
    streamName: '627bbd17d7332',
    mimeType: 'application/x-mpegURL',
    mediaElementId: 'red5pro-subscriber'
  })
  .then(function(subscriber) {
   console.log('subscriber2:', subscriber) 
   // `subcriber` is the HLS Subscriber instance.
    return subscriber.subscribe();
  })
  .then(function(subscriber) {
    console.log('subscriber3:', subscriber)
    // subscription is complete.
    // playback should begin immediately due to
    //   declaration of `autoplay` on the `video` element.
  })
  .catch(function(error) {
    // A fault occurred while trying to initialize and playback the stream.
    console.error(error)
  });

})(window.red5prosdk);
