import { FC } from 'react';

import Head from 'next/head';

export type Props = {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
};

const cutTags = (text = '') => text.replace(/<\/?.+?>/gi, '');

const prepareData = ({ title, description, image, keywords }: Props) => ({
  title: cutTags(title),
  description: cutTags(description).substr(0, 250),
  image,
  keywords,
});

const PageMeta: FC<Props> = (props: Props) => {
  const { title, description, image, keywords } = prepareData(props);
  return (
    <Head>
      {title ? <title>{title}</title> : <title>The BodyShop</title>}
      <meta property='title' content={title} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      {/* <meta name="robots" content="index, follow"/>  */}
      <meta name="robots" content="noindex, nofollow" />
      {description && <meta name="description" content={description} />}
      {description && <meta name="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {keywords && <meta property="keywords" content={keywords} />}
    </Head>
  );
};

const memorizedPageMeta = PageMeta;

export { memorizedPageMeta as PageMeta };
