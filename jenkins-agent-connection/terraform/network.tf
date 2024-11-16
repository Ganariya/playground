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

/*
jenkins-agent-node は外部IPアドレスを持たないため apt update が行えない
そのため NAT を定義する
*/

resource "google_compute_router" "jenkins_network_router" {
  name    = "jenkins-network-router"
  region  = google_compute_subnetwork.jenkins_subnetwork.region
  network = google_compute_network.jenkins_network.id

  bgp {
    # Local ASN Number
    asn = 64514
  }
}

resource "google_compute_router_nat" "jenkins_network_router_nat" {
  name                               = "jenkins-network-router-nat"
  router                             = google_compute_router.jenkins_network_router.name
  region                             = google_compute_router.jenkins_network_router.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  auto_network_tier = "STANDARD"

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }
}

/*
default firewall
*/

resource "google_compute_firewall" "jenkins_network_allow_ssh" {
  name    = "jenkins-network-allow-ssh"
  network = google_compute_network.jenkins_network.id

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = [] # jenkins-network 全体で許可する

  priority = 65534
}

resource "google_compute_firewall" "jenkins_network_allow_icmp" {
  name    = "jenkins-network-allow-icmp"
  network = google_compute_network.jenkins_network.id

  allow {
    protocol = "icmp"
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = [] # jenkins-network 全体で許可する

  priority = 65534
}

resource "google_compute_firewall" "jenkins_network_allow_internal" {
  name    = "jenkins-network-allow-internal"
  network = google_compute_network.jenkins_network.id

  allow {
    protocol = "tcp"
    # ports を指定しなければすべて許可される
  }
  allow {
    protocol = "udp"
  }
  allow {
    protocol = "icmp"
  }

  source_ranges = ["10.0.1.0/24"]
  target_tags   = []

  priority = 65534
}

/*
外部通信 80/8080
*/

resource "google_compute_firewall" "jenkins_network_allow_http" {
  name    = "jenkins-network-allow-http"
  network = google_compute_network.jenkins_network.id

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["jenkins-network-server"]

  priority = 1000
}

resource "google_compute_firewall" "jenkins_network_allow_8080" {
  name    = "jenkins-network-allow-8080"
  network = google_compute_network.jenkins_network.id

  allow {
    protocol = "tcp"
    ports    = ["8080"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["jenkins-network-server"]

  priority = 1000
}
