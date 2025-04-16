# Use a site to test against.
1. Download the following repo:
https://github.com/saucelabs/the-internet.git
2. Follow up the instructions contained in that repo in order to get a localhost to test against.
3. If you wouldn't want to download it (in my case the documentation is not clear and didn't want to work with rackup),
get the docker image: 
a. docker pull gprestes/the-internet
b. docker run -d -p 7080:5000 gprestes/the-internet
c. run the app and voala! http://localhost:7080

More information in here -> https://hub.docker.com/r/gprestes/the-internet/