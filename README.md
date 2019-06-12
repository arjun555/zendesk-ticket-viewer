# Zendesk Ticket Viewer
Zendesk 2019 Internship Coding Challenge by Arjun Patel
## Installation and Configuration
### Installation of NodeJS
The following installation instructions are written with the assumption that the user is familar with using a terminal.

This project has been created using Nodejs (v10.15.3)

1. You will be required to install node. This can be done using the Node Version Manager - [NVM](https://github.com/nvm-sh/nvm#installation-and-update) 

    There is a well written, simplified set of instructions to install NVM within the readme.

2. Once NVM has been installed, you will install node using NVM. The command below will install Nodejs (version 10.15.3)

        $ nvm install 10.15.3

    Verify the NodeJs version by using the following:

        $ nvm version

## 

3. Next clone the github repo ([Zendesk Ticket Viewer](https://github.com/arjun555/zendesk-ticket-viewer)) to your computer

4. On your computer, go to the root folder of the project

5. To run this project, the required node modules will need to be installed. To do this, use the following command:

        $ npm install

    This command will install the required dependencies as listed in the package.json

### Setting up the project's configuration file

In order to use the Zendesk Ticket Viewer, the Zendesk api requires an authenticated user account. If you do not have an account with zendesk, a free trial is availble from the [Zendesk website](https://zendesk.com/)

This project requires user account information to be entered into the `.env` file, prior to starting the server.

Within the project's root folder, open the `.env` file and enter the following:
    
1. Set `ZENDESK_API_USER` to your Zendesk account username 
2. Set `ZENDESK_API_PASS` to your Zendesk account password 
2. Set `ZENDESK_API_DOMAIN` to your Zendesk account domain

Once these have been entered, save the file. 

To run the project, run the command
    
    $ npm start



