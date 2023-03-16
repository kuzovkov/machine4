install MetaTrader5
=======================

Folks at MQT5 haven't compiled any version for Linux so far and the only method available is to Installed 
Python3.x for Windows inside Wine64 and then continue further pip installation accordingly.

I'm on Ubuntu 22.04 and successfully installed MetaTrader5, here are the steps.

```bash
sudo apt update -y
sudo apt upgrade -y
sudo apt install wine64
cd ~/Desktop
wget https://www.python.org/ftp/python/3.8.0/python-3.8.0-amd64.exe --no-check-certificate
wget https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe --no-check-certificate
wine64 uninstaller
```
select install and then select mt5setup.exe
```bash
wine64 cmd
cd /folder_where_python3.8_setup.exe
python-3.8.0-amd64.exe
c:
cd windows
copy py.exe python.exe
python -m pip install pip --upgrade
exit
wine64 cmd
pip3 --version
pip3 install jupyter
pip3 install MetaTrader5
jupyter notebook
```

