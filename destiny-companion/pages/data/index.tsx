import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Image from "next/image";
import PaginationCustom from "../../components/Pagination";

interface ItemData{
  name:string,
  hash:number ,
  icon:string,
  itemTypeAndTierDisplayName:string,
  itemTypeDisplayName:string,
}

export default function Data({ jsonData }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(25);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = jsonData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const blurDataURL = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="

  return (
    <>
      <Head>
        <title>D2 Companion | Data</title>
        <meta name="description" content="Destiny 2 Companion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row xs={1} md={5} className="g-4">
      {currentItems.map((elem: any, i: number) => (
        <div key={i}>
          <Col>
          <Card style={{ width: "200px", backgroundColor: "black", color: "white"}}>
            <Card.Body>
            <Image src={elem.icon === null ? "https://placehold.co/90":`https://www.bungie.net${elem.icon}`} width={90} height={90} alt={elem.name} placeholder="blur" blurDataURL={blurDataURL}></Image>
              <Card.Title>{elem.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{elem.itemTypeDisplayName}</Card.Subtitle>
              <Card.Text>{elem.itemTypeAndTierDisplayName}</Card.Text>
            </Card.Body>
          </Card>
          </Col>
        </div>
      ))}
      </Row>

      <PaginationCustom
        itemPerPage={itemPerPage}
        totalItems={jsonData.length}
        paginate={paginate}
        currentPage = {currentPage}
      ></PaginationCustom>
    </>
  );
}

export async function getStaticProps() {
  //const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getManifest = await fetch(
    "https://www.bungie.net/Platform/Destiny2/Manifest/",
    {
      method: "GET",
      headers: {
        //"X-API-KEY": `${apiKey}`, //není třeba apiKey
        "Content-type": "application/json",
      },
    }
  );
  const data = await getManifest.json();
  console.log("manifest:", data.Response.jsonWorldContentPaths.en);

  const f2 = await fetch(
    `https://www.bungie.net${data.Response.jsonWorldContentPaths.en}`,
    {
      method: "GET",
      headers: {
        //"X-API-KEY": `${apiKey}`, //není třeba apiKey
        "Content-type": "application/json",
      },
    }
  );
  // /common/destiny2_content/json/en/aggregate-ed55fd73-3627-4784-9026-96aae1a7b82f.json
  //const data = (await f2.json())
  // .map((elem) => {
  //     elem.displayProperties.icon = null
  //     return elem
  // })
  const jsonData = await f2.json();
  //console.log("name: ", Object(jsonData.DestinyInventoryItemDefinition['2148295091']))

  console.log("icon: ",jsonData.DestinyInventoryItemDefinition["2148295091"].displayProperties.icon);
  const dataArr = [];
  const itemIds = Object.keys(jsonData.DestinyInventoryItemDefinition);
  for (let i = 0; i < itemIds.length; i++) {
    const elem = jsonData.DestinyInventoryItemDefinition[itemIds[i]];
    if (elem.displayProperties.name.length > 0 && elem.displayProperties.name != "Classified") {
      dataArr.push({
        name: elem.displayProperties.name,
        hash: elem.hash,
        icon: elem.displayProperties.hasIcon === false ? null : elem.displayProperties.icon,
        itemTypeAndTierDisplayName: elem.itemTypeAndTierDisplayName,
        itemTypeDisplayName: elem.itemTypeDisplayName,
      });
    }
  }


  //console.log("hash: ", dataArr[236].hash)
  return { props: { jsonData: dataArr }, revalidate: 10000 };
}

/*[
  'DestinyNodeStepSummaryDefinition',
  'DestinyArtDyeChannelDefinition',
  'DestinyArtDyeReferenceDefinition',
  'DestinyPlaceDefinition',
  'DestinyActivityDefinition',
  'DestinyActivityTypeDefinition',
  'DestinyClassDefinition',
  'DestinyGenderDefinition',
  'DestinyInventoryBucketDefinition',
  'DestinyRaceDefinition',
  'DestinyTalentGridDefinition',
  'DestinyUnlockDefinition',
  'DestinySandboxPerkDefinition',
  'DestinyStatGroupDefinition',
  'DestinyProgressionMappingDefinition',
  'DestinyFactionDefinition',
  'DestinyVendorGroupDefinition',
  'DestinyRewardSourceDefinition',
  'DestinyUnlockValueDefinition',
  'DestinyRewardMappingDefinition',
  'DestinyRewardSheetDefinition',
  'DestinyItemCategoryDefinition',
  'DestinyDamageTypeDefinition',
  'DestinyActivityModeDefinition',
  'DestinyMedalTierDefinition',
  'DestinyAchievementDefinition',
  'DestinyActivityGraphDefinition',
  'DestinyActivityInteractableDefinition',
  'DestinyBondDefinition',
  'DestinyCharacterCustomizationCategoryDefinition',
  'DestinyCharacterCustomizationOptionDefinition',
  'DestinyCollectibleDefinition',
  'DestinyDestinationDefinition',
  'DestinyEntitlementOfferDefinition',
  'DestinyEquipmentSlotDefinition',
  'DestinyEventCardDefinition',
  'DestinyStatDefinition',
  'DestinyInventoryItemDefinition',
  'DestinyInventoryItemLiteDefinition',
  'DestinyItemTierTypeDefinition',
  'DestinyLocationDefinition',
  'DestinyLoreDefinition',
  'DestinyMaterialRequirementSetDefinition',
  'DestinyMetricDefinition',
  'DestinyObjectiveDefinition',
  'DestinyPlatformBucketMappingDefinition',
  'DestinyPlugSetDefinition',
  'DestinyPowerCapDefinition',
  'DestinyPresentationNodeDefinition',
  'DestinyProgressionDefinition',
  'DestinyProgressionLevelRequirementDefinition',
  'DestinyRecordDefinition',
  'DestinyRewardAdjusterPointerDefinition',
  'DestinyRewardAdjusterProgressionMapDefinition',
  'DestinyRewardItemListDefinition',
  'DestinySackRewardItemListDefinition',
  'DestinySandboxPatternDefinition',
  'DestinySeasonDefinition',
  'DestinySeasonPassDefinition',
  'DestinySocketCategoryDefinition',
  'DestinySocketTypeDefinition',
  'DestinyTraitDefinition',
  'DestinyTraitCategoryDefinition',
  'DestinyUnlockCountMappingDefinition',
  'DestinyUnlockEventDefinition',
  'DestinyUnlockExpressionMappingDefinition',
  'DestinyVendorDefinition',
  'DestinyMilestoneDefinition',
  'DestinyActivityModifierDefinition',
  'DestinyReportReasonCategoryDefinition',
  'DestinyArtifactDefinition',
  'DestinyBreakerTypeDefinition',
  'DestinyChecklistDefinition',
  'DestinyEnergyTypeDefinition'
] */
