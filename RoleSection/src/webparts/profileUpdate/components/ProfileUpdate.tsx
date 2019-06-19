import * as React from "react";
import styles from "./ProfileUpdate.module.scss";
import { IProfileUpdateProps } from "./IProfileUpdateProps";
import { IProfileUpdateState } from "./IProfileUpdateState";
import { escape } from "@microsoft/sp-lodash-subset";
import request from "../utils/request";
import { sign } from "jsonwebtoken";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

const secret = "secret-key";

export default class ProfileUpdate extends React.Component<
  IProfileUpdateProps,
  IProfileUpdateState
> {
  constructor(props: IProfileUpdateProps) {
    super(props);
    this.state = {
      accessToken: "",
      refreshToken: "",
      profileOptions: {}
    };
  }

  public tokenRefresh() {
    let jwt = this.state.refreshToken;
    request("user.Refresh", "", 1, jwt).then(res => {
      this.setState({
        accessToken: res.result.jwt_access_token,
        refreshToken: res.result.refresh_token
      });
    });
  }

  public sectorUpdate(value) {
    let result = {
      sector: parseInt(value)
    };
    let jwt = this.state.accessToken;
    request("profile.Update", result, 10, jwt).then(res => {
      alert("Sector updated!");
    });
  }

  public functionUpdate(value) {
    let result = {
      function: parseInt(value)
    };
    let jwt = this.state.accessToken;
    request("profile.Update", result, 10, jwt).then(res => {
      alert("Function updated!");
    });
  }

  public seniorityUpdate(value) {
    let result = {
      seniority: parseInt(value)
    };
    let jwt = this.state.accessToken;
    request("profile.Update", result, 10, jwt).then(res => {
      alert("Seniority updated!");
    });
  }

  public getProfileOptions() {
    let jwt = this.state.accessToken;
    request("profile.GetInputOptions", "", 3, jwt).then(res => {
      if (res.status === 401) {
        this.tokenRefresh();
      }
      this.setState({
        profileOptions: res.result
      });
    });
  }

  public componentDidMount(): void {
    request(
      "user.Authenticate",
      "",
      10,
      this.createJWTObject(
        "5dc78bab-4988-4a15-96a2-9eb084fba6f6",
        this.buildAuthClaims()
      )
    ).then(res => {
      this.setState(
        {
          accessToken: res.result.jwt_access_token,
          refreshToken: res.result.refresh_token
        },
        () => this.getProfileOptions()
      );
    });
  }

  public createJWTObject = (apiKey, jwtToken) => {
    const jwt = { token: jwtToken, apiKey: apiKey };
    return jwt;
  };

  public buildAuthClaims = () => {
    if (Environment.type === EnvironmentType.SharePoint) {
      let userData = {
        userID: this.props.pageContext.aadInfo.userId._guid,
        name: this.props.pageContext.user.displayName,
        email: this.props.pageContext.user.email
      };
      let payload = JSON.stringify(userData);
      return sign(payload, secret);
    } else if (Environment.type === EnvironmentType.Local) {
      let userData = {
        userID: "any-user-id-2343",
        name: "John Doe",
        email: "john.doe@fakemail.com"
      };
      let payload = JSON.stringify(userData);
      return sign(payload, secret);
    }
  };

  public render(): React.ReactElement<IProfileUpdateProps> {
    return (
      <div className={styles.profileUpdate}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>What's your role?</span>
              <p className={styles.subTitle}>
                Update your profile information to improve your learning
                recommendations.
              </p>
              <p>Select your sector</p>
              <select onChange={e => this.sectorUpdate(e.target.value)}>
                {this.state.profileOptions.sector &&
                  this.state.profileOptions.sector.map(sector => {
                    return (
                      <option key={sector.id} value={sector.id}>
                        {sector.label}
                      </option>
                    );
                  })}
              </select>
              <p>Select your department</p>
              <select onChange={e => this.functionUpdate(e.target.value)}>
                {this.state.profileOptions.function &&
                  this.state.profileOptions.function.map(profileFunction => {
                    return (
                      <option
                        key={profileFunction.id}
                        value={profileFunction.id}
                      >
                        {profileFunction.label}
                      </option>
                    );
                  })}
              </select>
              <p>Select your seniorty level</p>
              <select onChange={e => this.seniorityUpdate(e.target.value)}>
                {this.state.profileOptions.seniority &&
                  this.state.profileOptions.seniority.map(seniority => {
                    return (
                      <option key={seniority.id} value={seniority.id}>
                        {seniority.label}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
