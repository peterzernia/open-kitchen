dc := docker-compose
ifeq ($(CI), true)
	dc := docker-compose -f docker-compose-ci.yml
endif

build:
	$(dc) build
.PHONY: build

up:
	$(dc) up
.PHONY: up

lint:
	$(dc) run --rm project go vet
	$(dc) run --rm client yarn lint
.PHONY: lint

test-go:
	$(dc) run --rm project go test
.PHONY: test-go

test-js:
	$(dc) run --rm client yarn test
.PHONY: test-js

test: test-go test-js
.PHONY: test

client:
	$(dc) run --rm client yarn build
.PHONY: client

project:
	$(dc) run --rm project go build
.PHONY: project

sql:
	docker exec -it project_db_1 psql -U postgres
.PHONY: sql

clean:
	$(dc) stop
	$(dc) rm -fv
.PHONY: clean
