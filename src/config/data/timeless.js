import TIMELESS_DATA from '../data/data.json';

const TIMELESS_URL = 'https://api.timeless.investments/assets/';

const creditsURL = assetId => `${TIMELESS_URL}${assetId}`;

export const getInvestments = async () => {
  const data = TIMELESS_DATA;

  const {assets} = data?.data;

  const investments = assets.map(
    ({
      id,
      label,
      type,
      status,
      heroColour,
      pricePerShare,
      averageMarketPrice,
      dropDate,
      images,
    }) => ({
      key: id,
      id,
      title: label,
      category: type,
      status: status,
      color: heroColour,
      dropImage: images?.mediumFlatten,
      thumbnail: images?.medium,
      sharePrice: pricePerShare,
      marketPrice: averageMarketPrice,
      date: dropDate,
      images,
    }),
  );

  return investments;
};

export const getAssetGallery = async assetId => {
  const data = await fetch(creditsURL(assetId)).then(x => x.json());
  const {assetGallery} = data?.data;
  const content = data?.data?.assetHighlights[0]?.content;
  //console.log(content);
  return assetGallery
    .map(data => ({
      key: String(data.id),
      id: data.id,
      thumbnailUrl: data.thumbnailUrl,
      title: data.title,
      content: content,
      type: data.type,
      createdAt: data.createdAt,
    }))
    .sort((a, b) => a.createdAt > b.createdAt)
    .slice(0, 20);
};
