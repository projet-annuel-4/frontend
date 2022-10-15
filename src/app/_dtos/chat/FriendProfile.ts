export class FriendProfile {
  id: string
  friendId: string
  email: string
  name: string
  firstName: string
  lastName: string
  imgUrl: string
  blockedBy: string
  lastMsg: string = ''
  lastMsgAt: Date
  unreadMsgs: number = 0
  updatedAt: Date

  constructor(
    id: string,
    friendId: string,
    email: string,
    firstName: string,
    lastName: string,
    imgUrl: string,
    blockedBy: string,
    updatedAt: string
  ) {
    this.id = id
    this.friendId = friendId
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.name = firstName + ' ' + lastName
    this.imgUrl = imgUrl
    this.blockedBy = blockedBy
    this.updatedAt = new Date(updatedAt)
  }

  updateConv(lastMsg: string, lastMsgAt: Date) {
    this.lastMsg = lastMsg
    this.lastMsgAt = lastMsgAt
  }

  update(
    id: string,
    friendId: string,
    email: string,
    firstName: string,
    lastName: string,
    imgUrl: string,
    blockedBy: string,
    updatedAt: Date
  ) {
    this.id = id
    this.friendId = friendId
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.name = firstName + ' ' + lastName
    this.imgUrl = imgUrl
    this.blockedBy = blockedBy
    this.updatedAt = updatedAt
  }

  incrementUnread() {
    this.unreadMsgs += 1
  }
}
