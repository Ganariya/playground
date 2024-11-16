#!/bin/bash

# install JDK 
sudo apt update
sudo apt install -y fontconfig openjdk-17-jre

sudo mkdir -p /home/jenkins/my-agent1
sudo chmod 777 /home/jenkins/my-agent1

sudo mkdir -p /home/jenkins/my-agent2
sudo chmod 777 /home/jenkins/my-agent2
