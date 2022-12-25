import Head from "next/head";
import { useState } from "react";
import { Button } from "react-bootstrap";

// {
//     displayProperties: {
//         name: string,
//         description: string,
//         hasIcon: boolean
//     },
//     isDisplayable: boolean,
//     damageType: number,
//     hash: number,
//     index: number,
//     redacted: boolean,
//     blacklisted: boolean
// }

export default function Data({ data }: any) {
  // [title, setTitle] = useState("tvoje mama")

  //console.log(Object.keys(data.DestinyClassDefinition["3655393761"]))

  //console.log(data.DestinyClassDefinition['3655393761'])

  return (
    <>
      <Head>
        <title>D2 Companion | Data</title>
        <meta name="description" content="Destiny 2 Companion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
import { getDestinyManifest, getDestinyManifestSlice, HttpClientConfig } from "bungie-api-ts/destiny2";

export async function getStaticProps(config: HttpClientConfig) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getManifest = await fetch("https://www.bungie.net/Platform/Destiny2/Manifest/", {
    method: "GET",
    headers: {
      "X-API-KEY": `${apiKey}`,
      "Content-type": "application/json",
    },
 });
  const data = await getManifest.json();
  console.log("manifest:", data);
  const f2 = await fetch(`https://www.bungie.net/common/destiny2_content/json/en/aggregate-ed55fd73-3627-4784-9026-96aae1a7b82f.json`, {
        method: "GET",
        headers: {
          //"X-API-KEY": `${apiKey}`, //není třeba apiKey
          "Content-type": "application/json",
        },
    })
  // /common/destiny2_content/json/en/aggregate-ed55fd73-3627-4784-9026-96aae1a7b82f.json
  //const data = (await f2.json())
  // .map((elem) => {
  //     elem.displayProperties.icon = null
  //     return elem
  // })
    const jsonData = await f2.json()
  console.log("hand cannon: ", jsonData.DestinyInventoryItemDefinition['1706536806'].displayProperties.name)

  

  return { props: { data } } };


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
