resource "google_compute_network" "jenkins_network" {
  name                    = "jenkins-network"
  auto_create_subnetworks = false
  mtu                     = 1460
}

resource "google_compute_subnetwork" "jenkins_subnetwork" {
  name          = "jenkins-subnetwork"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.region
  network       = google_compute_network.jenkins_network.id
}

resource "google_compute_address" "jenkins_master_node_static_ip" {
  name   = "jenkins-master-node-static-ip"
  region = var.region
}

resource "google_compute_disk" "jenkins_master_node_disk" {
  name  = "jenkins-master-node-disk"
  zone  = var.zone
  image = "debian-cloud/debian-12"
  size  = 10
}

resource "google_compute_instance" "jenkins_master_node" {
  name         = "jenkins-master-node"
  machine_type = "f1-micro"
  zone         = var.zone
  tags         = []

  boot_disk {
    auto_delete = true
    source      = google_compute_disk.jenkins_master_node_disk.self_link
  }

  network_interface {
    subnetwork = google_compute_subnetwork.jenkins_subnetwork.id
    access_config {
      nat_ip = google_compute_address.jenkins_master_node_static_ip.address
    }
  }
}
