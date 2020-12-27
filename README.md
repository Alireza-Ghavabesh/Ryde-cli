This is a command line interface on rayconnect platform for CREATE, EDIT, READ, REMOVE and MKDIR.


commands:

    setup and usage steps:
        Note: this tool uses nano editor currently for doing 
        works. so u have to install nano on your system by:
            $ sudo apt install nano
        
        step 1: clone repo
        step 2: cd rayde-cli/RYDE/
        step 3: cd Rayde-host && npm install && npm start
        step 4: open new terminal
        step 5: cd Rayde-client && npm install && npm link

    congratulations, after this steps you can use (rayde) cli.

    examples:

        for example i want to make app.py file on host:
                rayde edit app.py
        for example i want to make project1 folder 
            rayde mkdir project1

        for example i want to read app.py
            rayde read app.py

        for example i want to remove a file or folder
            rayde rm app.py
            rayde rm project1
        ( under the hood it uses rm -rf for remove :) )
