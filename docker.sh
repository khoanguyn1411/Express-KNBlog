rebuild() {
   sudo docker image prune -f
   sudo docker compose build --no-cache
   start:silent
}

stop() {
   sudo docker compose down
}

exec:db() {
   sudo docker exec -it knblog-db bash
}

start:db() {
   sudo docker compose up mongo-db -d
}

start() {
   start:db
   sudo docker compose up node-backend
}

$@
