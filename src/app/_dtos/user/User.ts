export class User {
  id: number
  firstName: string
  lastName: string
  email: string
  nbFollowers: number
  nbSubscriptions: number
  imgUrl: string

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    nbFollowers: number,
    nbSubscriptions: number,
    imgUrl: string
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.nbFollowers = nbFollowers
    this.nbSubscriptions = nbSubscriptions
    this.imgUrl = imgUrl
  }
}
