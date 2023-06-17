import { useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import { useEffect, useState } from 'react';

const getURLWithQueryParams = (base, params) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${base}?${query}`;
}

const getAccessCode = (code) => {
  const LINKEDIN_URL = getURLWithQueryParams(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT,
      client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET
    }
  );
  let tok;
  console.log(LINKEDIN_URL)
  fetch(LINKEDIN_URL, {
    method: "POST",
    mode: "cors",
    headers: {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'*'}
  }).then((response) => {console.log(response); return response.json()})
    .then((data) => {
      let { access_token, expires_in } = tok;
      console.log(tok)
    });    
}

const LinkedInLogin = (props) => {
  const [code, setCode] = useState("")
  const { linkedInLogin } = useLinkedIn({
    clientId: '78xydcvaf56v7v',
    redirectUri: `${typeof window === 'object' && window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
      setCode(code);
      props.setToken(code)
    },
    onError: (error) => {
      console.log(error);
      setCode("");
    },
    scope: 'r_emailaddress r_liteprofile'
  });

  useEffect(() => {
    console.log("hi")
    if (code !== "") {
      getAccessCode(code)
    }
  }, [code])

  

  return (
    <div style={{marginTop: "20px"}}>
      <img
      onClick={linkedInLogin}
      src='/linkedin.png'
      alt="Sign in with Linked In"
      style={{ maxWidth: '180px', cursor: 'pointer' }}
      />
      {console.log(code)}
      {code}
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