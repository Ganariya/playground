import time
import os
import random
from joblib import Parallel, delayed

def f(x):
    time.sleep(random.random() * 3)
    print(f"{x} {os.getpid()}")
    return x * x

if __name__ == "__main__":
    results = Parallel(n_jobs=-1, verbose=1)(delayed(f)(i) for i in range(50))
    print(results)