rebuild() {
   sudo docker image prune -f
   sudo docker compose build --no-cache
   sudo docker compose up -d
}

stop() {
   sudo docker compose down
}

start() {
   sudo docker compose up -d
}


$@
