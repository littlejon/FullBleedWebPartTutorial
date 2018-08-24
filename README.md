## SPFX Full Bleed WebPart Tutorial

Really quick and simple hack to have a WebPart run Full Bleed (ie use all available space) within a Modern SharePoint Page.

I would suggest if you are going to use this in your own WebParts that you test thoroughly in your own environment, it is best suited for pages where you only want a single WebPart.

I have used jQuery to make life easier, although it should be fairly straightforward to do without needing to pull in a new project dependency.

It also goes without saying that this configuration is not supported by Microsoft at all. Use at your own risk.

### Instructions ###

```bash
git clone https://github.com/littlejon/FullBleedWebPartTutorial.git
npm install
gulp serve
```

### The Code ###

To test in your own WebPart. You will need jQuery installed the following to work

```bash
npm install jquery @types/jquery
```

Add include in your `.ts` or `.tsx` file

```javascript
import * as jQuery from "jquery";
```

Simply add the following lines in the WebPart initialisation.

```javascript
public onInit(): Promise<void> {
    return super.onInit().then(_ => {
        jQuery("#workbenchPageContent").prop("style", "max-width: none");
        jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
        jQuery(".CanvasZone").prop("style", "max-width: none");
    });
}
```

