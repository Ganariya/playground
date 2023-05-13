package main

import (
	"log"
	"net"

	"github.com/ganyariya/playground/linux-tcp-ip/go_socket/pkg/info"
)

const (
	TCP_PROTOCOL       = "tcp"
	SERVER_TCP_ADDRESS = "localhost:12345"
)

func main() {
	/*
		*net.TCPAddr: TCP 通信における「自身 or 相手」を認識するアドレス
		= IP Address + Port
	*/
	tcpAddress, _ := net.ResolveTCPAddr(TCP_PROTOCOL, SERVER_TCP_ADDRESS)

	/*
		TCP Socket 接続待ち状態になる
		listener.fd = Server の Socket (ネットファイルディスクリプタ)
	*/
	listener, _ := net.ListenTCP(TCP_PROTOCOL, tcpAddress)
	log.Println(info.GetTCPListenerInfo(listener))

	for {
		// 実際に接続を待つ
		// クライアントから接続が来たら、そのクライアント用に新しいソケットを作成する
		clientConn, _ := listener.Accept()
		go handler(clientConn)
	}
}

/*
クライアント X と実際に通信をする
conn = listener.fd をコピーして作成された、特定のクライアント X 用の socket connection
*/
func handler(conn net.Conn) {
	connInfo := info.GetNetConnectionInfo(true, conn)
	log.Println(connInfo)

	defer conn.Close()

	for {
		request := make([]byte, 4096)

		// クライアント X から通信が来るまで待機する
		readLen, _ := conn.Read(request)

		// クライアントが接続を切った
		if readLen == 0 {
			break
		}

		conn.Write([]byte("[From][Server] Hello! Your message is " + string(request)))
		log.Printf("%s sent to client message: %s", connInfo, string(request))
	}
}
