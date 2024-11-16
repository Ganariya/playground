resource "google_compute_disk" "jenkins_master_node_disk" {
  name  = "jenkins-master-node-disk"
  zone  = var.zone
  image = "debian-cloud/debian-12"
  size  = 10
}
resource "google_compute_disk" "jenkins_agent_node_disk" {
  name  = "jenkins-agent-node-disk"
  zone  = var.zone
  image = "debian-cloud/debian-12"
  size  = 10
}


resource "google_compute_instance" "jenkins_master_node" {
  name                      = "jenkins-master-node"
  machine_type              = "e2-medium"
  zone                      = var.zone
  tags                      = ["jenkins-network-server"]
  allow_stopping_for_update = true # terraform がインスタンスを停止できるようにする（マシンタイプを変更できる）

  boot_disk {
    auto_delete = false # true にすると terraform apply で recreate されるときにエラーがでるので false にする
    source      = google_compute_disk.jenkins_master_node_disk.self_link
  }

  network_interface {
    network_ip = "10.0.1.2" # 固定する
    subnetwork = google_compute_subnetwork.jenkins_subnetwork.id
    access_config {
      nat_ip = google_compute_address.jenkins_master_node_static_ip.address
    }
  }

  # startup log の確認方法
  # sudo journalctl -u google-startup-scripts.service
  metadata_startup_script = file("${path.module}/scripts/master-node-startup.sh")
}

resource "google_compute_instance" "jenkins_agent_node" {
  name                      = "jenkins-agent-node"
  machine_type              = "e2-medium"
  zone                      = var.zone
  tags                      = []
  allow_stopping_for_update = true

  boot_disk {
    auto_delete = false
    source      = google_compute_disk.jenkins_agent_node_disk.self_link
  }

  network_interface {
    network_ip = "10.0.1.3" # 固定する
    subnetwork = google_compute_subnetwork.jenkins_subnetwork.id
  }

  metadata_startup_script = file("${path.module}/scripts/agent-node-startup.sh")
}
