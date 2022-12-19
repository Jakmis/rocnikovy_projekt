const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

export default function Page({ data, withApiKey }: any) {
  console.log(data);
  // const [auth, setAuth] = useState<string | null>(null)



  return (
    <div>
      <Button onClick={() => loginAndGetAccess()}></Button>
      {withApiKey ? <p>api data in</p> : <p>showing default data only</p>}
    </div>
  );
}



export async function getServerSideProps(context: any) {
  const apiKey = process.env.API_KEY;
  console.log(context.query)
  // Fetch data from external API

  if (context.query.code && context.query.code.length > 0) {
    const key = await fetchData(context.query.code)
    console.log("xddddddddd", key["access_token"])

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
        'X-API-Key': "f4725a5aa4504b93a1fd4b8a89aa536e",
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
          "X-API-KEY": "f4725a5aa4504b93a1fd4b8a89aa536e",
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

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

async function loginAndGetAccess() {


  Login();
  // window.addEventListener("storage", function (e) {
  //   if (localStorage.getItem("tabbed") && localStorage.getItem("tabbed")) {
  //     // Reload authorization code from LocalStorage
  //     localStorage.removeItem("tabbed");
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const authCode = urlParams.get("code")
  //     console.log(authCode);

  //     if (authCode != null) {
  //       // console.log(authCode);
  //     } else
  //       console.log("error");
  //   }
  // });
}

    
async function fetchData(authCode: string) {

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
  return btoa(str);
}

function Login() {
  const authorizeUrl = `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`;

  localStorage.setItem("tabbed", "true");
  window.open(authorizeUrl);

}
