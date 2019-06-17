import { IUserData } from './ProfileUpdate';

export default class MockHttpClient {
  private static _user: IUserData = {
    userID: 'any-user-id-2343',
    name: 'John Doe',
    email: 'john.doe@fakemail.com'
  }

  public static get(): Promise<IUserData> {
    return new Promise<IUserData>((resolve) => {
      resolve(MockHttpClient._user);
    });
  }
}
