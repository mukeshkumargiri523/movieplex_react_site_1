import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Style.scss";

import { fetchDataApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../contentWrapper/ContentWrapper";
import PersonCard from "../../components/personCard/PersonCard";

function PopularPeople() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const mediaType = "person";

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataApi(`/person/popular`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataApi(`/person/popular?page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setData(null);
    setPageNum(1);
    fetchInitialData();
  }, [mediaType]);

  return (
    <div className="popularPeople">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">Popular People</div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  // if (item.media_type === "person") {
                  return <PersonCard key={index} data={item} />;
                  // }
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">
                Sorry, Results not found ⚠️
              </span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
}

export default PopularPeople;
