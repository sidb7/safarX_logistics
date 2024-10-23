import React from "react";
import checkIcon from "../../assets/Check.png";
import crossIcon from "../../assets/cross.svg";

interface FeatureSubMenu {
  featureSubTitle: string;
  isActive: boolean;
}

interface Feature {
  featureTitle: string;
  featureSubMenu: FeatureSubMenu[];
}

interface RateCard {
  rateCardName: string;
  featureRateCard: Feature[];
}

interface Props {
  featureRateCardData: RateCard[];
}

const FeatureRateCard: React.FC<Props> = ({ featureRateCardData }) => {
  // Extract all unique feature titles and subtitles
  const getAllFeatureTitles = () => {
    const titles: { [key: string]: string[] } = {};

    featureRateCardData.forEach((rateCard) => {
      rateCard.featureRateCard.forEach((feature) => {
        if (!titles[feature.featureTitle]) {
          titles[feature.featureTitle] = feature.featureSubMenu.map(
            (sub) => sub.featureSubTitle
          );
        }
      });
    });

    return titles;
  };

  const featureTitles = getAllFeatureTitles();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-none border-separate border-spacing-y-2">
        <thead>
          <tr className="">
            <th className="py-2 px-4 h-[44px] w-[240px] font-Lato text-[18px] !text-left">
              Features
            </th>
            {featureRateCardData.map((rateCard) => (
              <th
                key={rateCard.rateCardName}
                className="py-2 px-4 font-Lato font-bold text-[18px] !text-left text-[#004EFF]"
              >
                {rateCard.rateCardName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(featureTitles).map(([featureTitle, subTitles]) => (
            <React.Fragment key={featureTitle}>
              <tr>
                <td className="py-2 px-4 font-semibold font-Lato text-[28px] text-[#000000] text-left border-r-0">
                  {featureTitle}
                </td>
              </tr>
              {subTitles.map((subTitle) => (
                <tr key={subTitle}>
                  <td className="py-2 px-4 text-left border-r-0 font-Lato font-normal text-[18px]">
                    {subTitle}
                    <hr className="mt-[18px]" />
                  </td>
                  {featureRateCardData.map((rateCard) => {
                    const feature = rateCard.featureRateCard.find(
                      (f) => f.featureTitle === featureTitle
                    );
                    const subFeature = feature?.featureSubMenu.find(
                      (sub) => sub.featureSubTitle === subTitle
                    );

                    return (
                      <td
                        key={`${rateCard.rateCardName}-${subTitle}`}
                        className="py-2 px-4 border-r-0 text-left"
                      >
                        {subFeature?.isActive ? (
                          <img src={checkIcon} height={24} width={24} />
                        ) : (
                          <img src={crossIcon} height={24} width={24} />
                        )}
                        <hr className="mt-[18px]" />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureRateCard;
