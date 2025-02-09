resource "google_compute_disk" "disk1" {
  name  = "disk1"
  zone  = var.zone
  image = var.boot_image
  size  = 10
  type  = "pd-standard"
  labels = {
    purpose = "disk_snapshot_test"
  }
}

resource "google_compute_instance" "instance1" {
  name                      = "instance1"
  machine_type              = "e2-micro" # 無料枠
  zone                      = var.zone
  allow_stopping_for_update = true # terraform がインスタンスを停止できるようにする（マシンタイプを変更できる）

  boot_disk {
    auto_delete = false
    source      = google_compute_disk.disk1.self_link
  }

  network_interface {
    network = "default"
  }

  deletion_protection = false
}
