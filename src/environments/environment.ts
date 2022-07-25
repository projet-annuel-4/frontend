// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  LOCAL_MEHDI_PROJECT: 'http://localhost:8500',
  DOMAIN: 'http://localhost:8072', /* api gateway */
  //DOMAIN: 'http://localhost:8096', /* post-service URL */
  API_VERSION: 'api/v1',

  AUTH: `auth`,
  REGISTRATION: `registration`,
  CHAT: `chat`,
  USERS: `users`,
  POST: `post`,
  FOLLOW: `followLink`,
  USERS_GROUPS: `users-group`,
  FILE: `files`

};

export const auth_service = {
  LOGIN: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/login`,
  REGISTRATION: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/${environment.REGISTRATION}`,

  FORGOT_PASSWORD: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/forgot`,
  EDIT_PASSWORD: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/edit/password`,
}

export const chat_service = {

  CHAT: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.CHAT}`

}

export const user_service = {
  INFO: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/${environment.USERS}/info`,
  UPDATE: `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/${environment.USERS}/edit`
}

export const code_execution_service = {
  SEND: ``
}

export const post_service = {
  //TODO : Mettre à jour le port une fois l'api-gateway configurée
    BASE_URL: `http://localhost:8096/${environment.API_VERSION}/${environment.POST}`
}



export const follower_service = {
  BASE_URL: `http://localhost:8096/${environment.API_VERSION}/${environment.FOLLOW}`
}

export const group_service = {
  BASE_URL: `${environment.DOMAIN}/${environment.USERS_GROUPS}/groups`
}

export const file_service = {
  BASE_URL: `${environment.DOMAIN}/files-management/${environment.API_VERSION}/${environment.FILE}`
}

export const project_service = {
  BASE_URL: `${environment.LOCAL_MEHDI_PROJECT}/${environment.API_VERSION}`
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
