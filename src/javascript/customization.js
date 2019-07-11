/*
########################################
              MIT License

Copyright (c) 2019 Marc Espín Sanz

License > https://github.com/Graviton-Code-Editor/Graviton-App/blob/master/LICENSE.md

#########################################
*/

detectLanguages();
const loadTheme = number => {
  themeObject = themes[number];
  const colors = themes[number]["colors"]; //Take the colors object inside the JSON file of the selected theme
  for (i = 0; i < Object.keys(colors).length; i++) {
    if (current_config.accentColorPreferences == "system" && Object.keys(colors)[i] == "accentColor") {
      try {
        document.documentElement.style.setProperty("--accentColor", "#" + systemPreferences.getAccentColor());
      } catch { //Returns an error = system is not compatible, Linux-based will probably throw that error
        new Notification("Issue", "Your system is not compatible with accent color matching.")
      }
    } else {
      if ((current_config.animationsPreferences == "desactivated" && Object.keys(colors)[i] != "scalation") || current_config.animationsPreferences == "activated") { //Prevent changing the scalation when the animations are off
        document.documentElement.style.setProperty("--" + Object.keys(colors)[i], colors[Object.keys(colors)[i]]); //Update the CSS variables
      }
    }
  }
  for (i = 0; i < editors.length; i++) {
    if (editors[i].editor != undefined) editors[i].editor.setOption("theme", themes[number]["highlight"]); //Update highlither after applying a new theme
  }
  for(i=0;i<editor_screens.length;i++){
    if (editor_screens[i] != undefined) {
      if (editor_screens[i].terminal != undefined) {
        editor_screens[i].terminal.xterm.setOption("theme", {
          background: themeObject.Colors["editor-background-color"],
          foreground: themeObject.Colors["white-black"]
        })
      }
    }
  }
  current_config.theme = themes[number];
  saveConfig(); //Save the current configuration
}
const setThemeByName = name => {
  for (i = 0; i < themes.length; i++) {
    if (themes[i]["name"] == name) {
      current_config["theme"] = themes[i];
      themeObject = themes[i];
      const colors = themes[i]["colors"]; //Take the colors object inside the json file of the selected theme
      for (i = 0; i < Object.keys(colors).length; i++) {
        if (current_config.accentColorPreferences == "system" && Object.keys(colors)[i] == "accentColor") {
          try {
            document.documentElement.style.setProperty("--accentColor", "#" + systemPreferences.getAccentColor());
          } catch {}
        } else {
          if ((current_config.animationsPreferences == "desactivated" && Object.keys(colors)[i] != "scalation") || current_config.animationsPreferences == "activated") { //Prevent changing the scalation when the animations are off
            document.documentElement.style.setProperty("--" + Object.keys(colors)[i], colors[Object.keys(colors)[i]]); //Update the CSS variables
          }
        }
      }
      for (i = 0; i < editors.length; i++) {
        editors[i].editor.setOption("theme", themes[i]["highlight"]); //Update highlither after applying a new theme
      }
      for(i=0;i<editor_screens.length;i++){
        if (editor_screens[i] != undefined) {
          if (editor_screens[i].terminal != undefined) {
            editor_screens[i].terminal.xterm.setOption("theme", {
              background: themeObject.Colors["editor-background-color"],
              foreground: themeObject.Colors["white-black"]
            })
          }
        }
      }
      return;
    }
  }
}