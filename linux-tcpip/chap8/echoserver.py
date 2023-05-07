"""
https://github.com/momijiame/linux-tcpip-book/blob/master/sources/8.socket/httpclient.py

Server 側の Socket 通信を実装する
"""
import socket


def send_msg(sock: socket.socket, msg: bytes):
    TOTAL = len(msg)

    total_sent_len = 0
    while total_sent_len < TOTAL:
        sent_len = sock.send(msg[total_sent_len:])
        if sent_len == 0:
            raise RuntimeError("socket broken")
        total_sent_len += sent_len


def receive_msg(sock: socket.socket, chunk_len=1024):
    while True:
        received_bytes_chunk = sock.recv(chunk_len)
        if len(received_bytes_chunk) == 0:
            break
        yield received_bytes_chunk


def main():
    # Server 側の親 Socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)

    # 54321 port に設定する
    server_socket.bind(("127.0.0.1", 54321))

    # 実際にサーバ接続を待ち受けはじめる
    # ここではまだ実際に接続が来るわけでなく「準備完了したよ！」と示すだけ
    server_socket.listen()

    print("starting server...")

    # server に対してリクエストが来るまで待機する
    # リクエストが来ると、新しいソケットが作成される
    # = 「クライアントXのクライアント側ソケット」とつながった
    # X用の server 子 socket を新たに 1 つ用意する
    client_socket, (client_address, client_port) = server_socket.accept()

    print(f"server socket {server_socket}")
    print(f"accepted from {client_socket} {client_address} {client_port}")

    # client と接続した socket から msg を取り出す
    for msg in receive_msg(client_socket):
        send_msg(client_socket, msg)
        print(f"echo : {msg}")

    client_socket.close()
    server_socket.close()


if __name__ == "__main__":
    main()
