export default function Page({ data, withApiKey }: any) {
  console.log(data);


  return (
    <div>
      <Button onClick={() => loginAndGetAccess()}>Login</Button>
      {withApiKey ? <p>api data in</p> : <p>showing default data only</p>}
    </div>
  );
}



export async function getServerSideProps(context: any) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  console.log(context.query)
  // Fetch data from external API

  if (context.query.code && context.query.code.length > 0) {
    const key = await fetchData(context.query.code)

    // pokud máme access token

    const getCurrentBungieNetUserFetch = await fetch('https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/', {
      headers: {
        'X-API-Key': `${apiKey}`,
        'Authorization': `Bearer ${key["access_token"]}`
      }
    })
    const getCurrentBungieNetUserData = await getCurrentBungieNetUserFetch.json()
    

    console.log("getCurrentBungieNetUserData", getCurrentBungieNetUserData)

    const f = await fetch(`https://www.bungie.net/Platform/User/GetMembershipsById/${getCurrentBungieNetUserData.Response.membershipId}/3/`, {
      headers: {
        'X-API-Key': `${apiKey}`,
        'Authorization': `Bearer ${key["access_token"]}`
      }
    })
    const data = await f.json()

    console.log("data", data)

    return { props: { data, withApiKey: true }}
  } else {

    // pokud nemáme access token

    const res = await fetch(
      "https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018484022123/Character/2305843009412075366/?components=200",
      {
        method: "GET",
        headers: {
          "X-API-KEY": `${apiKey}`,
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();

    console.log(data)

    // Pass data to the page via props
    return { props: { data, withApiKey: false } };
  }
}

import { Button } from "react-bootstrap";

export async function loginAndGetAccess() {
  Login();
}

    
async function fetchData(authCode: string) {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  try {
    const response = await fetch(
      "https://www.bungie.net/Platform/App/OAuth/Token/",
      {
        method: "POST",
        headers: {
          Authorization:
          "Basic " + base64encoded(`${clientId}:${clientSecret}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: 'grant_type=authorization_code&code=' + authCode
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      throw new Error("Request failed: " + response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}

function base64encoded(str: string) {
  return Buffer.from(str).toString('base64');
}

function Login() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const authorizeUrl = `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`;

  window.open(authorizeUrl, "_self");

}
