import { DamageType, DestinyDamageTypeDefinition } from "bungie-api-ts/destiny2";
import Image from "next/image";


export default function Item({ data }:any) {
  console.log(data.itemData)
  const response = data.itemData.Response
  const name = response.displayProperties.name
  const icon = response.displayProperties.icon
  const secondaryIcon = response.secondaryIcon
  const screenshot = response.screenshot
  const tierTypeName = response.inventory.tierTypeName
  const itemTypeDisplayName = response.itemTypeDisplayName
  


  return (<>
  <div className="container mt-5">
  <div className="row">
      <div className="col-lg-10">
          
          <article>
             
              <header className="mb-4">
                <div className="row">
                    <div className="col-lg-2">
                        <Image src={`https://www.bungie.net${icon}`} alt={name} width={90} height={90}></Image>
                    </div>
                    <div className="col-lg-8">
                        <h1 className="fw-bolder mb-1">{name}</h1>
                        <div className="text-muted fst-italic mb-2">{response.flavorText}</div>
                        <div className="badge bg-secondary rounded-pill text-decoration-none me-1" >{tierTypeName}</div>
                        <div className="badge bg-secondary rounded-pill text-decoration-none me-1" >{itemTypeDisplayName}</div>
                    </div>
                  </div>
                 
              </header>
            
              <figure className="mb-4 row">
                <Image src={`https://www.bungie.net${screenshot}`} className="img-fluid" alt={name} width={500} height={250}></Image>
              </figure>

              <section className="mb-5">
                 
              </section>
          </article>
         
          
      </div>
      
      <div className="col-lg-10">
        
          <div className="card mb-4">
              <div className="card-header">Categories</div>
              <div className="card-body">
                  <div className="row">
                      <div className="col-sm-6">
                          <ul className="list-unstyled mb-0">
                              <li><a href="#!">Web Design</a></li>
                              <li><a href="#!">HTML</a></li>
                              <li><a href="#!">Freebies</a></li>
                          </ul>
                      </div>
                      <div className="col-sm-6">
                          <ul className="list-unstyled mb-0">
                              <li><a href="#!">JavaScript</a></li>
                              <li><a href="#!">CSS</a></li>
                              <li><a href="#!">Tutorials</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
          
          <div className="card mb-4">
              <div className="card-header">Side Widget</div>
              <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
          </div>
      </div>
  </div>
</div>
</> 
  )
}

export async function getStaticPaths() {

    const getManifest = await fetch(
        "https://www.bungie.net/Platform/Destiny2/Manifest/",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await getManifest.json();
      console.log("manifest:", data.Response.jsonWorldContentPaths.en);
    
      const jsonWorldContentPaths = await fetch(
        `https://www.bungie.net${data.Response.jsonWorldContentPaths.en}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    
     const jsonData = await jsonWorldContentPaths.json();
      console.log("name: ", Object(jsonData.DestinyInventoryItemDefinition['2148295091']))
      const itemIds = Object.keys(jsonData.DestinyInventoryItemDefinition);
      const ids = itemIds.map(e => {
        return {params: {
            id: e
        }
      }})
      console.log(ids)
    return {
      paths: ids,
      fallback: false, // can also be true or 'blocking'
    }
  }
  
  // getStaticPaths requires using getStaticProps
  export async function getStaticProps(context:any) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const inventoryItem = 'DestinyInventoryItemDefinition'
    const damageType = "DestinyDamageTypeDefinition"
    const { id } = context.params

    const itemFetch = await fetch(
        `https://www.bungie.net/Platform/Destiny2/Manifest/${inventoryItem}/${id}/`,
        {
          method: "GET",
          headers: {
            'X-API-Key': `${apiKey}`,
            "Content-type": "application/json",
          },
        }
      );
      const itemData = await itemFetch.json();
     
    /*const damageTypeFetch = await fetch(        
        `https://www.bungie.net/Platform/Destiny2/Manifest/${damageType}/${itemData.Response.damageTypeHashes}/`,
        {
        method: "GET",
        headers: {
            'X-API-Key': `${apiKey}`,
            "Content-type": "application/json",
      },
    })
     const damageTypeData = await damageTypeFetch.json() 
        console.log("damageType: ", damageTypeData)*/
    return {
      // Passed to the page component as props
      props: { data: { itemData } },
    }
  }
  