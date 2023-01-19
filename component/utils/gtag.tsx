import ReactGA from 'react-ga4'

// initialize google analytics
// const MEASUREMENT_ID = "G-8SSG6KDHE4";
// ReactGA.initialize(MEASUREMENT_ID);

// custom pageview with the location from react router
// export const pageView = path => {
//   return ReactGA.send({hitType: 'pageview', page: path})
// }

// custom event with label being an optional parameter
export const customGa4Event = (action:string,payload: any) => {
    //   return ReactGA.send({hitType: 'pageview', page: "/"})
    if(process.env.NEXT_PUBLIC_ENV !== 'development' && process.env.NEXT_PUBLIC_ENV !== 'staging'){

    return ReactGA.event(action,{
        ...payload
        // category: category,
        // action: action,
        // label: label,
        
    })
}
}