import { useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import { useState } from 'react';

function LinkedInLogin() {
  const [code, setCode] = useState("")
  const { linkedInLogin } = useLinkedIn({
    clientId: '78xydcvaf56v7v',
    redirectUri: `${typeof window === 'object' && window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
      setCode(code);
    },
    onError: (error) => {
      console.log(error);
      setCode("");
    },
  });

  return (
    <div>
      <img
      onClick={linkedInLogin}
      src='/linkedin.png'
      alt="Sign in with Linked In"
      style={{ maxWidth: '180px', cursor: 'pointer' }}
      />
      {/* {!code && <div>No code</div>}
      {code && (
        <div>
          <div>Authorization Code: {code}</div>
          
        </div>
      )} */}
    </div>
  );
}

export default LinkedInLogin;