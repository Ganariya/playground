package info

import (
	"fmt"
	"net"

	"github.com/higebu/netfd"
)

func GetTCPListenerInfo(listener *net.TCPListener) string {
	fdNum := netfd.GetFdFromListener(listener)
	return fmt.Sprintf("%s[Parent] *net.TCPListener Address: %s, fd: %d", GetIdentity(true), listener.Addr().String(), fdNum)
}
