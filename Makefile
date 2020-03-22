dc := docker-compose

build:
	$(dc) build
.PHONY: build

up:
	$(dc) up
.PHONY: up

lint:
	$(dc) run --rm open-kitchen go vet
	$(dc) run --rm client yarn lint
.PHONY: lint

test-go:
	$(dc) run --rm open-kitchen go test -v ./...
.PHONY: test-go

test-js:
	$(dc) run --rm client yarn test
.PHONY: test-js

test: test-go test-js
.PHONY: test

client:
	$(dc) run --rm client yarn build
.PHONY: client

open-kitchen:
	$(dc) run --rm open-kitchen go build
.PHONY: open-kitchen

sql:
	docker exec -it open-kitchen_db_1 psql -U postgres
.PHONY: sql

clean:
	$(dc) stop
	$(dc) rm -fv
.PHONY: clean
