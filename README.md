## ElevenLabs Notification System

<p align="center">
  <a href="https://www.allysolutions.ai">
    <img src="./assets/elevenlabs.png" width="150" alt="ally" style="margin: 0 15px;" />
  </a>
  <a href="https://www.allysolutions.ai">
    <img src="./assets/gmail.png" width="150" alt="ally" style="margin: 0 15px;" />
  </a>
  <a href="https://allysolutions.ai">
    <img src="./assets/slack.png" width="150" alt="ally" style="margin: 0 15px;" />
  </a>
</p>

<h1 align="center">
  ElevenLabs Notification System
</h1>



### Steps to run the project locally

Clone the repository
```bash
git clone https://github.com/uchiha-vivek/ElevenLabs-notification-Agent.git
cd ElevenLabs-notification-Agent
```

Install the dependencies
```bash
npm install
```

Run the server
```bash
npm run dev
```


For this you need to have ngrok installed on your machine for sending proxy requests

### For Windows

you must have **Chocolatey** installed

1. Open Powershell as Administrator

2. Run the command
```bash
choco install ngrok
```

3. Check the version
```bash
ngrok version
```

After successfull Installation, run the following command
```bash
ngrok http 5000
```
<a href="https://www.allysolutions.ai">
    <img src="./assets/ngrok.png" width="150" alt="ally" style="margin: 0 15px;" />
</a>

Copy the proxy link you get, this needs to be inserted in elevenlabs url section. This proxy link will forward all the requests to localhost:5000


### Elven Lab stuff

1. Make a new chat only assistant
 <img src="./assets/step1.png" width="450" height='500 alt="ally" style="margin: 0 15px;" />


