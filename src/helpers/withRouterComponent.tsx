import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouterComponent = (Component: any) => {
  const useWithRouter = (props: any) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
  
    return (
      <Component {...props} router={{location, navigate, params}}/>
    );
  }
  
  return useWithRouter;
}

export default withRouterComponent;