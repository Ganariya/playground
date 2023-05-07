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
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    client_socket.connect(("127.0.0.1", 54321))

    print(client_socket)

    ope1, ope2 = 1000, 2000

    print(ope1, ope2)

    request_msg = struct.pack("!ii", ope1, ope2)

    send_msg(client_socket, request_msg)

    print(f"sent: {request_msg}")

    received_bytes_message = b"".join(receive_msg(client_socket, 8))

    print(f"received: {received_bytes_message}")

    (added_value,) = struct.unpack("!q", received_bytes_message)

    print(f"result: {added_value}")

    client_socket.close()


if __name__ == "__main__":
    main()
