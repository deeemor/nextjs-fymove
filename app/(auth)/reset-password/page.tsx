'use client'; // Must be at the top
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  return (
    <div>
      <h1>Reset Password</h1>
      <p>Token: {token}</p>
      {/* Your form implementation here */}
    </div>
  );
}