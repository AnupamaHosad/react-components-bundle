# react-components-bundle

## Using the components library

Install the package from npm

```
npm install react-components-bundle
```

Import the required components along with the CSS.

```
import Button from "react-components-bundle/components/Button";
```

Or less ideally (as this will include all components that you might not use as well)

```
import { Button } from "react-components-bundle";
```

And include the core CSS like below,

```
import "react-components-bundle/components/core.css";
```

The core CSS file will contain the core styles without which the component will not behave as expected. Hence do not forget to include this. 

### Using theme CSS

Theme CSS file will contain the styles which suggests a theme for all the components but is not a must have to use the library.

You can use the theme CSS in 2 ways:

**1. Use individual component CSS**

You can import the individual files for each of the components like below:

```
import "react-components-bundle/components/Table/tableTheme.css";
```

**2. Include the bundled CSS file which has all component's CSS**

You can import the bundled CSS file which contains all the component's CSS like below:

```
import "react-components-bundle/components/theme.css";
```

## Viewing the components

You can view the available components and their props using the storybook at this link:

https://anupamahosad.github.io/react-components-bundle/

## Setting up the project for development

### Prerequisites

Install [npm](https://www.npmjs.com/get-npm)

### Setting Up

Install the npm packages using the following command

```
npm install
```

Start the JS build with watcher using the following command

```
npm run build -- --watch
```

To watch SCSS files & compile them to CSS use the following command

```
npm run scss -- --watch
```

**Note:** Prefix all the CSS classNames with namespace `"RCB-"`

### Linting your JS files

Run the following command to lint the JS code

```
npm run lint
```

Or Install your editor specific plugin by referring to [this link](https://eslint.org/docs/user-guide/integrations)

### Viewing the components

View the available components along with their accepted props using [storybook](https://storybook.js.org/)

To start the storybook run the following command

```
npm run storybook
```

The storybook can then be viewed at http://localhost:6006/

### Publishing the storybook to github pages

Run the following command to publish the storybook to github pages:

```
npm run deploy-storybook
```

### Creating new stories for the components

To help boostrap a new story file, use the following steps

1. Install the VS Code extension [File Templates](https://marketplace.visualstudio.com/items?itemName=brpaz.file-templates)
2. Place the templates in the location expected by the extension
    - In Mac,
    ```cp ./vscode-templates/NewStoryTemplate.stories.js $HOME/Library/Application\ Support/Code/User/FileTemplates```

    - In Linux,
    ```cp ./vscode-templates/NewStoryTemplate.stories.js $HOME/.config/Code/User/FileTemplates```

    - In Windows,
    ```cp ./vscode-templates/NewStoryTemplate.stories.js C:\Users\User\AppData\Roaming\Code\User\FileTemplates```
3. To use the templates you can do one of the following:
    - In VSCode, right click on the folder where you want to generate the new file. You should see an option "Files : New from template". Selecting this option a list of available templates should appear. Just select your template and the file will be created.
    - You can also do the same from the Command Palette. In this case the new file will be created in the root directory of the project.
    - Its also possible to do the other way around and create a template based on an open file. For that "right-click" on any opened file and you should see the option of the context menu.

**Note:** The template will expect the Component name as a parameter

## TODO

- Minify JS / CSS

## FAQs

1) I am getting "multiple instances of React" error. What to do?
    
    You can fix this error by adding the following config in your `webpack.config.js` file

    ```
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react'),
        },
    }
    ```

    For more details refer [this link](https://github.com/facebook/react/issues/13991)

