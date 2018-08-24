import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import * as jQuery from "jquery";
import styles from './FullBleedWebPartWebPart.module.scss';
import * as strings from 'FullBleedWebPartWebPartStrings';

export interface IFullBleedWebPartWebPartProps {
  fullBleed: boolean;
}

export default class FullBleedWebPartWebPart extends BaseClientSideWebPart<IFullBleedWebPartWebPartProps> {
  constructor() {
    super();

  }

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
        // Full bleed hack
        if (this.properties.fullBleed) {
          jQuery("#workbenchPageContent").prop("style", "max-width: none");
          jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
          jQuery(".CanvasZone").prop("style", "max-width: none");
      } else {
          jQuery("#workbenchPageContent").removeProp("style");
          jQuery(".SPCanvas-canvas").removeProp("style");
          jQuery(".CanvasZone").removeProp("style");
      }
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.fullBleedWebPart }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">Running Full Bleed: ${this.properties.fullBleed}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('fullBleed', {
                  label: strings.FullBleedFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
