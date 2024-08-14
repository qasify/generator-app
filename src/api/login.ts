interface Credentials {
  login: string;
  pass: string;
}

interface UserResponse {
  token: string;
  userId: string;
}

export const login = async (
  credentials: Credentials
): Promise<UserResponse | null | undefined> => {
  try {

    const user = Users.find((user) => user.login===credentials.login && user.pass===credentials.pass)
    if(user){
      return {
        userId: user.userId,
        token: 'mytoken'
      }
    }
    return
  } catch (error) {
    console.error("Error:", error);
    return;
  }
};


const Users = [
  {
    userId: '123',
    login: 'test@mail.com',
    pass: 'qwer'
  }
]