export const saveLocationHistory = (data: any) => {
  return (dispatch: any, _getState: any) => {
    dispatch({
      type: "saveLocationHistory",
      payload: data,
    });
  };
};