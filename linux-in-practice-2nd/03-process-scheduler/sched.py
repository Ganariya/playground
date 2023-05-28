#!/usr/bin/python3

import sys
import time
import os
import plot_sched

NLOOP_FOR_ESTIMATION = 100000000


def usage(progname: str) -> None:
    print(
        """使い方: {} <プロセス数>
        * 論理CPU0上で<プロセス数>の数だけ同時に100ミリ秒程度CPUリソースを消費する負荷処理プロセスを起動した後に、すべてのプロセスの終了を待つ。
        * "sched-<プロセス数>.jpg"というファイルに実行結果を示したグラフを書き出す。
        * グラフのx軸は負荷処理プロセス開始からの経過時間[ミリ秒]、y軸は進捗[%]""".format(
            progname, file=sys.stderr
        )
    )
    sys.exit(1)


def estimate_loops_per_msec() -> int:
    """
    1 つの論理 CPU が 1 msec あたりに実行できる pass の回数を計算する
    """
    before = time.perf_counter()
    for _ in range(NLOOP_FOR_ESTIMATION):
        pass
    after = time.perf_counter()
    print(f"{NLOOP_FOR_ESTIMATION}回の pass にかかった秒数: {after - before}s")
    print(
        f"1ミリ sec あたりに実行できる pass の回数: {int(NLOOP_FOR_ESTIMATION / (after-before) / 1000)}"
    )
    return int(NLOOP_FOR_ESTIMATION / (after - before) / 1000)


def child_fn(n: int, nloop_per_msec: int) -> None:
    """
    nloop_per_msec: 1msec あたりに実行できる pass の回数
    """
    progress = 100 * [None]
    for i in range(100):  # 100 msec かかるはず
        for j in range(nloop_per_msec):  # およそ 1msec かかるはず
            pass
        progress[i] = time.perf_counter()
    f = open("{}.data".format(n), "w")
    for i in range(100):
        f.write("{}\t{}\n".format((progress[i] - start) * 1000, i))
    f.close()
    exit(0)


progname = sys.argv[0]
if len(sys.argv) < 2:
    usage(progname)

# 起動するプロセスの個数
concurrency = int(sys.argv[1])

if concurrency < 1:
    print("<並列度>は1以上の整数にしてください: {}".format(concurrency))
    usage(progname)

# 論理CPU0上での実行を強制
os.sched_setaffinity(0, {0})

nloop_per_msec = estimate_loops_per_msec()

start = time.perf_counter()

for i in range(concurrency):
    pid = os.fork()
    if pid < 0:
        exit(1)
    elif pid == 0:
        child_fn(i, nloop_per_msec)

for i in range(concurrency):
    os.wait()

plot_sched.plot_sched(concurrency)
