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

Run command (twice):
```bash
docker-compose exec ubuntu sh -c "export DISPLAY=:1.0 && /app/loadtest.sh 5" &
```
where 5 - number subscribers fro test

I left side will be evens list, on right side red5 server statistic for published steam.


Open VNC, connect to http://localhost:5901

We can look browser windows and control video quality.

Run command for stop testing:
```bash
docker-compose exec ubuntu sh -c "export DISPLAY=:1.0 && /app/stop.sh"
```


#### Get SSl certificates

rename nginx/conf.d/default-ssl.conf -> nginx/conf.d/default-ssl.conf.bak

```bash
mv nginx/conf.d/default-ssl.conf nginx/conf.d/default-ssl.conf.bak
mv nginx/conf.d/default.conf.bak nginx/conf.d/default.conf
```
Run nginx and certbot:
```bash
docker-compose -f nginx.yml -f certbot.yml up -d
```

```bash
./certbot.sh <domain-name>

mv nginx/conf.d/default-ssl.conf.bak nginx/conf.d/default-ssl.conf 
mv nginx/conf.d/default.conf nginx/conf.d/default.conf.bak

docker-compose -f nginx.yml -f certbot.yml stop
docker-compose -f docker-compose.yml -f certbot.yml -f nginx.yml up -d
```
Go to https://domain-name/

![test om domain](screen3.png?raw=true)