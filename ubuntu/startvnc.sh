#!/bin/bash

# Based on: http://www.richud.com/wiki/Ubuntu_Fluxbox_GUI_with_x11vnc_and_Xvfb

readonly G_LOG_I='[INFO]'
readonly G_LOG_W='[WARN]'
readonly G_LOG_E='[ERROR]'

export DISPLAY=${XVFB_DISPLAY:-:1}

main() {
    launch_window_manager
    run_vnc_server
}

launch_window_manager() {
    local timeout=${XVFB_TIMEOUT:-5}

    # Start and wait for either fluxbox to be fully up or we hit the timeout.
    fluxbox &
    local loopCount=0
    until wmctrl -m > /dev/null 2>&1
    do
        loopCount=$((loopCount+1))
        sleep 1
        if [ ${loopCount} -gt ${timeout} ]
        then
            echo "${G_LOG_E} fluxbox failed to start."
            exit 1
        fi
    done
}

run_vnc_server() {
    local passwordArgument='-nopw'

    if [ -n "${VNC_SERVER_PASSWORD}" ]
    then
        local passwordFilePath="${HOME}/x11vnc.pass"
        if ! x11vnc -storepasswd "${VNC_SERVER_PASSWORD}" "${passwordFilePath}"
        then
            echo "${G_LOG_E} Failed to store x11vnc password."
            exit 1
        fi
        passwordArgument=-"-rfbauth ${passwordFilePath}"
        echo "${G_LOG_I} The VNC server will ask for a password."
    else
        echo "${G_LOG_W} The VNC server will NOT ask for a password."
    fi

    x11vnc -display ${DISPLAY} -forever ${passwordArgument} &
    wait $!
}

control_c() {
    echo ""
    exit
}

trap control_c SIGINT SIGTERM SIGHUP

main

exit