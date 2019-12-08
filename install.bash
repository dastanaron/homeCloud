#!/usr/bin/env bash

#user shared password 123456789

mkdir -p /home/shared/
useradd -d /home/shared/ shared -p 123456789

cp -r qBittorrent/ $HOME/.config/

add-apt-repository -y ppa:qbittorrent-team/qbittorrent-stable
apt update && sudo apt install -y qbittorrent-nox

cp qBittorrent/qbittorrent.service /etc/systemd/system/qbittorrent.service

systemctl daemon-reload

systemctl stop qbittorrent