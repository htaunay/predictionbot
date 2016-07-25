# predictionbot

Bot for predicting soccer games results, based on Bing's sports prediction
feature

## Setup

The bot depends on [node](https://nodejs.org/en/), which I recommend installing
through nvm:

```bash
# download and setup the package
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash

# re-load bashrc
source ~/.bashrc

# install the latest LTS version of node
nvm install --lts

# then enable the installed node version
nvm use --lts
```

With node all set, you can download and setup the bot:

```bash
git clone git@github.com:htaunay/predictionbot.git
cd predictionbot

npm install
```

With this, the service side of the bot is ready. However, to enable the bot's
intelligence, you will have to work with [luis.ai](www.luis.ai), a NLP framework.
I suggest you create your own account, and import into a new app the latest
version of the model for the bot, found in the [luis.json](https://github.com/htaunay/predictionbot/blob/master/luis.json) file.

After you create the app and import the model, the last step will be editing
the **start.sh** script to include your app's key, which should look something
like this:

```bash
LUIS_URL="https://api.projectoxford.ai/luis/v1/application?id=<hash>&subscription-key=<hash>" node index.js
```

After that, all you need to do is run:

```bash
./start.sh
```

and a console version of the bot should run without problems.
