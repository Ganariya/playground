"""
Client から Server に対して HTTP 通信を Socket (TCP) を利用して行う
"""

import socket


def send_request_msg(sock: socket.socket, msg: bytes):
    """指定したバイト列 msg をソケットに書き込み サーバに送信する"""
    MSG_ORIGINAL_LEN = len(msg)

    total_sent_len = 0
    while total_sent_len < MSG_ORIGINAL_LEN:
        # ソケットにバイト列を書き込む
        # sent_len が今回書き込んだバイト数
        sent_len = sock.send(msg[total_sent_len:])

        if sent_len == 0:
            raise RuntimeError("socket broken")

        total_sent_len += sent_len


def receive_response_msg(sock: socket.socket, chunk_len=1024):
    while True:
        # chunk_len 数だけバイトを読み込む
        received_chunk = sock.recv(chunk_len)

        if len(received_chunk) == 0:
            break

        yield received_chunk


def main():
    # IPv4 + TCP で通信する Socket を用意する
    # AF_INET=IPv4 SOCK_STREAM=TCP
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Server の Socket に接続
    client_socket.connect(("127.0.0.1", 80))

    # Socket (TCP) の上で HTTP Protocol
    request_text = "GET / HTTP/1.0\r\n\r\n"
    request_bytes = request_text.encode("ASCII")

    # ソケットにリクエストのバイト列を書き込む
    send_request_msg(client_socket, request_bytes)

    # レスポンスのバイト列を受け取り 文字列に戻す
    received_bytes = b"".join(receive_response_msg(client_socket))
    received_text = received_bytes.decode("ASCII")

    print(received_text)

    client_socket.close()


if __name__ == "__main__":
    main()
