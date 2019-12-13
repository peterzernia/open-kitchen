FROM golang:1.13-alpine

WORKDIR /go/src/github.com/peterzernia/project

COPY go.mod /go/src/github.com/peterzernia/project
COPY go.sum /go/src/github.com/peterzernia/project

RUN go mod download

RUN go get github.com/codegangsta/gin

COPY . /go/src/github.com/peterzernia/project

EXPOSE 8001
