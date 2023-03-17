Load test Red5pro server
=======================

### Run
```bash
docker-compose build
docker-compose -f docker-compose.yml -f nginx.yml up -d
```

### Do tests

Open in browser http://localhost

![main page](screen2.png?raw=true)

Press Start button

![page publisher](screen1.png?raw=true)

Edit server, port, stream name if need.

Wait video will appear in video element.

Press button `publish`.

I left side will be evens list, on right side red5 server statistic for published steam.


Run command (twice):
```bash
docker-compose exec ubuntu sh -c "export DISPLAY=:1.0 && /app/loadtest.sh 5" &
```
where 5 - number subscribers fro test

Open VNC, connect to http://localhost:5901

We can look browser windows and control video quality.

Run command for stop testing:
```bash
docker-compose exec ubuntu sh -c "export DISPLAY=:1.0 && /app/stop.sh"
```
