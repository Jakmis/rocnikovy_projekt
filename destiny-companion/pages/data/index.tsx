import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import PaginationCustom from "../../components/Pagination";
import Link from "next/link";

interface ItemData {
  name: string;
  hash: number;
  icon: string;
  itemTypeAndTierDisplayName: string;
  itemTypeDisplayName: string;
}

export default function Data({ jsonData }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(50);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = jsonData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Head>
        <title>D2 Companion | Data</title>
        <meta name="description" content="Destiny 2 Companion" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <div className="row mt-4">
          {currentItems.map((elem: any, i: number) => (
            <div className="col-md-4" key={i}>
              <Link
                href={/data/ + elem.hash}
                style={{ textDecoration: "none" }}
              >
                <div className="card mb-3 text-bg-dark h-90">
                  <div className="card-header">
                    {elem.itemTypeDisplayName == ""
                      ? "Misc."
                      : elem.itemTypeDisplayName}{" "}
                    | {elem.hash}
                  </div>
                  <div className="row">
                    <div className="col-md-2">
                      <Image
                        src={
                          elem.icon === null
                            ? "https://placehold.co/90?text=?&font=nunito"
                            : `https://www.bungie.net${elem.icon}`
                        }
                        width={90}
                        height={90}
                        alt={elem.name}
                      ></Image>
                    </div>
                    <div className="col-md-10">
                      <div className="card-body ms-5">
                        <h6 className="card-title text-truncate">
                          {elem.name}
                        </h6>
                        <h6 className="card-subtitle mb-2 text-muted text-truncate">
                          {elem.itemTypeAndTierDisplayName}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <PaginationCustom
        itemPerPage={itemPerPage}
        totalItems={jsonData.length}
        paginate={paginate}
        currentPage={currentPage}
      ></PaginationCustom>
    </>
  );
}

export async function getStaticProps() {
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

  const f2 = await fetch(
    `https://www.bungie.net${data.Response.jsonWorldContentPaths.en}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const jsonData = await f2.json();
  //console.log("name: ", Object(jsonData.DestinyInventoryItemDefinition['2148295091']))

  console.log(
    "icon: ",
    jsonData.DestinyInventoryItemDefinition["2148295091"].displayProperties.icon
  );
  const dataArr = [];
  const itemIds = Object.keys(jsonData.DestinyInventoryItemDefinition);
  for (let i = 0; i < 500; i++) {
    const elem = jsonData.DestinyInventoryItemDefinition[itemIds[i]];
    if (
      elem.displayProperties.name.length > 0 &&
      elem.displayProperties.name != "Classified"
    ) {
      dataArr.push({
        name: elem.displayProperties.name,
        hash: elem.hash,
        icon:
          elem.displayProperties.hasIcon === false
            ? null
            : elem.displayProperties.icon,
        itemTypeAndTierDisplayName: elem.itemTypeAndTierDisplayName,
        itemTypeDisplayName: elem.itemTypeDisplayName,
      });
    }
  }

  //console.log("hash: ", dataArr[236].hash)
  return { props: { jsonData: dataArr }};
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
