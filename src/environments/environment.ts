// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  token: 'jwtToken',
  apiUrl: '',
  firebase: {
    apiKey: 'AIzaSyA7TbPZc1pLxakc090RsfFDrxGuXlGV6-M',
    authDomain: 'fire-auth-8fd44.firebaseapp.com',
    databaseURL: 'https://fire-auth-8fd44.firebaseio.com',
    projectId: 'fire-auth-8fd44',
    storageBucket: 'fire-auth-8fd44.appspot.com',
    messagingSenderId: '893629072234',
    appId: '1:893629072234:web:9ed3f9c2e2690fdc'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
