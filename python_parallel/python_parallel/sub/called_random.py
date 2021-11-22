import random
from time import sleep

class A:
    def __init__(self) -> None:
        pass

    def f(self, seed: int) -> None:
        for i in range(5):
            print(seed, f"sub{i}", random.random())
            sleep(random.random())

def f(seed: int) -> None:
    a = A()
    a.f(seed)