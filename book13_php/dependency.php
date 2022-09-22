<?php

class B
{
}

class A
{
    private B $b;
    public function __construct()
    {
        $this->b = new B();
    }
}

$a = new A();
var_dump($a);
