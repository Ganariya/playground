import socket
import struct


def send_msg(sock: socket.socket, msg: bytes):
    TOTAL = len(msg)

    total_sent_len = 0
    while total_sent_len < TOTAL:
        sent_len = sock.send(msg[total_sent_len:])
        if sent_len == 0:
            raise RuntimeError("socket broken")
        total_sent_len += sent_len


def receive_msg(sock: socket.socket, total_msg_size: int):
    total_receive_size = 0

    while total_receive_size < total_msg_size:
        # 受け取ってない分を受け取ろうとする
        received_chunk = sock.recv(total_msg_size - total_receive_size)
        if len(received_chunk) == 0:
            raise RuntimeError("socket broken")
        yield received_chunk
        total_receive_size += len(received_chunk)


def main():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)

    server_socket.bind(("127.0.0.1", 54321))

    server_socket.listen()
    print("starting server...")

    client_socket, (client_address, client_port) = server_socket.accept()

    print(f"accepted from {client_socket} {client_address} {client_port}")

    # 4byte の整数 を 2 つ受け取る
    received_bytes_message = b"".join(receive_msg(client_socket, total_msg_size=8))

    print(f"received: {received_bytes_message}")

    # バイト列を 2 つの整数(32bit)に解釈する
    # struct.unpack がネットワークバイトオーダをホストバイトオーダにうまく変換してくれる
    (operand1, operand2) = struct.unpack("!ii", received_bytes_message)

    print(f"ope1: {operand1} ope2: {operand2}")

    result = operand1 + operand2

    # 64 bit の整数として、ネットワークバイトオーダーのバイト列に変換する
    result_msg = struct.pack("!q", result)

    send_msg(client_socket, result_msg)

    print(f"sent: {result_msg}")

    client_socket.close()
    server_socket.close()


if __name__ == "__main__":
    main()
