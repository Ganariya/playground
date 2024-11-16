#!/bin/bash

# install jenkins
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install -y jenkins

# install jdk
sudo apt install -y fontconfig openjdk-17-jre

# start jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins

# show AdminPassword
sudo cat /var/lib/jenkins/secrets/initialAdminPassword