package main

import (
	"fmt"
	"math/rand"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello, World!")
	})
	e.GET("/rolldice", func(c echo.Context) error {
		dice := 1 + rand.Intn(6)
		returnText := fmt.Sprintf("Hello, dice: %d\n", dice)
		return c.String(200, returnText)
	})
	e.Logger.Fatal(e.Start(":1323"))
}
