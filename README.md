# sample-Tasks
Open source cross-platform Tasks app built with NativeScript.

Use this application to find-out how to implement common mobile scenarios with NativeScript.
## Running the sample

1. Make sure you have the [NativeScript Command-line Interface](https://www.npmjs.com/package/nativescript) installed as well as all the prerequisites for the NativeScript development, described in the package page.
2. Compile the TypeScript code

2.1. Install the dev dependencies of the sample (TypeScript)
        `npm install`

2.2. Compile the TypeScript code to JavaScript
        `node_modules/typescript/bin/tsc --outDir app/ -t ES5 -m commonjs app/**/*.tsz

3. Add the preferred platform-specific tools to the project library. Note that iOS development is only available with a Mac machine.

    `tns platform add ios|android`

4. Run the project.

    `tns run ios|android [--emulator]`

    The `--emulator` keyword instructs the CLI to load the iOS simulator or an android emulator depending on the platform you want.


For convenience you can use the `run.bat`/`run.sh` scripts on a \*NIX/windows environment respectively. The `run.sh` script starts the sample in iOS when run on a Mac and Android on Linux/Windows. The `run.bat` script runs the sample on an Android emulator under Windows.

For \*NIX systems the following script runs the sample directly:

`curl https://raw.githubusercontent.com/NativeScript/sample-Tasks/master/run.sh | bash`

**Scenario**

We chose an app that we know will cover a lot of useful scenarios:

1. User management
  1. User authentication
  2. User registration
  3. User welcome email

2. Cloud data 
  1. read, update, delete and create data entry stored in the cloud
  2. Offline support for the data (not in this article, but coming soon)

3. Modern UX
  1. Using SideBar
  2. Pull to Refresh
  3. FAB (floating action button for Android Lollipop)
  4. Load on demand for many tasks

4. Device integration
  1. using camera
  2. using phone contacts

5. Patterns/Technologies used
  1. MVVM 
  2. CSS for styling
  3. XML and data-binding for describing the UI
  4. Platform specific targeting for the Android FAB button       
  5. 3rd party native libraries to load Telerik UI

Please read the series of articles that explain how this application is being implemented - https://www.nativescript.org/blog/nativescript-open-source-sample---tasks


