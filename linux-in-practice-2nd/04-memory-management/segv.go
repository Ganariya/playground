package main

import "fmt"

func main() {
	a, b, c, d, e := 0, 0, 0, 0, 0
	fmt.Printf("%p %p %p %p %p", &a, &b, &c, &d, &e)

	var p *int = nil
	fmt.Println("不正メモリアクセス前")
	*p = 0
	fmt.Println("不正メモリアクセス後")
}
