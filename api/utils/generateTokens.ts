import jwt from 'jsonwebtoken';

export default function generateTokens(userId: number) {
  const accessToken = jwt.sign(
    { sub: userId },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: 6000 }
  );
  const refreshToken = jwt.sign(
    { sub: userId },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: 1209600 }
  );
  return { accessToken, refreshToken };
}
