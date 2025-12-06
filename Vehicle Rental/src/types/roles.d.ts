interface UserPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default UserPayload;
