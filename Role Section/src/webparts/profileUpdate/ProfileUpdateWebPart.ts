import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ProfileUpdateWebPartStrings';
import ProfileUpdate from './components/ProfileUpdate';
import { IProfileUpdateProps } from './components/IProfileUpdateProps';

export interface IProfileUpdateWebPartProps {
  description: string;
}

export default class ProfileUpdateWebPart extends BaseClientSideWebPart<IProfileUpdateWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProfileUpdateProps > = React.createElement(
      ProfileUpdate,
      {
        description: this.properties.description,
        pageContext: this.context.pageContext

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
