import React, { useEffect } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
import Utils from "../../utils";
import { categoryViewed, updateProfile } from "../../utils/event/action";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";

import { Typography, Divider, Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
// import { RIGHT_ARROW } from 'utils/constantImages';
const IMAGE_URL = Utils.constants?.menuImage;

const useStyles: any = makeStyles((theme: Theme) => ({
  miniHeaderRoot: {
    backgroundColor: "var(--white)",
    paddingTop: theme.spacing(1.5),
    // zIndex: theme.zIndex.appBar,
    // position: "relative",
    // position: "sticky",
    // top: 0,
  },
  maxWidthDiv: {
    maxWidth: "var(--max-width)",
    margin: theme.spacing(0, "auto"),
    paddingBottom: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  heading: {
    font: "normal 15px Work Sans",
    color: "var(--secondary-black)",
    fontWeight: 500,
    textTransform: "uppercase",
    padding: theme.spacing(0, 0, 1, 0),
    borderBottom: "3px solid transparent",
    "&:not(:last-child)": {},
    [theme.breakpoints.down(700)]: {
      padding: theme.spacing(0, 0, 0, 0),
    },
    // "&:hover": {
    //   borderBottom: "3px solid var(--green-color)",
    //   backgroundColor: "transparent",
    //   borderRadius: "0px",
    // },
  },
  dropdown: {
    "&:hover": {
      "& .hoverDropdown": {
        display: "block",
      },
    },
  },
  hoverDropdown: {
    display: "flex",
    position: "absolute",
    width: "100%",
    left: 0,
    backgroundColor: "white",
    border: "1px solid lightgray",
    justifyContent: "center",
  },
  menuHeader: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Recoleta Alt`,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "#004236",
    // margin: theme.spacing(1.5, 5, 2.5, 0),
    margin: theme.spacing(1.5, 5, 1.2, 0),

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3, 0, 0, 0),
    },
  },
  divider: {
    background: "#004236",
    // marginTop:"-10px",
  },
  subCat: {
    fontFamily: "Work Sans",
    lineHeight: "17.6px",
    marginTop: "15px",
    letterSpacing: "1px",
    color: "#004236",
    fontSize: "15px",
  },
  menuContainer: {
    height: "300px",
    width: "100%",
    display: "flex",
    backgroundColor: "white",
    maxWidth: "var(--max-width)",
  },
  menuCard: {
    paddingRight: "2%",
  },
  catImage: {
    marginLeft: "auto",
  },
  imageContainer: {
    width: "277px",
    marginTop: "20px",
    height: "173px",
    position: "relative",
  },
  mainImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  shopNow: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    lineHeight: "18.77px",
    position: "absolute",
    bottom: "12px",
    left: "10px",
    color: "#FFFFFF",
  },
  active: {
    color: "var(--green-color)",
    borderBottom: "3px solid var(--green-color)",
    "&:hover": {
      borderBottom: "3px solid var(--green-color)",
      backgroundColor: "transparent",
      borderRadius: "0px",
    },
  },
}));

function MiniHeader(props: any) {
  const menuData = props?.menuData;
  const linkData = Utils.constants.linkData;
  const dispatch = useDispatch();
  const location: any = useRouter();
  const classes = useStyles();
  // const query = Utils.CommonFunctions.useQuery();
  // let categoryIdFromUrl = query.get("categoryId") ?? "";
  let categoryIdFromUrl =
    location?.state?.categoryId ?? location?.pathname?.split("/")?.pop() ?? "";
  let urlKey = location.pathname.split("/")?.[1];
  // if(location.pathname.includes("/c/")){
  //   debugger
  //   // categoryIdFromUrl =
  // }
  const [state, setState] = React.useState({
    subCategories: [],
    menuImage: "",
    subCategoryId: "",
    openSubCategories: false,
    categoryId: categoryIdFromUrl,
  });

  let pathname = Utils.CommonFunctions.seoUrl(
    menuData?.find((item: any) => item?.id == state?.subCategoryId),
    "others"
  );

  useEffect(() => {
    if (
      ["/stores", "/", "/wishlist", "/my-profile", "/shopping-bag"].includes(
        location.pathname
      ) ||
      location.pathname.includes("/footer")
    )
      setState({
        ...state,
        categoryId: "",
      });
    else if (location.pathname.includes("/c/")) {
      setState({
        ...state,
        categoryId: categoryIdFromUrl,
      });
    }
  }, [location?.pathname, location?.search]);
  // useEffect(() => {
  //   if(state.openSubCategories ) {
  //     setState({ ...state, openSubCategories: false})
  //   }
  // }, []);

  const handleSubCategories = (item: any, index: any) => {
    let data = menuData[index]?.block;
    if (data) {
      setState({
        ...state,
        subCategories: data,
        menuImage: menuData[index]?.image
          ? IMAGE_URL + menuData[index]?.image
          : "",
        subCategoryId: item?.id,
        openSubCategories: true,
        // categoryId: menuData[index]?.id
      });
    } else {
      setState({ ...state, openSubCategories: false });
    }
  };

  const handleOpenMenu = (item: any, index: any, type: string) => {
    
    categoryViewed({
      CategoryID: `${item.id}`,
      CategoryName: `${item.title}`,
    });
    updateProfile("recent_viewed_category", `${item.title}`);
    updateProfile("recent_viewed_category_id", `${item.id}`);

    setState({
      ...state,
      openSubCategories: false,
      categoryId: type === "menu" ? menuData[index]?.id : linkData[index].id,
    });
  };


  return (
    <div
      className={classes.miniHeaderRoot}
      onMouseLeave={() => setState({ ...state, openSubCategories: false })}
    >
      <div className={classes.maxWidthDiv}>
        {menuData?.map((item: any, index: any) => {
          let pathname = Utils.CommonFunctions.seoUrl(item, "others");
          return (
            <div
              className={classes.dropdown}
              key={item.id + item.title}
              onMouseOver={() => handleSubCategories(item, index)}
            >
              <Link
                // className={state?.categoryId == item.id ? clsx(classes.heading, classes.active) : classes.heading}
                className={
                  urlKey == item.url
                    ? clsx(classes.heading, classes.active)
                    : classes.heading
                }
                // to={{ pathname: `/${item.url}/c/${item.google_category}`, state: { categoryId: item.id } }}
                href={{
                  pathname,
                  search: state?.categoryId == item.id ? location?.search : "",
                  query:  {categoryId :  item.id}
                }}
                onClick={() => handleOpenMenu(item, index, "menu")}
              >
                {/* <Typography className={classes.heading} variant="body1" > */}
                {item.title}
                {/* </Typography> */}
              </Link>
            </div>
          );
        })}
        {linkData?.map((item: any, index: any) => (
          <div
            className={classes.dropdown}
            key={item.title}
            onMouseOver={() => setState({ ...state, openSubCategories: false })}
          >
            {item.title === "GIFT CARD" ? (
              <Typography className={classes.heading} variant="body1">
                {item.title}
              </Typography>
            ) : (
              <Link
                className={
                  state?.categoryId === item.id
                    ? clsx(classes.heading, classes.active)
                    : classes.heading
                }
                href={item.action}
                onClick={() => handleOpenMenu(item, index, "link")}
              >
                {/* <Typography className={classes.heading} variant="body1" > */}
                {item.title}
                {/* </Typography> */}
              </Link>
            )}
          </div>
        ))}
      </div>

      {state.openSubCategories ? (
        <div
          className={classes.hoverDropdown}
          onMouseLeave={() => setState({ ...state, openSubCategories: false })}
        >
          <div className={classes.menuContainer}>
            {state.subCategories?.map((category: any, index: any) => {
              return (
                <div
                  className={classes.menuCard}
                  key={index}
                  onMouseEnter={() =>
                    setState({ ...state, openSubCategories: true })
                  }
                >
                  <Typography className={classes.menuHeader}>
                    {category.title}
                  </Typography>
                  <Divider className={classes.divider} />
                  {category?.subcategory?.map((subCat: any, ind: any) => {
                    let pathname = Utils.CommonFunctions.seoUrl(
                      subCat,
                      "others"
                    );
                    return (
                      <Link
                        key={ind}
                        href={{pathname, query:  {categoryId :  subCat.id}}}
                        // state= {{categoryId : state.categoryId}}
                        onClick={() => handleOpenMenu(subCat, index, "menu")}
                      >
                        <Typography className={classes.subCat}>
                          {subCat.title}
                        </Typography>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
            {/* {state?.menuImage?.length > 0 ? */}
            <div className={classes.catImage}>
              <div className={classes.imageContainer}>
                <img
                  src={state.menuImage}
                  className={classes.mainImage}
                  alt="menu"
                />
                <Link href={pathname} className={classes.shopNow}>
                  Shop Now {/* <RIGHT_ARROW /> */}
                </Link>
              </div>
            </div>
            {/* :
                null
              } */}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MiniHeader;
