// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  DOMAIN: 'http://localhost:8080/api/auth',
  API_VERSION: 'api/v1',

  AUTH: `auth`,
  REGISTRATION: `registration`,
  CHAT: `chat`,
  USERS: `users`

};

export const auth_service = {
  //localhost:8082/api/auth/api/v1/users
  LOGIN: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/login`,
  REGISTRATION: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.REGISTRATION}`,

  FORGOT_PASSWORD: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/forgot`,
  EDIT_PASSWORD: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/edit/password`,
}

export const chat_service = {

}

export const user_service = {
  INFO: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.USERS}/info`
}

export const code_execution_service = {
  SEND: ``
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
