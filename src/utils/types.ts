export interface IWorkspace {
  _id: string
  name: string
  owner: IUser
  invitationCode: string
  members: IUser[]
  defaultChannel: IChannel
  channels: IChannel[]
  description: string
}

export interface IUser {
  _id: string
  userId: string
  password: string
  userType: UserType
  userName: string
  owningWorkspaces: IWorkspace[]
  participatingWorkspaces: IWorkspace[]
  owningChannels: IChannel[]
  participatingChannels: IChannel[]
  owningDMs: IDirectmessage[]
  participatingDMs: IDirectmessage[]
}

export enum UserType {
  STUDENT = 'STUDENT',
  TA = 'TA',
  PROFESSOR = 'PROFESSOR',
}

export interface IReaction {
  name: string
  reactingChat: IChat
  reactor: IUser
}

export interface IDirectmessage {
  name: string
  owner: IUser
  members: IUser[]
  muteMembers: IUser[]
}

export interface IChat {
  content: string
  reactions: IReaction[]
  sender: IUser
  receiver: IUser
}

export interface IChannel {
  _id: string
  name: string
  description: string
  owner: IUser
  members: IUser[]
  workspace: IWorkspace
}
