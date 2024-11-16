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
  name         = "jenkins-master-node"
  machine_type = "f1-micro"
  zone         = var.zone
  tags         = ["jenkins-network-server"]

  boot_disk {
    auto_delete = true
    source      = google_compute_disk.jenkins_master_node_disk.self_link
  }

  network_interface {
    network_ip = "10.0.1.2" # 固定する
    subnetwork = google_compute_subnetwork.jenkins_subnetwork.id
    access_config {
      nat_ip = google_compute_address.jenkins_master_node_static_ip.address
    }
  }
}

resource "google_compute_instance" "jenkins_agent_node" {
  name         = "jenkins-agent-node"
  machine_type = "f1-micro"
  zone         = var.zone
  tags         = []

  boot_disk {
    auto_delete = true
    source      = google_compute_disk.jenkins_agent_node_disk.self_link
  }

  network_interface {
    network_ip = "10.0.1.3" # 固定する
    subnetwork = google_compute_subnetwork.jenkins_subnetwork.id
  }
}
