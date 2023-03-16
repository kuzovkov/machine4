FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow

RUN apt-get update && \
    apt-get install -y x11vnc xvfb fluxbox wget wmctrl software-properties-common \
    psmisc net-tools mc htop

RUN apt-get install -y sudo && \
    echo "apps ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/apps && \
    chmod 0440 /etc/sudoers.d/apps

#fix locales
RUN mkdir /var/lib/locales && \
    mkdir /var/lib/locales/supported.d && \
    touch /var/lib/locales/supported.d/ru && \
    echo "ru_RU.CP1251 CP1251" > /var/lib/locales/supported.d/ru && \
    apt-get install -y locales && \
    locale-gen

RUN apt-get install -y python-dev build-essential
RUN apt-get install -y python3-pip
RUN pip install --upgrade pip
RUN pip install redis psycopg2-binary datetime
RUN pip install terminaltables daemonize

# Set the Chrome repo.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable

RUN sudo dpkg --add-architecture i386 && sudo apt update
ENV DEBIAN_FRONTEND noninteractive
ENV DEBIAN_FRONTEND teletype
RUN apt-get update -y && apt-get install -y --no-install-recommends apt-utils
RUN ACCEPT_EULA=yes sudo apt-get install -y wine

RUN apt-get install -y wine-development q4wine winetricks playonlinux

#RUN apt-get install -y aptitude
#RUN aptitude install -y wine wine-development q4wine winetricks playonlinux

# Add a user for running applications.
RUN useradd apps
RUN mkdir -p /home/apps && chown apps:apps /home/apps
COPY bootstrap.sh /
ADD ./data/wine32.tgz /home/apps/.wine32

CMD '/bootstrap.sh'