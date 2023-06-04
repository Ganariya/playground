package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"strconv"
	"syscall"
)

const ALOC_SIZE = 1024 * 1024 * 1024

func main() {
	pid := os.Getpid()
	fmt.Println("***新規メモリ獲得前のメモリマップ***")
	cmd := exec.Command("cat", "/proc/"+strconv.Itoa(pid)+"/maps")
	cmd.Stdout = os.Stdout
	err := cmd.Run()
	fmt.Println()
	if err != nil {
		log.Fatal("error")
	}

	// 1 GB のメモリ領域を追加で獲得する
	data, err := syscall.Mmap(-1, 0, ALOC_SIZE, syscall.PROT_READ|syscall.PROT_WRITE, syscall.MAP_ANON|syscall.MAP_PRIVATE)
	if err != nil {
		log.Fatal("new memory error")
	}
	fmt.Printf("***新規メモリ領域 アドレス = %p, サイズ = 0x%x\n\n***", &data[0], ALOC_SIZE)

	fmt.Println("***新規メモリ獲得後のメモリマップ***")
	cmd = exec.Command("cat", "/proc/"+strconv.Itoa(pid)+"/maps")
	cmd.Stdout = os.Stdout
	err = cmd.Run()
	fmt.Println()
	if err != nil {
		log.Fatal("error")
	}
}
