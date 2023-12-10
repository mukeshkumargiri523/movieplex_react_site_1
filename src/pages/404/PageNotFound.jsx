import "./Style.scss";

import ContentWrapper from "../../contentWrapper/ContentWrapper";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page Not Found</span>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
