FROM golang:1.13-alpine

WORKDIR /go/src/github.com/open-kitchen

COPY go.mod /go/src/github.com/open-kitchen
COPY go.sum /go/src/github.com/open-kitchen

RUN go mod download

RUN go get github.com/codegangsta/gin

COPY . /go/src/github.com/open-kitchen

EXPOSE 8001
