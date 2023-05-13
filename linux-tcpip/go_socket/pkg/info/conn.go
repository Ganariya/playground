package info

import (
	"fmt"
	"log"
	"net"
	"os"
	"reflect"

	"github.com/higebu/netfd"
)

func GetNetConnectionInfo(isServer bool, conn net.Conn) string {
	fdNum := netfd.GetFdFromConn(conn)
	pid := os.Getpid()
	identity := GetIdentity(isServer)
	if isServer {
		// Server の場合は Thread (Child) であることを示す
		identity = identity + "[Child]"
	}
	lAddr := conn.LocalAddr().String()
	rAddr := conn.RemoteAddr().String()
	return fmt.Sprintf(
		"%s pid:%d, fd:%d, localAddress:%s, remoteAddress:%s",
		identity,
		pid,
		fdNum,
		lAddr,
		rAddr,
	)
}

func GetSocketFromConnection(conn net.Conn) string {
	var v reflect.Value = reflect.ValueOf(conn).Elem()
	log.Printf("%v", v.FieldByName("fd").Elem())
	return ""
}
