package main

import (
	"fmt"
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
		通信先である Server の アドレス (IP Address + Port)
	*/
	serverTcpAddr, _ := net.ResolveTCPAddr(TCP_PROTOCOL, SERVER_TCP_ADDRESS)

	/*
		Server と通信するための Socket (conn) を作成する

		Client 側の アドレス (IP Address + Port) は指定しなくていい = nil
	*/
	conn, _ := net.DialTCP(TCP_PROTOCOL, nil, serverTcpAddr)
	defer conn.Close()

	log.Println(info.GetNetConnectionInfo(false, conn))

	for {
		var message string
		fmt.Scanln(&message)

		// サーバに送信
		conn.Write([]byte(message))

		// サーバからのレスポンスがくるまで待機
		response := make([]byte, 1000_000)
		readLen, _ := conn.Read(response)

		if readLen == 0 {
			break
		}
		log.Println(string(response))
	}
}
