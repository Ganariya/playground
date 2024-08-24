FROM golang:1.22-alpine as builder

WORKDIR /app

COPY go.mod go.sum ./
COPY src/ ./src/

RUN ls /app
RUN go mod download && go build -o main /app/src

FROM alpine:latest as runner
WORKDIR /app
COPY --from=builder /app/main .

CMD ["/app/main"]

