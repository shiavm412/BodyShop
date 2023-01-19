import {  Theme } from "@mui/material";
import _ from "lodash";
import { makeStyles , createStyles} from "@mui/styles";

import  Content1  from "./promotionalProductContents/content1";
import  Content4  from "./promotionalProductContents/content4";
import Content3 from "./promotionalProductContents/content3";
import Content2 from "./promotionalProductContents/content2";
interface Props {
  data: any;
  navigateTo: Function;
  key: string
}

const HotSummer = ({ data, navigateTo }: Props) => {
  const content = data?.content && Array.isArray(data.content) && data?.content?.[0] ? data.content[0] : {};

  return (
    Object.keys(content).length > 0 ?
      <>
        {
          content?.content_type === "content_4" ?
            <Content4 navigateTo={navigateTo} item={content} /> : 
            content?.content_type === "content_3" ?
            <Content3 navigateTo={navigateTo} item={content} /> : 
            content?.content_type === "content_2" ?
            <Content2 navigateTo={navigateTo} item={content} />:
            content?.content_type === "content_1" ?
            <Content1 navigateTo={navigateTo} item={content} />:null
        }
      </>
      :
      null
  );
};

export default HotSummer;
