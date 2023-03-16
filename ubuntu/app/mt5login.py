import MetaTrader5 as mt5

# display data on the MetaTrader 5 package
print("MetaTrader5 package author: ", mt5.__author__)
print("MetaTrader5 package version: ", mt5.__version__)

# establish connection to the MetaTrader 5 terminal
if not mt5.initialize():
    print("initialize() failed, error code =", mt5.last_error())
    quit()

# display data on MetaTrader 5 version
print(mt5.version())
# connect to the trade account without specifying a password and a server

# login(
#    login,                    // account number
#    password="PASSWORD",      // password
#    server="SERVER",          // server name as it is specified in the terminal
#    timeout=TIMEOUT           // timeout
#    )

login = '10008'
password = 'aaa123'
server = 'proxy1.mqserver.org:15222'
authorized = mt5.login(login, password=password, server=server)  # the terminal database password is applied if connection data is set to be remembered
if authorized:
    print("connected to account #{}".format(login))
else:
    print("failed to connect at account #{}, error code: {}".format(login, mt5.last_error()))



# shut down connection to the MetaTrader 5 terminal
mt5.shutdown()