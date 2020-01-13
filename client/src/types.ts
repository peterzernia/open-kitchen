export type Login = {
  username: string;
  password: string;
}

export type Register = {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export type User = {
  username: string;
  email: string;
  token?: string;
}

export type Recipe = {
  title: string;
  descriptions: string;
  ingredients: string;
  instructions: string;
  notes: string;
  slug?: string;
}

export type Notification = {
  type: string;
  message: string;
}
