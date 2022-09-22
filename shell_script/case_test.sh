#!/bin/bash

case $1 in
    "start")
        echo 'Program Started'
        ;;
    "stop")
        echo 'Program Stopped'
        ;;
    *)
        echo 'start stop need'
        ;;
esac

