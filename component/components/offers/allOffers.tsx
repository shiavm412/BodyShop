import {
  
  Theme,
  Typography,
  Box,
  Tab,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import { useState } from "react";
import Offers from "./offers";
import Banner from "./banner";
import Utils from "../../utils";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
 ({
    bannerRoot: {
      background: "var(--white)",
      position: "relative",
      top: "-10vh",
      [theme.breakpoints.down("xs")]: {
        top: "5px",

      }
    },
    productContainer: {
      background: "var(--white)",
    },
    findContainer: {
      width: "85%",
      margin: "0 auto",
      maxWidth: "100%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",

      }

    },

    subheading: {
      font: `normal ${theme.spacing(1.6)}  Work Sans`,
      lineHeight: "19px",
      padding: theme.spacing(1, 3),
    },

    tabContainer: {
      padding: theme.spacing(0,5),
      [theme.breakpoints.down("xs")]:{
        padding: 0,
      },
      // "& .MuiTab-wrapper": {
      // font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      //   1.5
      // )}  Work Sans`,
      // lineheight: "18px",
      // textTransform: "uppercase",
      // color: "var(--green-color)",
      // },
      "& .MuiTab-textColorPrimary": {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.5
        )}  Work Sans Bold`,
        lineheight: "18px",
        textTransform: "uppercase",
        color: "var(--secondary-black)",
        [theme.breakpoints.down("xs")]:{
          font: "14px"
        }

      },
      "& .PrivateTabIndicator-root-62": {
        background: "var(--green-color)!important",
        height: "3.5px",
      },
      "& .MuiTabs-indicator": {
        background: "var(--green-color)!important",
        height: "3.5px",
      },
      "& .MuiTabs-flexContainer": {
        borderBottom: "1px solid #F2F5F5"
      },
      "& .Mui-selected": {
        color: "var(--green-color) !important",
      }
    },
    innerFindContainer: {
      textAlign: "center",
      background: "rgba(0, 0, 0, 0.4)",
      opacity: "0.8",
      boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
      borderRadius: "2px",
      padding: theme.spacing(3),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        6
      )} Druk`,
      color: "var(--white)",
      textAlign: "center",
      lineHeight: "70px",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(3),
      },
    },
    subHeading: {
      font: `normal  ${theme.spacing(1.6)} Work Sans`,
      width: "678px",
      color: "var(--white)",
      textAlign: "center",
      lineHeight: "19px",
      margin: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
        width: "auto",
      },
    },
  })
);
interface Props {
  navigateTo: Function;
  data: any;
  promotionalProduct: any
}
function AllOffers({ navigateTo, data, promotionalProduct }: Props) {
  let allOffers: any = [];
  data?.forEach((item: any) => {
    if (Array.isArray(item?.content))
      allOffers = allOffers.concat(item.content);
    // if (item.type === "store_offer") {
    //   tabs.push("Store Offers")
    // } else if (item.type === "latest_offer") {
    //   tabs.push("Latest Offers")
    // }
    // else if (item.type === "bank_offer") {
    //   tabs.push("Bank Offers")
    // }

  })
  const newData = data.length > 0 ? [{ title: "ALL", content: allOffers }, ...data] : [];
  const query = Utils.CommonFunctions.useQuery();
  let offer = query.get("offer") ?? "/";
  const classes = useStyles();
  const findIndexOfOffer=(offer:string|undefined|null)=>{
    const index=newData.findIndex((obj:any)=>obj?.type?.toLowerCase()==offer?.toLowerCase())
  return index;
  }
  const [value, setValue] = useState(findIndexOfOffer(offer)!==-1?findIndexOfOffer(offer):0);

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };


  // const bankOffers = data.find((item: any) => item.title === "Bank Offers") || {}
  // const storeOffers = data.find((item: any) => item.title === "Store Offers") || {}
  // const latestOffers = data.find((item: any) => item.title === "Latest Offers") || {}
  


  return (
    <div className={classes.productContainer}>
      <div className={classes.findContainer}>
        <div className={classes.bannerRoot}>
          <Box sx={{ width: "100%" }}>
            {
              newData?.length > 0
                ?
                <Box >
                  <Tabs
                    value={value}
                    className={classes.tabContainer}
                    onChange={handleChange}
                    variant="scrollable"
                    // scrollButtons
                    // allowScrollButtonsMobile
                    // aria-label="scrollable force tabs example"
                  >{newData?.map((tab: any, index: number) =>
                    <Tab label={tab.title} key={index} {...a11yProps(0)} />
                  )}
                    {/* < Tab label="All" {...a11yProps(0)} />
                   {Object.keys(bankOffers).length > 0 &&
                    <Tab label="Bank Offers" {...a11yProps(1)} />}
                   {Object.keys(latestOffers).length > 0 &&
                    <Tab label="Latest Offers" {...a11yProps(2)} />}
                   {Object.keys(storeOffers).length > 0 &&
                    <Tab label="Store Offers" {...a11yProps(3)} />} */}

                  </Tabs>
                </Box>
                : ""
            }
            <Box sx={{ display: { xs: "block", sm: "none" } }}>       
                <Banner navigateTo={navigateTo} mobileView={true} promotionalProduct={promotionalProduct} />
            </Box>

            {newData.map((tab: any, index: number) => {
              return <TabPanel value={value} index={index}>
                <Offers key={index} offersData={tab.content} navigateTo={navigateTo} />
              </TabPanel>
            })}

            {/* {tabs.map((tab: any, index: number) => {
              return <TabPanel value={value} index={index}>
                <Offers offersData={tab === "All" ? allOffers : tab === "Bank Offers" ? bankOffers?.content : tab === "Store Offers" ? storeOffers?.content : latestOffers?.content} navigateTo={navigateTo} />
              </TabPanel>
              }
              )} */}

          </Box>
          {/* {newData.length === 0 && <ProductNotFound title="Offers Not Found" />} */}

        </div>
      </div>
    </div >
  );
}

export default AllOffers;
