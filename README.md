# Project-Never-Say-Never
## Quick Facts
* A 2D MMORPG using Phaser.js and Socket.io
* Runs on [Repl.it](https://repl.it/~), an online code editor
## Installation Guide
  NOTE: if you just want to run the project, you can go directly [to the repl](https://repl.it/@AaronSmith8/MMORPG-Tutorial-with-Phaser)
  
  If you want to download the project to run on your computer, you'll have to have a couple things to make it all work:
  #### 1. You will need to create a .env file with a couple of properties:
    
    MONGO_CONNECTION_URL=""    
    JWT_REFRESH_KEY="top_secret"
    PORT=3000
    SENDGRID_API_KEY=''
    SG_RESET_PASSWORD_EMAIL=''
    SG_RESET_CONFIRM_EMAIL=''
  
  #### 2. Next, you will need to fill in the blanks. I won't go into a whole lot of detail here, but here are the basics:
   - ```MONGO_CONNECTION_URL``` You will need to create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). This is a totally free database servive. 
     You will need a cluster with access to the url of your server (or just specify whitelist all 0.0.0.0), and then you will need a user with read/write acess
     Then follow the steps for a connect with API and get the key for the ```MONGO_CONNECTION_URL``` (NOTE: For the password, remove the <> as well as password)
    
   - ```JWT_REFRESH_KEY``` Just put in any old secret key. This key is for cookie signing.
    
   - ```SENDGRID_API_KEY``` This will require an account to be created on Twilio's [SendGrid](https://sendgrid.com/). This is a website for sending emails.
     Create an account. Then you will need two dynamic templates: one for the _forgot password_ email that sends the user to a reset password page, and a _confirm reset_ email.
     Then click _Integrate_ -> _NodeJS_. Create a new API key and copy it to the .env file. Ignore the test code.
  
   - ```SG_RESET_PASSWORD_EMAIL``` This is the Dynamic ID for the _forgot password_  email that you created above
    
   - ```SG_RESET_CONFIRM_EMAIL``` This is the Dynamic ID for the _confirm reset_ email
   
  #### 3. Install NPM and NODE
   In order to run the project, you will need to install _nodeJS_ v10.16 and _npm package manager_.
   Next, open up your console and run ```npm install```
   
  #### 4. Run the program
   In your console, run ```node index.js``` to start up your server. 
   __Finally,__ go onto your browser and head to your website!
  
  #### 5. Enjoy!
   
## Credits
* The start of the game was built by following [this awesome tutorial on Zenava](https://phasertutorials.com/how-to-create-a-phaser-3-mmorpg-part-1/?a=13) 
* The sprite characters are generated using the [Universal LPC Sprite Generator](http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/)

