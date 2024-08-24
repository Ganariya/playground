package main

import (
	"context"
	"errors"
	"io"
	"log"
	"math/rand"
	"net"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"time"

	"go.opentelemetry.io/contrib/bridges/otelslog"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"go.opentelemetry.io/otel"
)

const name = "simple-go-observe/src"

var (
	tracer = otel.Tracer(name)
	logger = otelslog.NewLogger(name)
)

func main() {
	if err := run(); err != nil {
		log.Fatalln(err)
	}
}

func run() (err error) {
	// os.Interrupt が入力されると Cancel される Context を作成する
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	// OTel SDK をセットアップする
	// 返り値のシャットダウン関数を run() 実行終了時に実行して安全に OTel を終了させる
	otelShutdown, err := setupOTelSDK(ctx)
	if err != nil {
		return
	}
	defer func() {
		err = errors.Join(err, otelShutdown(context.Background()))
	}()

	// HTTP サーバを通常通り起動する
	srv := &http.Server{
		Addr:         ":1323",
		BaseContext:  func(_ net.Listener) context.Context { return ctx },
		ReadTimeout:  time.Second,
		WriteTimeout: 10 * time.Second,
		Handler:      newHTTPHandler(), // HTTPサーバの親ハンドラを設定する
	}

	// ListenAndServe を非同期に実行する
	// エラーが内部で発生したらそれがチャネルで通知されて、処理がおわる
	srvErr := make(chan error, 1)
	go func() {
		srvErr <- srv.ListenAndServe()
	}()

	select {
	case err = <-srvErr:
		// エラーが発生したらここが実行されて終了する
		return
	case <-ctx.Done():
		// Wait for first CTRL+C.
		// Stop receiving signal notifications as soon as possible.
		stop()
	}

	// サーバをシャットダウンし、新規受付をやめる
	// すべてのリクエストを処理し終わったら終了する
	err = srv.Shutdown(context.Background())
	return
}

func newHTTPHandler() http.Handler {
	// マルチプレクサルータを作る
	// 特定の URL パターンに基づいて適切は HTTP ハンドラを呼び出す
	mux := http.NewServeMux()

	handleFunc := func(pattern string, handlerFunc func(http.ResponseWriter, *http.Request)) {
		// Configure the "http.route" for the HTTP instrumentation.

		// HTTP instrumentation を計測する
		// 指定された url pattern を http.route というタグに設定し、 handlerFunc ハンドラのトレースを計測する
		handler := otelhttp.WithRouteTag(pattern, http.HandlerFunc(handlerFunc))
		// ハンドラをマルチプレクサルータに設定する
		mux.Handle(pattern, handler)
	}

	// Register handlers.
	handleFunc("/rolldice/", rolldice)
	handleFunc("/rolldice/{player}", rolldice)

	// HTTP サーバ全体について トレースを収集できるように計装する
	handler := otelhttp.NewHandler(mux, "/")
	return handler
}

func rolldice(w http.ResponseWriter, r *http.Request) {
	ctx, span := tracer.Start(r.Context(), "rolldice")
	defer span.End()

	roll := getDice(ctx)
	roll2 := getDice2(ctx)

	logger.InfoContext(ctx, "rolldice start!", "roll", roll, "roll2", roll2)

	resp := strconv.Itoa(roll+roll2) + "\n"
	if _, err := io.WriteString(w, resp); err != nil {
		log.Printf("Write failed: %v\n", err)
	}
}

func getDice(ctx context.Context) int {
	ctx, span := tracer.Start(ctx, "getDice")
	defer span.End()

	logger.InfoContext(ctx, "getDice start!")

	time.Sleep(500 * time.Millisecond)

	return 1 + rand.Intn(6)
}

func getDice2(ctx context.Context) int {
	ctx, span := tracer.Start(ctx, "getDice2")
	defer span.End()

	logger.InfoContext(ctx, "getDice2 start!")

	time.Sleep(1000 * time.Millisecond)
	return 1 + rand.Intn(6)
}
