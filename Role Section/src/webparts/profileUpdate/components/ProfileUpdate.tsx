import * as React from 'react';
import { connect } from 'react-redux';
import styles from './ProfileUpdate.module.scss';
import { IProfileUpdateProps } from './IProfileUpdateProps';
import { IProfileUpdateState } from './IProfileUpdateState';
import { escape } from '@microsoft/sp-lodash-subset';
import { setAccessToken } from '../actions/userAuthenticateActions';
import request from '../utils/request';

import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

export default class ProfileUpdate extends React.Component<IProfileUpdateProps, IProfileUpdateState> {
  constructor(props: IProfileUpdateProps) {
    super(props);
    this.state = {
      accessToken: '',
      profileOptions: {}
    }
  }

  public componentDidMount(): void {
    request(
      'user.Authenticate',
      '',
      10,
      this.createJWTObject(
        '5dc78bab-4988-4a15-96a2-9eb084fba6f6',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1YW4gU29sbyIsImlhdCI6IjE1MTYyMzkwMjIiLCJ1c2VySUQiOiIxMjIzNDIzNCJ9.cwsPTigweDKmVQgShW_BwcwIjVgNVTeIkT_buJbNIqs'
    )).then(res => {
        this.setState({
          accessToken: res.result.jwt_access_token
        })
      })
  }

  public getProfileOptions() {
    console.log(this.state)
    request(
      'profile.GetInputOptions',
      '',
      3,
      this.state.accessToken
    ).then(res => {
        this.setState({
          profileOptions: res.result
        })
      })
  }

  public componentDidUpdate(): void {
    this.getProfileOptions();
  }

  createJWTObject = (apiKey, jwtToken) => {
    const jwt = { token: jwtToken, apiKey: apiKey };
    return jwt;
  };

  public render(): React.ReactElement<IProfileUpdateProps> {
    return (
      <div className={ styles.profileUpdate }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p>select your sector</p>
              <select>
                <option>Juan</option>
                <option>Two</option>
              </select>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
